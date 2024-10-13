import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Topics from "../components/AccountArticle/Topics";

function Season(props){
    const params = useParams();
    const [season,setSeason] = useState();
    const [leadedArticles,setLeadedArticles] = useState([]);
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
            const response = await axios.get(`${props.server}categories/${seasons[params.season].id}/leads`);
            setLeadedArticles(response.data);
        } catch(err){
            console.log(err);
        }
    }

    return (
        <>
        {season && 
        <div className="w-full h-full">
        <div className="py-10 relative">
            <div className="flex flex-col items-center relative z-10 text-white">
                <h1 className="text-lg mb-5">{season.name}</h1>
                <p className="text-xs text-center px-8">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis iusto tempore voluptatibus repellat? Cupiditate praesentium, architecto corporis, vero hic blanditiis odit, officia sequi aliquam at ea! Nemo culpa illum repudiandae?</p>
            </div>
            <img  className="absolute w-full h-full object-cover top-0 left-0 brightness-50" src={season.cover}/>
        </div>
        {leadedArticles.length > 0 &&
        <div className="px-6">
            <div className="py-5 flex flex-col">
                <h2 className="text-center text-lg">Hot topics</h2>
                {(leadedArticles && season.color) && <>
                <Topics topics={leadedArticles} color={season.color}/>
                <Link to={`/seasons/${params.season}/articles`} className={`self-center ${"bg-"+season.color} text-sm text-white px-8 py-1 mt-10 rounded-3xl`}>View all</Link>
                </>}
            </div>
        </div>}
    </div>}
    </>
    )
}
export default Season;