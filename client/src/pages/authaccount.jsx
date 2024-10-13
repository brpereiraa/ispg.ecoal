const AuthAccount = () => {
	
	function Settings(){
		return (
			<div className="flex justify-between">
				<div className="w-8/12">
					<p className="w-3/4 text-xl font-bold">Header 1</p>
					<p className="text-sm">Subtitle</p>
					<p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
				</div>
				<div class="">
					<img className="rounded-full align-middle" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3ASample_User_Icon.png&psig=AOvVaw30Jc-_3Gb0zSub5NqLknO0&ust=1707987319495000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCMCWw926qoQDFQAAAAAdAAAAABAQ" alt="img" />					
				</div>
			</div>
		)
	};

	function User(){
		return (
			<div>
				<div className="w-2/4 mx-auto text-center">
					<img src="" alt="" />
					<p className="font-bold text-2xl mb-2">Bruno</p>
					<p className="text-sm mb-1">Bio: Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
					<p className="text-xs font-bold">Articles:</p>
				</div>
			</div>
		)
	}

	return (
		<div className="mx-4">
			<User/>
			<div className="flex justify-end mt-4 mb-3">
				<select className=""name="Sort" id="">
					<option value="Order">Order</option>
					<option value="Alphabet">Alphabet</option>
				</select>
			</div>
			<Settings/>
			<Settings/>
		</div>
	)
}

export default AuthAccount;