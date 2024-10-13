import { useEffect, useState } from "react";
import PageTitle from "../PageTitle";
import InputField from "../components/Form/InputField";
import Cta from "../components/Buttons/Cta";
import FormBottomLink from "../components/Form/FormBottomLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Connection = (props) => {
	const navigate = useNavigate();
	useEffect(()=>{
		if(props.user){
			navigate("/");
		}
	})
	const [email,updateEmail] = useState();
	const [password,updatePassword] = useState();
	const [errors, updateErrors] = useState([]);

	async function handleSubmit(event){
		event.preventDefault();
		const data = new FormData;
		data.append("email",email);
		data.append("password",password);
		try{
			const response = await axios.post(props.server+"login",data);
			const authorization = `${response.data.token_type} ${response.data.access_token}`;
			try {
				const response = await axios.get(props.server + "user",{
					headers: {
						Authorization : authorization
					}
				});
				props.changeUser(response.data);
				props.changeAuthorization(authorization);
				navigate("/");
			} catch (err){
				console.log(err.response.data);
				updateErrors(err.response.data);
			}
		} catch(err){
			console.log(err.response.data);
			updateErrors(err.response.data);
		}
	}

	return (
		<div className="w-full h-full flex flex-col items-center">
			<PageTitle text={"Login"}/>
			<form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
				<div className="flex flex-col items-center mb-10 w-full">
					<InputField
					name="email"
					type="email"
					label="Email"
					value={email}
					change={updateEmail}/>
				</div>
				<div className="flex flex-col items-center w-full">
					<InputField
					name="password"
					type="password"
					label="Password"
					value={password}
					change={updatePassword}
					/>
				</div>
				<Cta
				type="submit"
				text="Sign in"
				px={6}/>
				<p className="text-xs mt-2">No account ? <FormBottomLink text={"Sign up !"} to={"/register"}/></p>
			</form>
		</div>
	)
}

export default Connection;