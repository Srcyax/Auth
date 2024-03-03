"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Register } from "@/functions/user/register";
import { useForm } from "react-hook-form";

export default function Home() {
	const { register, handleSubmit } = useForm();

	function onSubmit(data: any) {
		Register(data);
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Tabs defaultValue="register" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-1">
					<TabsTrigger value="register">Register</TabsTrigger>
				</TabsList>
				<TabsContent value="register">
					<Card>
						<CardHeader>
							<CardTitle>Register</CardTitle>
							<CardDescription>To access, please create your account.</CardDescription>
						</CardHeader>
						<form onSubmit={handleSubmit(onSubmit)} action="">
							<CardContent className="space-y-2">
								<div className="space-y-1">
									<Label htmlFor="name">Username</Label>
									<Input {...register("username")} id="username" />
								</div>
								<div className="space-y-1">
									<Label htmlFor="username">Password</Label>
									<Input {...register("password")} id="password" type="password" />
								</div>
							</CardContent>
							<CardFooter>
								<Button type="submit">Register</Button>
							</CardFooter>
						</form>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
