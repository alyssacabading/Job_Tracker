import { NextResponse } from 'next/server';

const EXPRESS_BASE_URL = 'http://localhost:3001';

export async function DELETE(request: Request, { params }: { params: { id: string } }): Promise<NextResponse> {
  const { id } = params;
  const response = await fetch(`${EXPRESS_BASE_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
  return NextResponse.json(null, { status: response.status });
}