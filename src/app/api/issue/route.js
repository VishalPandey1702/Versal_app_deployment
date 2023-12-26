import { getToken } from "next-auth/jwt";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const token = await getToken({ req: req });
    const data = await req.json();
    console.log(data);
    if (token && token.user.id) {
      const response = await prisma.issue.create({
        data: data,
      });
      return NextResponse.json({ data: response }, { status: 200 });
    }
    return NextResponse.json({ data: "unauthorized" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const token = await getToken({ req: req });
    if (token && token.user.id) {
      const response = await prisma.issue.findMany();
      console.log(response);
      return NextResponse.json({ data: response }, { status: 200 });
    }
    return NextResponse.json({ data: "unauthorized" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
