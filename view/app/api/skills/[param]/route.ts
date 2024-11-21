import { NextResponse } from "next/server";

const EXPRESS_BASE_URL = "http://localhost:5000/api/skills";

// Handle PUT requests
export async function PUT(
  request: Request,
  { params }: { params: { param: string } }
): Promise<NextResponse> {
  const { param: id } = params;
  const skillData = await request.json();
  const response = await fetch(`${EXPRESS_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skillData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json(
      { error: "Failed to update skill", details: errorData },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

// Handle DELETE requests
export async function DELETE(
  request: Request,
  { params }: { params: { param: string } }
): Promise<NextResponse> {
  const { param: id } = params;
  const response = await fetch(`${EXPRESS_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (response.status !== 204) {
    const errorData = await response.json();
    return NextResponse.json(
      { error: "Failed to delete skill", details: errorData },
      { status: response.status }
    );
  }

  return NextResponse.json(null, { status: response.status });
}
