import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AccountArticle(props){
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
    function ArticleTags(props){
        const [tags,updateTags] = useState([]);
        useEffect(()=>{
            getTags();
        },[]);
        async function getTags(){
            try{
                const response = await axios.get(`${props.server}articles/${props.id}`);
                updateTags(response.data.tags);
            } catch(err){
                console.log(err.response.data)
            }
        }
        function ArticleTag(props){
            return (
                <div className={`text-xs px-5 py-0.5 ${props.color ? "border-" + props.color : "border-mt-green"} border border-solid rounded-3xl w-fit mr-3`}>
                    {props.name}
                </div>
            )
        }
        return (
            <div className="flex items-center mt-3">
                {tags.map(v=><ArticleTag {...v} color={props.color}/>)}
            </div>
        )
    }
    return(
        <div>
            <Link to={`/articles/${props.id}`} className="font-champ text-lg">
                {props.title}
            </Link>
            {props.author && <div className="text-xs">by <span>{props.author.name}</span></div>}
            <ArticleTags {...props}/>
            <p className="text-xs text-justify mr-10 mt-3">
                {getExcerpt()}
            </p>
        </div>
    )
}

export default AccountArticle;