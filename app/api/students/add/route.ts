import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const { name, cohort, courses, dateJoined, lastLogin, status } =
      await request.json();

    // Validate the incoming data
    if (!name || !cohort || !Array.isArray(courses) || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a new student in the database
    const newStudent = await prisma.student.create({
      data: {
        name,
        cohort,
        courses,
        dateJoined: new Date(dateJoined),
        lastLogin: new Date(lastLogin),
        status,
      },
    });

    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.error("Error adding student:", error);
    return NextResponse.json(
      { error: "Failed to add student" },
      { status: 500 }
    );
  }
}
