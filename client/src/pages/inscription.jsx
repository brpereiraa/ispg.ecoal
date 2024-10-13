import { Fragment, useEffect, useState } from "react";
import PageTitle from "../PageTitle";
import InputField from "../components/Form/InputField";
import { Transition } from "@headlessui/react";
import Cta from "../components/Buttons/Cta";
import { Link, useNavigate } from "react-router-dom";
import FormBottomLink from "../components/Form/FormBottomLink";
import axios from "axios";

const Inscription = (props) => {
	const navigate = useNavigate();
	useEffect(()=>{
		if(props.user){
			setStep(2);
		}
	})
	const [user,updateUser] = useState(props.user);
	const [step,setStep] = useState(1);
	const [name,updateName] = useState();
	const [email,updateEmail] = useState();
	const [password,updatePassword] = useState();
	const [passwordConfirmation, updatePasswordConfirmation] = useState();
	const [errors,updateErrors] = useState([]);

	async function handleSubmit(event){
		event.preventDefault();
		const data = new FormData;
		data.append("name",name);
		data.append("email",email);
		data.append("password",password);
		data.append("password_confirmation",passwordConfirmation);
		try{
			const response = await axios.post(props.server+"register",data);
			const authorization = `${response.data.token_type} ${response.data.access_token}`;
			try {
				const response = await axios.get(props.server + "user",{
					headers: {
						Authorization : authorization
					}
				});
				props.changeUser(response.data);
				props.changeAuthorization(authorization);
				setStep(2);
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
		<>
		<Transition 
		as={Fragment}
		show={step==1}
		leave="transition-all duration-500"
		leaveFrom="transition-x-0"
		leaveTo="-transition-x-full">
			<div className="w-full h-full">
				<PageTitle text={"Register"}/>
				<form className="flex flex-col items-center" onSubmit={handleSubmit}>
					<InputField 
					name="name"
					label="Username"
					type="text"
					value={name}
					change={updateName}/>
					<InputField 
					name="email"
					label="Email"
					type="email"
					value={email}
					change={updateEmail}/>
					<InputField 
					name="password"
					label="Password"
					type="password"
					value={password}
					change={updatePassword}/>
					<InputField 
					name="password_confirmation"
					label="Confirm password"
					type="password"
					value={passwordConfirmation}
					change={updatePasswordConfirmation}/>
					<Cta
					type="submit"
					text="Continue"/>
					<p className="text-xs mt-2">Already an account ? <FormBottomLink text={"Sign in !"} to={"/login"}/></p>
				</form>
			</div>
		</Transition>
		<Transition
		as={Fragment}
		show={step==2}
		enter="transition-all duration-500 delay-550"
		enterFrom="translate-x-full"
		enterTo="translate-x-0">
			<div className="w-full h-full px-6 flex flex-col items-center">
				<PageTitle text={"Welcome to Mov'Trip"}/>
				<figure className="mb-5">
					<img src="/images/Spring-welcome-illustration.jpg"/>
				</figure>
				<h2 className="text-3xl font-champ mb-4">it's over, come and find out</h2>
				<p className="text-xs mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero fugiat beatae error reprehenderit accusamus, cumque distinctio debitis exercitationem fuga odit doloremque culpa eum labore porro quam velit! Perferendis, laudantium vel.</p>
				<Link to={"/"}>
					<Cta text="Discover" px={"6"}/>
				</Link>
			</div>
		</Transition>
		</>
	)
}

export default Inscription;