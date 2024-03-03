import axios from "axios";

type User = {
	username: string;
	password: string;
};

export async function Login(user: User) {
	axios
		.post("api/user/login", {
			username: user.username,
			password: user.password,
		})
		.then((res) => {})
		.catch((error) => {
			console.log(error);
		});
}
