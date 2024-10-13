const Footer = () => {
	return (
		<div className="bg-gray-200 w-full pt-3">
			<div className="flex justify-between">
				<div className="w-1/3 m-auto text-center">
					<h3 className="my-2 strong">Home</h3>
					<img className="bg-white w-full my-2" src="https://cdn.freebiesupply.com/images/large/2x/google-logo-transparent.png" alt="" />
					<input type="text" className="rounded-full w-3/4 p-1"/>
				</div>
				<div className="w-1/3 m-auto text-center">
					<h3 className="text-xl">Lorem</h3>
					<div className="flex">
						<div className="w-1/2 m-2 text-sm">
							<p className="bg-white w-full my-2">lorem</p>
							<p className="bg-white w-full my-2">lorem</p>
							<p className="bg-white w-full my-2">lorem</p>
						</div>
						<div className="w-1/2 m-2 text-sm">
							<p className="bg-white w-full my-2">lorem</p>
							<p className="bg-white w-full">lorem</p>
						</div>
					</div>
				</div>
				<div className="w-1/3  text-center">
					<h3>Lorem</h3>
					<div className="w-3/5 mx-auto text-sm">
						<p className="bg-white w-full my-2">lorem</p>
						<p className="bg-white w-full my-2">lorem</p>
						<p className="bg-white w-full my-2">lorem</p>
					</div>
				</div>
			</div>
			<div className="w-3/5 mx-auto flex justify-center my-2">
				<div className="w-10 h-10 bg-white rounded-full mx-2"></div>
				<div className="w-10 h-10 bg-white rounded-full mx-2"></div>
				<div className="w-10 h-10 bg-white rounded-full mx-2"></div>
			</div>
			<div className="text-center underline text-sm">
				<p>Copyright © 2024 Tailwind Labs Inc.</p>
			</div>
		</div>
	)
}

export default Footer;