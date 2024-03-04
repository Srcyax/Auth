"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const router = useRouter();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["authentication"],
		queryFn: async () => {
			return axios
				.get("/api/user/auth")
				.then((res) => res.data)
				.catch(() => {
					return router.push("/login");
				});
		},
	});

	if (isLoading) {
		return <></>;
	}

	const { username } = data?.user;

	return (
		<div>
			<header className="flex justify-between items-center p-5 shadow-xl">
				<h1 className="text-3xl font-bold">Chatz</h1>
				<Avatar>
					<AvatarImage src="" alt="@shadcn" />
					<AvatarFallback className="text-[20px]">{username.charAt(0)}</AvatarFallback>
				</Avatar>
			</header>
			<main className="m-10">
				<div className="flex flex-col gap-4 w-1/2">
					<ScrollArea className="h-72 rounded-md border shadow-xl">
						<div className="p-4">
							<h4 className="mb-4 text-sm font-medium leading-none">Chat</h4>
						</div>
					</ScrollArea>
					<div className="flex gap-4">
						<Input className="shadow-xl" type="text" placeholder="Type something..." />
						<Button>
							<Send width={20} />
						</Button>
					</div>
				</div>
			</main>
		</div>
	);
}
