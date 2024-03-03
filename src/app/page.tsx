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
import { useForm } from "react-hook-form";

export default function Home() {
	const { register, handleSubmit } = useForm();

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Tabs defaultValue="login" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Log in</TabsTrigger>
					<TabsTrigger value="register">Register</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<Card>
						<CardHeader>
							<CardTitle>Account</CardTitle>
							<CardDescription>Please proceed with authentication to access your account.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">Username</Label>
								<Input id="username" />
							</div>
							<div className="space-y-1">
								<Label htmlFor="username">Password</Label>
								<Input id="password" type="password" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Log in</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="register">
					<Card>
						<CardHeader>
							<CardTitle>Register</CardTitle>
							<CardDescription>To access, please create your account.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="current">Username</Label>
								<Input id="current" type="text" />
							</div>
							<div className="space-y-1">
								<Label htmlFor="new">Password</Label>
								<Input id="new" type="password" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Register</Button>
						</CardFooter>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
