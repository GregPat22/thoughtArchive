import { NextResponse } from "next/server";

const ACCESS_COOKIE = "thought_archive_access";

type AccessPayload = {
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as AccessPayload;
  const providedPassword = body.password?.trim() ?? "";
  const requiredPassword = process.env.SITE_ACCESS_PASSWORD ?? "";

  if (!requiredPassword) {
    return NextResponse.json(
      { error: "Server password is not configured." },
      { status: 500 }
    );
  }

  if (providedPassword !== requiredPassword) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const token = process.env.SITE_ACCESS_TOKEN ?? requiredPassword;
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  return response;
}

