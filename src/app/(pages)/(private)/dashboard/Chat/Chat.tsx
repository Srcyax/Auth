import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Send } from "lucide-react";
import { useEffect, useState } from "react";

type Comments = {
	id: number;
	comment: string;
	authorId: number;
};

export function ChatBoard({ username }: { username: string }) {
	const [comment, setComment] = useState<string | null>("");
	const [comments, getComments] = useState<Comments[]>();

	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: ["comments"],
		queryFn: async () => {
			return axios.get("/api/user/comment").then((res) => {
				getComments(res.data.comments);
			});
		},
	});

	const { mutate: createComment } = useMutation({
		mutationKey: ["commentsmutate"],
		mutationFn: async () => {
			return axios
				.post("/api/user/comment", {
					comment: comment,
				})
				.then((response) => {
					queryClient.fetchQuery({
						queryKey: ["comments"],
					});
				})
				.catch((error) => {});
		},
	});

	return (
		<>
			<ScrollArea className="h-72 rounded-md border shadow-inner">
				<div className="p-4">
					{comments &&
						comments?.map((chat, index) => (
							<div key={index} className="my-4">
								<div className="flex gap-2 items-center">
									<Avatar>
										<AvatarImage src="" alt="@shadcn" />
										<AvatarFallback className="text-[20px]">{username.charAt(0)}</AvatarFallback>
									</Avatar>
									<h1 className="text-[15px]">{chat.comment}</h1>
								</div>
							</div>
						))}
				</div>
			</ScrollArea>
			<div className="flex gap-4">
				<Input
					onChange={(e) => {
						setComment(e.target.value);
					}}
					className="shadow-xl"
					type="text"
					id="chatinput"
					placeholder="Type something..."
				/>
				<Button
					onClick={() => {
						const chatinput = document.getElementById("chatinput") as HTMLInputElement;
						createComment();
						chatinput.value = "";
					}}
				>
					<Send width={20} />
				</Button>
			</div>
		</>
	);
}
