import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { TokenAuth } from "@/functions/user/authToken";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const { username, password } = body;
	const prisma = new PrismaClient();

	try {
		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const passwordVerify = await bcrypt.compare(password, user?.password as string);

		if (!passwordVerify) {
			return NextResponse.json({ error: "Wrong password" }, { status: 500 });
		}

		await TokenAuth(user);

		return NextResponse.json({ message: "sucess" });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
