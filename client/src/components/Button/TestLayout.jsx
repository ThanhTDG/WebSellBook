import React from "react";
import axios from "axios";
function TestLayout() {
	const url = "https://toi-mua-sach.herokuapp.com";

	const instance = axios.create({
		baseURL: `${url}/api`,
		withCredentials: true,
	});
	
	const login = async () => {
		const res = await instance.post("/auth/signin", {
			username: "khachhang@example.com",
			password: "1234abcd",
		});
		console.log("login", res.data);
	};

	const profile = async () => {
		const res = await instance.get("/auth/profile");
		console.log("profile", res.data);
	};
	return (
		<div>
			<button onClick={login}>
				Login
			</button>
			<button onClick={profile}>
				Profile
			</button>
		</div>
	);
}

export default TestLayout;
