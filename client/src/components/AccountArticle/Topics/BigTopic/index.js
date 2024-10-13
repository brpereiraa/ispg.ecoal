import { Link } from "react-router-dom";

function BigTopic(props){
    function getExcerpt(){
        let indexStart = props.content.indexOf(">");
        let indexEnd = props.content.indexOf("<",indexStart);
        if(indexStart!=null && indexEnd!=null){
            let res = props.content.substr(indexStart, indexEnd-indexStart).replace("<","").replace(">","");
            if(res.length > 250){
                return res.substr(0,250) + "..."
            } else {
                return res;
            }
        } else {
            return null;
        }
        
    }
    return (
        <div className={`w-full relative after:absolute after:bottom-0 after:left-0 after:content-[''] after:w-1/2 after:h-1 after:bg-${props.color} pt-5 pb-6`}>
            <figure className="w-full mb-5">
                <img className="w-full h-24 object-cover" src={props.thumbnailURL}/>
            </figure>
            <Link to={`/articles/${props.id}`} className="font-champ text-sm">{props.title}</Link>
            <div className="text-xs mb-3">by <span className="italic">{props.author.name}</span></div>
            <p className="text-xs italic">{getExcerpt()}</p>
        </div>
    )
}

export default BigTopic;