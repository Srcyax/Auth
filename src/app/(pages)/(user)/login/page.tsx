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
import { Login } from "@/functions/user/login";
import { useForm } from "react-hook-form";

export default function Home() {
	const { register, handleSubmit } = useForm();

	function onSubmit(data: any) {
		Login(data);
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Tabs defaultValue="login" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-1">
					<TabsTrigger value="login">Log in</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<Card>
						<CardHeader>
							<CardTitle>Account</CardTitle>
							<CardDescription>Please proceed with authentication to access your account.</CardDescription>
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
								<Button type="submit">Log in</Button>
							</CardFooter>
						</form>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
