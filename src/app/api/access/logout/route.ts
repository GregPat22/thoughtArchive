import { NextResponse } from "next/server";

const ACCESS_COOKIE = "thought_archive_access";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ACCESS_COOKIE,
    value: "",
    path: "/",
    maxAge: 0,
  });
  return response;
}

