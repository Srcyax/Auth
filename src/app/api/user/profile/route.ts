import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const { id } = body;

	const prisma = new PrismaClient();

	try {
		const userProfile = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		return NextResponse.json({ userProfile });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: error }, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
