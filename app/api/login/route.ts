import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = (await req.json()) as {
      username: string;
      password: string;
    };

    // safeparse the incoming JSON data

    if (!username || !password) {
      return new Response("Missing required fields", {
        status: 400,
      });
    }

    // check if user already exists
    const userExists = await prisma.user.findFirst({
      where: {
        name: username,
      },
      select: {
        id: true,
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const user = await prisma.user.create({
      data: {
        name: username,
        password,
      },
    });
    console.log("User added successfully:", user);
    return NextResponse.json(
      { message: "User added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json({ error: "Failed to add user" }, { status: 400 });
  }
}
