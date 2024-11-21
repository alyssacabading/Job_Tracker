import { NextResponse } from "next/server";

const EXPRESS_BASE_URL = "http://localhost:5000/api/contacts";

// GET all contacts
export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(EXPRESS_BASE_URL, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Error fetching contacts", details: errorData },
        { status: response.status }
      );
    }

    const contacts = await response.json();
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Error fetching contacts", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

// Create a new contact
export async function POST(request: Request): Promise<NextResponse> {
  const contactData = await request.json();

  try {
    const response = await fetch(EXPRESS_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Error creating contact", details: errorData },
        { status: response.status }
      );
    }

    const newContact = await response.json();
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Error creating contact", details: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
