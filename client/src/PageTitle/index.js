function PageTitle(props){
    return (
        <h1 className="font-champ text-xl w-fit mx-auto relative before:absolute before:-bottom-1 before:content[''] before:w-20 before:h-0.5 before:bg-mt-green before:left-1/2 before:-translate-x-1/2 mt-10 mb-10">{props.text}</h1>
    )
}

export default PageTitle;