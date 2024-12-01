import { NextRequest, NextResponse } from "next/server";

const EXPRESS_BASE_URL = "http://localhost:5000/api/jobs";

export async function GET(
  request: Request,
  { params }: { params: { param: string } }
): Promise<NextResponse> {
  const { param } = params;
  const response = await fetch(`${EXPRESS_BASE_URL}/${param}`, {
    method: "GET",
  });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function PUT(
  request: Request,
  { params }: { params: { param: string } }
): Promise<NextResponse> {
  const { param } = params;
  const jobData = await request.json();

  // Transform `skills` to be an array of strings
  if (Array.isArray(jobData.skills)) {
    jobData.skills = jobData.skills.map((skill: any) =>
      typeof skill === "object" && skill.name ? skill.name : skill
    );
  }

  console.log(jobData); // Check the transformed payload

  const response = await fetch(`${EXPRESS_BASE_URL}/${param}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });

  const data = await response.json();
  console.log("returned data: ", data);
  return NextResponse.json(data, { status: response.status });
}

export async function DELETE(
  request: Request,
  { params }: { params: { param: string } }
): Promise<NextResponse> {
  const { param: param } = params;

  try {
    console.log(request);
    const response = await fetch(`${EXPRESS_BASE_URL}/${param}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response.status !== 204) {
      // For non-204 responses, safely parse JSON and return it
      const errorData = await response.json();
      return NextResponse.json(
        { error: "Error deleting application", details: errorData },
        { status: response.status }
      );
    }

    // Return a 204 response without a body
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Error deleting application", details: errorMessage },
      { status: 500 }
    );
  }
}
