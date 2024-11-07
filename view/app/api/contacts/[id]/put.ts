import { NextResponse } from 'next/server';

const EXPRESS_BASE_URL = 'http://localhost:3001';

export async function PUT(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;
  const contactData = await request.json();
  const response = await fetch(`${EXPRESS_BASE_URL}/contacts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contactData),
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}