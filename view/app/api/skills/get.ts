import { NextResponse } from 'next/server';

const EXPRESS_BASE_URL = 'http://localhost:3001';

export async function GET(): Promise<NextResponse> {
  const response = await fetch(`${EXPRESS_BASE_URL}/skills`, {
    method: 'GET',
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}