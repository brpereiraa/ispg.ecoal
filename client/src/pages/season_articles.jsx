import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AccountArticle from "../components/AccountArticle";
function SeasonArticles(props){
    const params = useParams();
    const [season,setSeason] = useState();
    const [articles, setArticles] = useState([]);
    useEffect(()=>{
        getSeason();
    },[]);
    async function getSeason(){
        let seasons = {
            "spring": {
                name: "Spring",
                id: 1,
                color: "mt-green",
                cover: "https://t4.ftcdn.net/jpg/01/96/17/59/360_F_196175975_FIdTkaV9bXtABVs2ekQIBA1g0fXOsOJy.jpg"
            },
            "summer": {
                name: "Summer",
                id: 2,
                color: "mt-yellow",
                cover: "https://img.freepik.com/free-vector/gradient-summer-illustration_23-2148946644.jpg"
            },
            "autumn": {
                name: "Fall Season",
                id: 3,
                color: "mt-red",
                cover : "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072821_1280.jpg"
            },
            "winter": {
                name: "Winter",
                id: 4,
                color : "mt-blue",
                cover: "https://t4.ftcdn.net/jpg/00/64/81/97/360_F_64819783_bO18d6WGTEmDreGV8kHJd1uQ0w7ALl9n.jpg"
            }
        }
        setSeason(seasons[params.season]);
        try{
            const response = await axios.get(`${props.server}categories/${seasons[params.season].id}/`);
            setArticles(response.data);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className="w-full h-full">
            {(articles && articles.length>0 && season) && 
            <>
            <h1 className="text-center text-lg mt-5">Most <span className={`${"text-" + season.color}`}>popular</span> articles</h1>
            <div className="px-3">
                {articles.map(v=><div className={`border-b-2 ${"border-" + season.color} border-b-solid} py-5`}>
                    <AccountArticle {...v} server={props.server} color={season.color}/>
                </div>)}
            </div>
            </>}
        </div>
    )
}

export default SeasonArticles;