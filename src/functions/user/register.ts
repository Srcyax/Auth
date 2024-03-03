import axios from "axios";

type User = {
	username: string;
	password: string;
};

export async function Register(user: User) {
	axios
		.post("api/user/register", {
			username: user.username,
			password: user.password,
		})
		.then((res) => {})
		.catch((error) => {
			console.log(error);
		});
}
