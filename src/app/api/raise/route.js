import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const token = await getToken({ req: req });
    const data = await req.json();
    console.log(data);
    const { type, satisfied } = data;

    if (token && token.user.id) {
      // Check if a record with the given type already exists
      const existingRecord = await prisma.satisfaction.findFirst({
        where: { type: type, userId: token.user.id },
      });
      console.log(existingRecord);
      if (existingRecord) {
        // If the record exists, update it
        const updatedRecord = await prisma.satisfaction.update({
          where: { id: existingRecord.id },
          data: { satisfied: satisfied },
        });

        return NextResponse.json({ data: updatedRecord }, { status: 200 });
      } else {
        // If the record does not exist, create a new one
        const newRecord = await prisma.satisfaction.create({
          data: { type: type, satisfied: satisfied, userId: token.user.id },
        });

        return NextResponse.json({ data: newRecord }, { status: 200 });
      }
    }

    return NextResponse.json({ data: "unauthorized" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req) {
  const token = await getToken({ req: req });
  if (token && token.user.id) {
    const response = await prisma.satisfaction.findMany({});
    return NextResponse.json({ data: response }, { status: 200 });
  }
  return NextResponse.json({ data: "unauthorized" }, { status: 200 });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const token = await getToken({ req: request });
  if (token && token.user.id) {
    const response = await prisma.satisfaction.deleteMany({
      where: {
        type: type,
      },
    });
    console.log(response);
    return NextResponse.json({ data: response }, { status: 200 });
  }
  return NextResponse.json({ data: "unauthorized" }, { status: 500 });
}
