import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type User = {
	id: number;
	username: string;
};

export async function GenerateTokenAuth(user: User) {
	const token = jwt.sign(
		{ username: user.username, id: user.id },
		process.env.JWT_SECRET as string,
		{
			expiresIn: "2h",
		}
	);

	return cookies().set("token", token, {
		maxAge: 60 * 120,
		secure: false,
		httpOnly: true,
	});
}
