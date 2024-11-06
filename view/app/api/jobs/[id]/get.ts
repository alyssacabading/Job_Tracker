import { NextResponse } from 'next/server';

const EXPRESS_BASE_URL = 'http://localhost:3001';

export async function GET(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;
  const response = await fetch(`${EXPRESS_BASE_URL}/${id}`, {
    method: 'GET',
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
