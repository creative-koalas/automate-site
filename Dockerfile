# syntax=docker/dockerfile:1

# Build stage
FROM node:24-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with cache mount
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application with cache mount for Next.js
RUN --mount=type=cache,target=/app/.next/cache \
    pnpm build

# Production stage
FROM node:24-alpine AS runner

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Create a non-root user early
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

WORKDIR /app

# Set to production environment
ENV NODE_ENV=production

# Copy necessary files from builder with correct ownership
COPY --from=builder --chown=nextjs:nodejs /app/package.json /app/pnpm-lock.yaml ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./

# Install production dependencies + TypeScript (needed for next.config.ts) with cache mount
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile && \
    pnpm add --save-dev typescript && \
    chown -R nextjs:nodejs /app/node_modules

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set port environment variable
ENV PORT=3000

# Start the application
CMD ["pnpm", "start"]
