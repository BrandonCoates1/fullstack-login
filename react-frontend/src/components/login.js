import React, { useState } from "react";

const Login = () => {
	const [user, setUser] = useState("Nothing yet");
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const submitted = { email: emailInput, password: passwordInput };

		try {
			const response = await fetch("/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Origin": "http://localhost:3000"
				},
				body: JSON.stringify(submitted)
			});

			setEmailInput("");
			setPasswordInput("");

			if (response.status !== 200) {
				console.log(response);
				throw new Error("Failed to login");
			}

			const data = await response.json();
			setUser(data.user[0][0]);
			setError("")
		} catch (Error) {
			setError(Error);
		}
	}

	const display = () => {
		if (error) {
			return <p>Login Failed!</p>
		} else {
			return user.email ? <p>Hello, {user.name}</p> : <p>try logging in</p>
		}
	}

	return (
		<>
			<div className="container">
				<h1>Login</h1>
				<form onSubmit={handleSubmit} className="container-form">
					<input type="text"
						name="email"
						placeholder="Enter your email here"
						className="bar"
						value={emailInput}
						onChange={(e) => { setEmailInput(e.target.value) }} />
					<input type="password"
						name="password"
						placeholder="Enter your password here"
						className="bar"
						value={passwordInput}
						onChange={(e) => { setPasswordInput(e.target.value) }} />
					<input type="submit" name="submit" className="form-button" value="Submit" />
				</form>
				{display()}
			</div>
		</>
	);
}

export default Login;