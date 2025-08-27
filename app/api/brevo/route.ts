import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { email, attributes, listIds } = await request.json();

    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    if (!BREVO_API_KEY) {
      console.error("BREVO_API_KEY missing");
      return NextResponse.json({ message: "Server configuration error." }, { status: 500 });
    }

    const lists: number[] = (Array.isArray(listIds) ? listIds : [])
      .map((v: unknown) => Number(v))
      .filter((n) => Number.isFinite(n));

    const brevoData = {
      email,
      attributes: attributes || {},
      listIds: lists,
      emailBlacklisted: false,
      smsBlacklisted: false,
      updateEnabled: true,
    };

    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
        accept: "application/json",
      },
      body: JSON.stringify(brevoData),
    });

    const text = await brevoResponse.text();
    let data: unknown = null;
    try { data = text ? JSON.parse(text) : null; } catch {}

    if (!brevoResponse.ok) {
      console.error("Brevo contacts error:", brevoResponse.status, data || text);
      return NextResponse.json({ ok: false, error: data || text || null }, { status: brevoResponse.status });
    }

    return NextResponse.json({ ok: true, data: data || null }, { status: 200 });
  } catch (err) {
    console.error("API /brevo error:", err);
    return NextResponse.json({ message: "Internal Server Error." }, { status: 500 });
  }
}