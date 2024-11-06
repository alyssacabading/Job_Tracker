import { NextResponse } from 'next/server';

const EXPRESS_BASE_URL = 'http://localhost:3001';

export async function POST(request: Request): Promise<NextResponse> {
  const jobData = await request.json();
  const response = await fetch(`${EXPRESS_BASE_URL}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}