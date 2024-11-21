import { NextResponse } from "next/server";

const EXPRESS_BASE_URL = "http://localhost:5000/api/skills";

// Get all skills.
export async function GET(): Promise<NextResponse> {
  const response = await fetch(`${EXPRESS_BASE_URL}`, {
    method: "GET",
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function POST(request: Request): Promise<NextResponse> {
  const skillData = await request.json();
  const response = await fetch(`${EXPRESS_BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skillData),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
