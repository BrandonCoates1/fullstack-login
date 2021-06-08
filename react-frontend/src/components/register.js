import React, { useState } from "react";

const Register = () => {
	const [user, setUser] = useState("Nothing yet");
	const [nameInput, setNameInput] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [passwordMatch, setPasswordMatch] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		const submitted = { name: nameInput, email: emailInput, password: passwordInput };

		try {
			if (passwordMatch !== passwordInput) {
				throw new Error("Password do not match");
			}

			const response = await fetch("http://localhost:5000/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json",
					"Origin": "http://localhost:3000"
				},
				body: JSON.stringify(submitted)
			});

			setNameInput("");
			setEmailInput("");
			setPasswordInput("");
			setPasswordMatch("");

			if (response.status !== 200) {
				const error = await response.json();
				throw new Error(error.error.sqlMessage);
			}

			const data = await response.json();
			setUser(data.data);
			setError("")
		} catch (Error) {
			setError(Error);
		}
	}

	const display = () => {
		if (error) {
			return <p>Registration Failed! <br />{error.toString()}</p>
		} else {
			return user.email ? <p>You have created an account with email {user.email}</p> : <p>try registering</p>
		}
	}

	return (
		<>
			<div className="container">
				<h1>Register</h1>
				<form onSubmit={handleSubmit} className="container-form">
					<input type="text"
						name="name"
						placeholder="Enter your name here"
						className="bar"
						value={nameInput}
						onChange={(e) => { setNameInput(e.target.value) }} />
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
					<input type="password"
						name="passwordMatch"
						placeholder="Enter your password again"
						className="bar"
						value={passwordMatch}
						onChange={(e) => { setPasswordMatch(e.target.value) }} />
					<input type="submit" name="submit" className="form-button" value="Submit" />
				</form>
			</div>
			{display()}
		</>
	);
}

export default Register;