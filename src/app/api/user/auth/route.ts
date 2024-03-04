import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET() {
	const token = cookies().get("token");

	if (!token) {
		return NextResponse.json({ error: "Not allowed" }, { status: 401 });
	}

	try {
		const validateToken = jwt.verify(token.value, process.env.JWT_SECRET as string);

		if (!validateToken) {
			return NextResponse.json({ error: "Not allowed" }, { status: 401 });
		}

		const { pasword, ...user } = jwt.decode(token.value) as JwtPayload;

		return NextResponse.json({ message: "authenticated", user });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: error }, { status: 401 });
	}
}
