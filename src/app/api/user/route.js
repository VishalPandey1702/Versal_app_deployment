import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");

export async function POST(req) {
  try {
    const token = await getToken({ req: req });
    const data = await req.json();
    const { password } = data;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const finalData = { ...data, password: hashedPassword };
    if (token && token.user.id) {
      const response = await prisma.user.create({
        data: finalData,
      });
      return NextResponse.json({ data: response }, { status: 200 });
    }
    return NextResponse.json({ data: "unauthorized" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
