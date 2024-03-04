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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Home() {
	const schema = z.object({
		username: z.string().min(3).max(20),
		password: z.string().min(6),
	});

	const { register, handleSubmit } = useForm({
		resolver: zodResolver(schema),
	});

	const router = useRouter();

	function onSubmit(data: any) {
		axios
			.post("api/user/register", {
				username: data.username,
				password: data.password,
			})
			.then(() => {
				router.push("/");
			})
			.catch((error) => {
				toast.error(error.response.data.error);
			});
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
