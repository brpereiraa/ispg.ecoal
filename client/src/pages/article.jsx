import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Article(props){
    const navigate = useNavigate();
    const [article,setArticle] = useState();
    const params = useParams();
    useEffect(()=>{
        getArticle();
    },[]);
    async function getArticle(){
        try{
            const response = await axios.get(props.server+`articles/${params.id}`);
            setArticle(response.data);
        } catch(err){
            navigate("/");
        }
        
    }
    function HeaderTag(props){
        return (
            <div className={`text-xs px-3 relative ${!props.last && "after:content[''] after:absolute after:h-2/3 after:w-0.5 after:bg-mt-green after:top-1/2 after:right-0 after:-translate-y-1/2"}`}>
                {props.name}
            </div>
        )
    }

    function ArticleContent(){
        return <div dangerouslySetInnerHTML={{
            __html: article.content
        }}/>
    }

    function NotConnectedPopup(){
        return (
            <div className="px-6 w-full absolute top-1/2 left-1/2 -translate-x-1/2">
                <div className=" bg-gradient-to-t from-green-800 to-mt-green w-full flex flex-col items-center text-white rounded-2xl px-5 py-8">
                    <h2 className="text-lg mb-1">You aren't connected</h2>
                    <p className="text-xxs text-center">Log in to access the rest of the article and comment it.</p>
                    <div className="flex flex-col items-center mt-6">
                        <Link to={"/login"} className="w-32 text-sm text-center bg-white text-mt-green rounded-3xl py-0.5 mb-1.5">Sign in</Link>
                        <Link to={"/register"} className="w-32 text-sm text-center text-mt-white rounded-3xl py-0.5 border border-white border-solid mt-1.5">Sign up</Link>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
        {article &&
        <div className={`w-full ${props.user ? "h-full" : "h-screen overflow-hidden"} relative`}>
            {props.user == null && <NotConnectedPopup/>
            }
            <div className="flex justify-center items-center mt-6 mb-4">
                {article.tags.map(v=>
                    <>{article.tags.indexOf(v)==article.tags.length-1 ? <HeaderTag {...v} last={true}/> : <HeaderTag {...v}/>}</>
                )}
            </div>
            <figure className="px-3 m-0">
                <img className="object-cover w-full h-20" src={article.thumbnailURL}/>
                <figcaption className="text-xs opacity-50 mt-2">
                    {article.thumbnailSource}
                </figcaption>
            </figure>
            <div className="px-8 mt-8">
                <div className="mb-5">
                    <h1 className="font-champ text-xl">{article.title}</h1>
                    <div className="text-xs">by <i>{article.author.name}</i></div>
                </div>
                <ArticleContent/>
            </div>
        </div>
        }</>
    )
}
export default Article;