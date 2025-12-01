import { NextRequest, NextResponse } from "next/server";
import { getPgPool } from "../../../lib/db";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { utm } = (body ?? {}) as {
    utm?: {
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      utm_term?: string;
      utm_content?: string;
      first_landing_url?: string;
      first_landing_time?: string;
    };
  };

  if (!utm) {
    return NextResponse.json({ error: "Missing utm" }, { status: 400 });
  }

  let pool;

  try {
    pool = getPgPool();
  } catch (e) {
    console.error("Failed to init Postgres:", e);
    return NextResponse.json(
      { error: "Database is not configured" },
      { status: 500 },
    );
  }

  const userAgent = req.headers.get("user-agent") ?? null;
  const forwardedFor = req.headers.get("x-forwarded-for") ?? "";
  const ip =
    forwardedFor.split(",").map((v) => v.trim())[0] ||
    req.headers.get("x-real-ip") ||
    null;

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS utm_events (
        id SERIAL PRIMARY KEY,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT,
        utm_term TEXT,
        utm_content TEXT,
        first_landing_url TEXT,
        first_landing_time TIMESTAMPTZ,
        user_agent TEXT,
        ip TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    await pool.query(
      `
        INSERT INTO utm_events (
          utm_source,
          utm_medium,
          utm_campaign,
          utm_term,
          utm_content,
          first_landing_url,
          first_landing_time,
          user_agent,
          ip
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9
        );
      `,
      [
        utm.utm_source ?? null,
        utm.utm_medium ?? null,
        utm.utm_campaign ?? null,
        utm.utm_term ?? null,
        utm.utm_content ?? null,
        utm.first_landing_url ?? null,
        utm.first_landing_time
          ? new Date(utm.first_landing_time)
          : null,
        userAgent,
        ip,
      ],
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Failed to insert UTM record:", e);
    return NextResponse.json(
      { error: "Failed to save utm" },
      { status: 500 },
    );
  }
}

