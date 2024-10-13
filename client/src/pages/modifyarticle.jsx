const ModifyArticle = () => {
	function Article(props){
		return (
			<>
				{!props.input ? 
					<div className="mt-4 mb-3">
						<h2 className="font-bold">{props.title}</h2>
						<p className="text-sm">{props.text}</p>
					</div>
					:
					<div className="mt-4 mb-3">
						<div className="flex justify-between">
							<h2 className="font-bold">{props.title}</h2>
							<p className="text-sm">Text</p>
						</div>
						<p className="text-sm">{props.text}</p>
					</div>
				}
			</>
		)
	}

	return (
		<div className="w-3/4 mx-auto">
			<h1 className="text-xl font-bold text-center">Title</h1>
			<Article
				title = "Title"
				text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit"
			/>
			<Article
				title = "Title"
				text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit"
			/>
			<Article
				title = "Title"
				text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem ipsum dolor sit"
				input = "1"
			/>
			<h1 className="text font-bold text-center">Subtitle</h1>
		</div>
	)
}

export default ModifyArticle;