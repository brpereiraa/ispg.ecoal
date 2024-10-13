import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Topics from "../components/AccountArticle/Topics";

const Home = (props) => {
	const [leadedArticles, setLeadedArticles] = useState([]);
	useEffect(()=>{
		getLeadedArticles()
	},[]);
	async function getLeadedArticles(){
		try{
			const response = await axios.get(`${props.server}articles/leads`);
			setLeadedArticles(response.data);
		} catch(err){
			console.log(err.response.data);
		}
	}

	function Seasons(){
		function Season(props){
			return <Link to={`/seasons/${props.name}`}>
				<div className="w-full text-white relative min-h-20 p-3 rounded-2xl overflow-hidden my-3">
					<h3 className="capitalize text-sm relative z-10">{props.name}</h3>
					<img className="absolute w-full h-full object-cover top-0 left-0 brightness-50"src={props.image}/>
				</div>
			</Link>
		}

		return <div className="w-full py-5">
			<Season name="autumn" image="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg"/>
			<Season name="winter" image="https://t4.ftcdn.net/jpg/00/64/81/97/360_F_64819783_bO18d6WGTEmDreGV8kHJd1uQ0w7ALl9n.jpg"/>
			<Season name="spring" image="https://t4.ftcdn.net/jpg/01/96/17/59/360_F_196175975_FIdTkaV9bXtABVs2ekQIBA1g0fXOsOJy.jpg"/>
			<Season name="summer" image="https://img.freepik.com/free-vector/gradient-summer-illustration_23-2148946644.jpg"/>
		</div>
	}

	return (
		<div className="w-full h-full">
			<div className="bg-gradient-to-t from-green-800 to-mt-green text-white flex flex-col items-center py-10">
				{props.user ? <>
					<h1 className="text-lg mb-5">Welcome back {props.user.name}</h1>
					<p className="text-xs text-center px-8 mb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis iusto tempore voluptatibus repellat? Cupiditate praesentium, architecto corporis, vero hic blanditiis odit, officia sequi aliquam at ea! Nemo culpa illum repudiandae?</p>
					<div className="flex flex-col items-center">
						<Link to={"/account"} className="w-28 text-center text-mt-green bg-white py-0.5 rounded-3xl text-sm mb-3">My account</Link>
					</div>
				</> : <>
					<h1 className="text-lg mb-5">Welcome to Mov'Trip</h1>
					<p className="text-xs text-center px-8 mb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis iusto tempore voluptatibus repellat? Cupiditate praesentium, architecto corporis, vero hic blanditiis odit, officia sequi aliquam at ea! Nemo culpa illum repudiandae?</p>
					<div className="flex flex-col items-center">
						<Link to={"/login"} className="w-28 text-center text-mt-green bg-white py-0.5 rounded-3xl text-sm mb-3">Sign in</Link>
						<Link to={"/register"} className="w-28 text-center text-mt-white py-0.5 rounded-3xl text-sm border border-white border-solid">Sign up</Link>
					</div>
				</>}
			</div>
			<div className="px-6">
				<div className="py-5">
					<h2 className="text-center text-lg">Hot topics</h2>
					{leadedArticles && <Topics topics={leadedArticles} color="mt-green"/>}
				</div>
			</div>
			<div className="px-3">
				<div className="py-5">
					<h2 className="text-center text-lg mb-3">Choose your <span className="text-mt-green">season</span></h2>
					<p className="text-center text-xs italic px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum odio, officia est perspiciatis corporis similique magnam doloribus ullam dicta quos vero debitis nulla unde facere, placeat rem enim ad!</p>
					<Seasons/>
				</div>
			</div>
		</div>
	)
}

export default Home;