const TermsOfUse = () => {
	function Condition(props){
		return (
			<div>
				<h2 className="font-dm font-bold">{props.title}</h2>
				<p className="font-dm text-xs mt-2">{props.text}</p>
			</div>
		)
	}

	return (
		<div className="w-full h-full">
			<h1 className="bg-mt-green mt-6 h-14 text-white text-xl font-dm font-bold flex items-center justify-center">Term Of Use.</h1>
			<div className="mx-8">
				<div className="mt-6 mx-auto">
					<p className="text-xs">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat adipisci temporibus, atque culpa recusandae nesciunt expedita sint, quia mollitia sapiente cupiditate aut libero numquam laborum eum maxime at. Totam, nihil.</p>
				</div>
				<div className="my-8 mx-auto">
					<Condition 
						title="Lorem Ipsum" 
						text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat adipisci temporibus, atque culpa recusandae nesciunt expedita sint, quia mollitia sapiente cupiditate aut libero numquam laborum eum maxime at. Totam, nihil."
					/>
				</div>
				<div className="w-3/4 h-0.5 bg-mt-green mx-auto"></div>
				<div className="my-8 mx-auto">
					<Condition 
						title="Lorem Ipsum" 
						text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat adipisci temporibus, atque culpa recusandae nesciunt expedita sint, quia mollitia sapiente cupiditate aut libero numquam laborum eum maxime at. Totam, nihil."
					/>
				</div>
				<div className="w-3/4 h-0.5 bg-mt-green mx-auto"></div>
				<div className="my-8 mx-auto">
					<Condition 
						title="Lorem Ipsum" 
						text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat adipisci temporibus, atque culpa recusandae nesciunt expedita sint, quia mollitia sapiente cupiditate aut libero numquam laborum eum maxime at. Totam, nihil."
					/>
				</div>
			</div>
			
		</div>
	)
}

export default TermsOfUse;