import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

// Minimal SSR-safe mock for Next.js app dir
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: any) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} alt={props.alt || ""} />,
}));

test("renders sections", () => {
  render(<Home />);
  expect(screen.getByRole("navigation")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /让 AI 成为你的同事/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /主打特性/i })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /用户声音/i })).toBeInTheDocument();
});
