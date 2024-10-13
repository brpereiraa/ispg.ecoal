import { Link } from "react-router-dom";

function SmallTopic(props){
    return (
        <div className={`w-full flex pt-5 pb-6 items-center relative after:absolute after:bottom-0 after:left-0 after:content-[''] after:${props.last ? "w-full" : "w-1/2"} after:h-1 after:bg-${props.color}`}>
            <figure className="w-1/2">
                <img className="w-full h-20 object-cover" src={props.thumbnailURL}/>
            </figure>
            <div className="ml-5">
                <Link to={`/articles/${props.id}`} className="font-champ text-sm">{props.title}</Link>
                <div className="text-xs mt-2">by <span className="italic">{props.author.name}</span></div>
            </div>
        </div>
    )
}

export default SmallTopic;