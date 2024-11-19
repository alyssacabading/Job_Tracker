import { NextResponse } from 'next/server';

const EXPRESS_BASE_URL = 'http://localhost:3001/api/contacts';

// GET contacts by company name
export async function GET(request: Request, { params }: { params: { company: string } }): Promise<NextResponse> {
  const { company } = params;

  try {
    const response = await fetch(`${EXPRESS_BASE_URL}/${company}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: 'Error fetching contacts', details: errorData }, { status: response.status });
    }

    const contacts = await response.json();
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error fetching contacts', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

// UPDATE contact by id
export async function PUT(request: Request, { params }: { params: { param: string } }): Promise<NextResponse> {
  const { param: id } = params;
  const contactData = await request.json();

  try {
    const response = await fetch(`${EXPRESS_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: 'Error updating contact', details: errorData }, { status: response.status });
    }

    const updatedContact = await response.json();
    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error updating contact', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

// DELETE contact by id
export async function DELETE(request: Request, { params }: { params: { param: string } }): Promise<NextResponse> {
  const { param: id } = params;

  try {
    const response = await fetch(`${EXPRESS_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: 'Error deleting contact', details: errorData }, { status: response.status });
    }

    // Return a 204 No Content response if the deletion was successful
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Error deleting contact', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}