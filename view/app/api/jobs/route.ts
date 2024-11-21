import { NextRequest, NextResponse } from "next/server";

const EXPRESS_BASE_URL = "http://localhost:5000/api/jobs";

export async function GET(request: Request): Promise<NextResponse> {
  const response = await fetch(`${EXPRESS_BASE_URL}`, {
    method: "GET",
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function POST(request: NextRequest) {
  const jobData = await request.json();
  const response = await fetch(`${EXPRESS_BASE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to save job" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
