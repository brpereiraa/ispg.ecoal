import { createElement, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Cta from "../components/Buttons/Cta";
import CheckboxField from "../components/Form/CheckboxField";

function CreateArticle(props){
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(props.user);
        if(props.user==null){
            navigate("/login");
        } else if(props.user.admin==0){
            navigate("/");
        }
    });
    const [seasons,updateSeasons] = useState([1,2,3,4]);
    const [title,updateTitle] = useState();
    const [tags,updateTags] = useState();
    const [thumbnailName, updateThumbnailName] = useState();
    const [thumbnail, updateThumbnail] = useState();
    const [blocks,updateBlocks] = useState([]);
    const [block,changeBlock] = useState();
    const [lead,updateLead] = useState(false);
    const [menu,setMenu] = useState(false);

    function addBlock(element,props,text){
        let newBlockList = [...blocks];
        newBlockList.push({
            element : element,
            props: {
                ...props,
            },
            text : text,
            id: newBlockList.length+1
        })
        updateBlocks(newBlockList);
    }

    function deleteBlock(id){
        let newBlockList = blocks.filter(v=>v.id!=id);
        updateBlocks(newBlockList);
    }

    function moveBlockAbove(id){
        let newBlockList = [...blocks];
        let currentBlock = newBlockList.filter(v=>v.id==id)[0];
        let currentBlockIndex = newBlockList.indexOf(currentBlock);
        if(currentBlockIndex>0){
            let previousBlock = newBlockList[currentBlockIndex-1];
            newBlockList[currentBlockIndex-1] = currentBlock;
            newBlockList[currentBlockIndex] = previousBlock;
            updateBlocks(newBlockList);
        }
    }

    function moveBlockBelow(id){
        let newBlockList = [...blocks];
        let currentBlock = newBlockList.filter(v=>v.id==id)[0];
        let currentBlockIndex = newBlockList.indexOf(currentBlock);
        console.log(currentBlockIndex, newBlockList.length)
        if(currentBlockIndex<newBlockList.length-1){
            let nextBlock = newBlockList[currentBlockIndex+1];
            newBlockList[currentBlockIndex+1] = currentBlock;
            newBlockList[currentBlockIndex] = nextBlock;
            updateBlocks(newBlockList);
        }
    }


    async function submitArticle(event){
        event.preventDefault();
        let content = document.querySelector("#article-content");
        let stringContent = content.innerHTML;
        let tagsList = tags.split(",");
        const data = new FormData;
        data.append("title",title);
        data.append("content",stringContent);
        data.append("thumbnailFILE",thumbnail);
        data.append("thumbnailSource",thumbnailName);
        if(tagsList.length>0){
            tagsList.forEach(v=>data.append("tags[]",v));
        }
        seasons.forEach(v=>data.append("categories[]",v));
        if(lead){
            data.append("leadStory",true);
        }
        console.log(data);
        try{
            const response = await axios.post(props.server + "articles",data,{
                headers: {
                    Authorization : props.authorization,
                    "Content-Type" : "multipart/form-data"
                }
            });
            props.updateUser();
            navigate("/articles/"+response.data);
        } catch(err){
            console.log(err.response.data);
        }
        
    }

    function getElementType(element){
        let availableElements = ["p","h2"];
        for(let availableElement of availableElements){
            if(element.querySelector(availableElement)!=null){
                return availableElement;
            }
        }
    }

    function getBlock(id){
        return blocks.filter(v=>v.id==id)[0];
    }

    function Subtitle(props){
        return <h2 className="mb-5 sm relative before:absolute before:w-2 before:aspect-square before:-left-2 before:top-1/2 before:bg-mt-green before:rounded-full before:-translate-x-full before:-translate-y-1/2">{props.text}</h2>
    }

    function Block(props){
        let icon = null;
        let name = null;
        if(props.element=="h2" || props.element == "p"){
            icon = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 3.05005H1.5M10.5 6.05005H1.5M7.55 9.00005H1.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            if(props.element=="p"){
                name = "Paragraph"
            } else {
                name = "Subtitle"
            }
        } else if(props.element=="i"){
            icon=<svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.136 1.8525C5.1882 1.93602 5.22344 2.02901 5.2397 2.12615C5.25597 2.22329 5.25294 2.32268 5.2308 2.41865C5.20865 2.51462 5.16782 2.60528 5.11063 2.68547C5.05344 2.76566 4.98102 2.8338 4.8975 2.886C3.98421 3.45403 3.2589 4.279 2.8125 5.2575C3.26392 5.21975 3.71621 5.31914 4.11022 5.54266C4.50422 5.76618 4.82159 6.10342 5.02078 6.51026C5.21998 6.91711 5.29174 7.3746 5.22666 7.82289C5.16159 8.27119 4.96272 8.6894 4.65607 9.02281C4.34941 9.35623 3.94926 9.58932 3.50797 9.69159C3.06667 9.79385 2.60478 9.76054 2.18273 9.596C1.76068 9.43146 1.39812 9.14336 1.14249 8.76939C0.886862 8.39542 0.750066 7.95299 0.75 7.5V7.47975C0.750586 7.42169 0.753088 7.36365 0.7575 7.30575C0.76425 7.19325 0.77775 7.03575 0.804 6.84225C0.8565 6.4575 0.95925 5.92725 1.167 5.33175C1.581 4.13925 2.4195 2.6655 4.1025 1.614C4.18602 1.5618 4.27901 1.52656 4.37614 1.5103C4.47328 1.49403 4.57268 1.49706 4.66865 1.51921C4.76461 1.54135 4.85528 1.58219 4.93547 1.63937C5.01566 1.69656 5.0838 1.76898 5.136 1.8525ZM10.386 1.8525C10.4382 1.93602 10.4734 2.02901 10.4897 2.12615C10.506 2.22329 10.5029 2.32268 10.4808 2.41865C10.4586 2.51462 10.4178 2.60528 10.3606 2.68547C10.3034 2.76566 10.231 2.8338 10.1475 2.886C9.23418 3.45399 8.50887 4.27897 8.0625 5.2575C8.51392 5.21975 8.96621 5.31914 9.36022 5.54266C9.75422 5.76618 10.0716 6.10342 10.2708 6.51026C10.47 6.91711 10.5417 7.3746 10.4767 7.82289C10.4116 8.27119 10.2127 8.6894 9.90606 9.02281C9.59941 9.35623 9.19926 9.58932 8.75797 9.69159C8.31667 9.79385 7.85478 9.76054 7.43273 9.596C7.01068 9.43146 6.64812 9.14336 6.39249 8.76939C6.13686 8.39542 6.00007 7.95299 6 7.5V7.47975C6.00059 7.42169 6.00309 7.36365 6.0075 7.30575C6.01425 7.19325 6.02775 7.03575 6.054 6.84225C6.1065 6.4575 6.20925 5.92725 6.417 5.33175C6.831 4.13925 7.6695 2.6655 9.3525 1.614C9.43602 1.5618 9.52901 1.52656 9.62614 1.5103C9.72328 1.49403 9.82268 1.49706 9.91864 1.51921C10.0146 1.54135 10.1053 1.58219 10.1855 1.63937C10.2657 1.69656 10.3338 1.76898 10.386 1.8525Z" fill="#1B1B1B"/>
                        </svg>
            name="Quotation"
        }
        return (
            <div className="flex items-center w-full">
                <MenuBlock icon={icon} text={name} action={()=>{
                    changeBlock(getBlock(props.id))
                }} delete={()=>{
                    deleteBlock(props.id)
                }}/>
                <div className="invert -translate-y-2 ml-2 flex flex-col justify-center">
                    <button className="w-fit h-fit rotate-180" onClick={(e)=>{
                        e.preventDefault();
                        moveBlockAbove(props.id)
                    }}>
                        <svg width="16" height="16" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.06049 1.53284L1.06048 1.53283C1.02699 1.50271 0.999921 1.46646 0.980939 1.4261C0.961952 1.38573 0.951461 1.34209 0.950142 1.2977C0.948823 1.25331 0.956706 1.20915 0.973281 1.16778C0.989853 1.12642 1.01476 1.08874 1.04644 1.05681C1.07812 1.0249 1.11596 0.999364 1.15774 0.981555C1.19951 0.963748 1.24447 0.953982 1.29007 0.952754C1.33567 0.951526 1.38112 0.958857 1.42385 0.974375L1.06049 1.53284ZM1.06049 1.53284L3.75889 3.95914C3.75889 3.95914 3.7589 3.95915 3.7589 3.95915C3.82398 4.01772 3.90967 4.05 3.99832 4.05C4.08697 4.05 4.17267 4.01771 4.23774 3.95914L6.93593 1.5333C6.93602 1.53322 6.93611 1.53314 6.9362 1.53306C6.97028 1.50319 6.99796 1.46705 7.01751 1.42665C7.03711 1.38613 7.04811 1.34221 7.04978 1.29745C7.05145 1.25268 7.04375 1.2081 7.0272 1.16631C7.01065 1.12453 6.98561 1.08647 6.95367 1.05426C6.92173 1.02206 6.88352 0.99635 6.84133 0.978513C6.79914 0.960677 6.75374 0.951032 6.70774 0.950079C6.66174 0.949125 6.61596 0.956878 6.57302 0.972939C6.53019 0.988959 6.49097 1.01296 6.45768 1.04366C6.45759 1.04374 6.4575 1.04382 6.45742 1.0439L3.99832 3.25472L1.53932 1.04345L1.06049 1.53284Z" fill="#1B1B1B" stroke="#1B1B1B" stroke-width="0.1"/>
                        </svg>
                    </button>
                    <button className="w-fit h-fit" onClick={(e)=>{
                        e.preventDefault();
                        moveBlockBelow(props.id)
                    }}>
                        <svg width="16" height="16" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.06049 1.53284L1.06048 1.53283C1.02699 1.50271 0.999921 1.46646 0.980939 1.4261C0.961952 1.38573 0.951461 1.34209 0.950142 1.2977C0.948823 1.25331 0.956706 1.20915 0.973281 1.16778C0.989853 1.12642 1.01476 1.08874 1.04644 1.05681C1.07812 1.0249 1.11596 0.999364 1.15774 0.981555C1.19951 0.963748 1.24447 0.953982 1.29007 0.952754C1.33567 0.951526 1.38112 0.958857 1.42385 0.974375L1.06049 1.53284ZM1.06049 1.53284L3.75889 3.95914C3.75889 3.95914 3.7589 3.95915 3.7589 3.95915C3.82398 4.01772 3.90967 4.05 3.99832 4.05C4.08697 4.05 4.17267 4.01771 4.23774 3.95914L6.93593 1.5333C6.93602 1.53322 6.93611 1.53314 6.9362 1.53306C6.97028 1.50319 6.99796 1.46705 7.01751 1.42665C7.03711 1.38613 7.04811 1.34221 7.04978 1.29745C7.05145 1.25268 7.04375 1.2081 7.0272 1.16631C7.01065 1.12453 6.98561 1.08647 6.95367 1.05426C6.92173 1.02206 6.88352 0.99635 6.84133 0.978513C6.79914 0.960677 6.75374 0.951032 6.70774 0.950079C6.66174 0.949125 6.61596 0.956878 6.57302 0.972939C6.53019 0.988959 6.49097 1.01296 6.45768 1.04366C6.45759 1.04374 6.4575 1.04382 6.45742 1.0439L3.99832 3.25472L1.53932 1.04345L1.06049 1.53284Z" fill="#1B1B1B" stroke="#1B1B1B" stroke-width="0.1"/>
                        </svg>
                    </button>
                </div>
            </div>
        )
    }

    function EditBlock(props){
        console.log(props);
        let icon = null;
        let name = null;
        if(props.element=="h2" || props.element == "p"){
            icon = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.5 3.05005H1.5M10.5 6.05005H1.5M7.55 9.00005H1.5" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            if(props.element=="p"){
                name = "Paragraph"
            } else {
                name = "Subtitle"
            }
        } else if(props.element=="i"){
            icon=<svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.136 1.8525C5.1882 1.93602 5.22344 2.02901 5.2397 2.12615C5.25597 2.22329 5.25294 2.32268 5.2308 2.41865C5.20865 2.51462 5.16782 2.60528 5.11063 2.68547C5.05344 2.76566 4.98102 2.8338 4.8975 2.886C3.98421 3.45403 3.2589 4.279 2.8125 5.2575C3.26392 5.21975 3.71621 5.31914 4.11022 5.54266C4.50422 5.76618 4.82159 6.10342 5.02078 6.51026C5.21998 6.91711 5.29174 7.3746 5.22666 7.82289C5.16159 8.27119 4.96272 8.6894 4.65607 9.02281C4.34941 9.35623 3.94926 9.58932 3.50797 9.69159C3.06667 9.79385 2.60478 9.76054 2.18273 9.596C1.76068 9.43146 1.39812 9.14336 1.14249 8.76939C0.886862 8.39542 0.750066 7.95299 0.75 7.5V7.47975C0.750586 7.42169 0.753088 7.36365 0.7575 7.30575C0.76425 7.19325 0.77775 7.03575 0.804 6.84225C0.8565 6.4575 0.95925 5.92725 1.167 5.33175C1.581 4.13925 2.4195 2.6655 4.1025 1.614C4.18602 1.5618 4.27901 1.52656 4.37614 1.5103C4.47328 1.49403 4.57268 1.49706 4.66865 1.51921C4.76461 1.54135 4.85528 1.58219 4.93547 1.63937C5.01566 1.69656 5.0838 1.76898 5.136 1.8525ZM10.386 1.8525C10.4382 1.93602 10.4734 2.02901 10.4897 2.12615C10.506 2.22329 10.5029 2.32268 10.4808 2.41865C10.4586 2.51462 10.4178 2.60528 10.3606 2.68547C10.3034 2.76566 10.231 2.8338 10.1475 2.886C9.23418 3.45399 8.50887 4.27897 8.0625 5.2575C8.51392 5.21975 8.96621 5.31914 9.36022 5.54266C9.75422 5.76618 10.0716 6.10342 10.2708 6.51026C10.47 6.91711 10.5417 7.3746 10.4767 7.82289C10.4116 8.27119 10.2127 8.6894 9.90606 9.02281C9.59941 9.35623 9.19926 9.58932 8.75797 9.69159C8.31667 9.79385 7.85478 9.76054 7.43273 9.596C7.01068 9.43146 6.64812 9.14336 6.39249 8.76939C6.13686 8.39542 6.00007 7.95299 6 7.5V7.47975C6.00059 7.42169 6.00309 7.36365 6.0075 7.30575C6.01425 7.19325 6.02775 7.03575 6.054 6.84225C6.1065 6.4575 6.20925 5.92725 6.417 5.33175C6.831 4.13925 7.6695 2.6655 9.3525 1.614C9.43602 1.5618 9.52901 1.52656 9.62614 1.5103C9.72328 1.49403 9.82268 1.49706 9.91864 1.51921C10.0146 1.54135 10.1053 1.58219 10.1855 1.63937C10.2657 1.69656 10.3338 1.76898 10.386 1.8525Z" fill="#1B1B1B"/>
                        </svg>
            name="Quotation"
        }
        return (
            <>
            <div className="bg-white w-full text-mt-black text-xs w-full p-3 rounded-xl mb-4">
                <div className="flex items-center">
                    {icon}
                    <span className="ml-3">{name}</span>
                </div>
                <textarea onChange={(e)=>{
                    block.text = e.target.value
                }} className="outline-none w-full text-xs mt-2 min-h-48" placeholder="My text...">{block.text}</textarea>
                
            </div>
            <button className="bg-white w-8 aspect-square relative rounded-full" onClick={(e)=>{
                e.preventDefault();
                editBlockText(props.id);
            }}>
                <svg width="20" height="20" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.375 1L4.125 7.25L1 4.125" stroke="#1B1B1B" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            </>
        )
    }

    function editBlockText(id){
        const newBlockList = [...blocks];
        const blockId = newBlockList.indexOf(newBlockList.filter(v=>v.id==id)[0]);
        if(block.element!="i"){
            newBlockList[blockId].text = block.text;
        } else {
            newBlockList[blockId].text = '"' + block.text + '"';
        }
        updateBlocks(newBlockList);
        changeBlock(null);
    }

    function MenuBlock(props){
        return (
            <div className={`flex items-center justify-between bg-white w-full text-mt-black text-xs w-full p-3 rounded-xl mb-4`}>
                <div className="flex items-center grow" onClick={props.action}>
                    {props.icon}
                    <span className="ml-3">{props.text}</span>
                </div>
                {props.delete && <button onClick={props.delete}>X</button>}
            </div>
        )
    }

    function Menu(){
        window.addEventListener("mousedown",closeMenu);
        function closeMenu(event){
            if(event.target.closest("#article-menu")==null){
                setMenu(false);
                window.removeEventListener("mousedown",closeMenu)
            }
        }
        return (
            <div className="fixed top-0 left-0 z-50 w-screen h-screen backdrop-blur-sm flex flex-col justify-center items-center px-5">
                <div className="bg-gradient-to-t from-green-800 to-mt-green text-white flex flex-col items-center w-full rounded-2xl py-6 relative" id="article-menu">
                    <h2 className="text-xl mb-5">Add a section</h2>
                    <div className="w-full px-10">
                        <MenuBlock
                        icon={<svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 3.05005H1.5M10.5 6.05005H1.5M7.55 9.00005H1.5" stroke="#1B1B1B" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        }
                        text="Subtitle"
                        action={()=>{
                            addBlock("h2",{
                                className: "text-lg mb-6 bold"
                            },"");
                        }}
                        />
                        <MenuBlock
                        icon={<svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 3.05005H1.5M10.5 6.05005H1.5M7.55 9.00005H1.5" stroke="#1B1B1B" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        }
                        text="Paragraph"
                        action={()=>{
                            addBlock("p",{
                                className:"text-xs text-justify mb-5"
                            },"");
                        }}/>
                        <MenuBlock
                        icon={<svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.136 1.8525C5.1882 1.93602 5.22344 2.02901 5.2397 2.12615C5.25597 2.22329 5.25294 2.32268 5.2308 2.41865C5.20865 2.51462 5.16782 2.60528 5.11063 2.68547C5.05344 2.76566 4.98102 2.8338 4.8975 2.886C3.98421 3.45403 3.2589 4.279 2.8125 5.2575C3.26392 5.21975 3.71621 5.31914 4.11022 5.54266C4.50422 5.76618 4.82159 6.10342 5.02078 6.51026C5.21998 6.91711 5.29174 7.3746 5.22666 7.82289C5.16159 8.27119 4.96272 8.6894 4.65607 9.02281C4.34941 9.35623 3.94926 9.58932 3.50797 9.69159C3.06667 9.79385 2.60478 9.76054 2.18273 9.596C1.76068 9.43146 1.39812 9.14336 1.14249 8.76939C0.886862 8.39542 0.750066 7.95299 0.75 7.5V7.47975C0.750586 7.42169 0.753088 7.36365 0.7575 7.30575C0.76425 7.19325 0.77775 7.03575 0.804 6.84225C0.8565 6.4575 0.95925 5.92725 1.167 5.33175C1.581 4.13925 2.4195 2.6655 4.1025 1.614C4.18602 1.5618 4.27901 1.52656 4.37614 1.5103C4.47328 1.49403 4.57268 1.49706 4.66865 1.51921C4.76461 1.54135 4.85528 1.58219 4.93547 1.63937C5.01566 1.69656 5.0838 1.76898 5.136 1.8525ZM10.386 1.8525C10.4382 1.93602 10.4734 2.02901 10.4897 2.12615C10.506 2.22329 10.5029 2.32268 10.4808 2.41865C10.4586 2.51462 10.4178 2.60528 10.3606 2.68547C10.3034 2.76566 10.231 2.8338 10.1475 2.886C9.23418 3.45399 8.50887 4.27897 8.0625 5.2575C8.51392 5.21975 8.96621 5.31914 9.36022 5.54266C9.75422 5.76618 10.0716 6.10342 10.2708 6.51026C10.47 6.91711 10.5417 7.3746 10.4767 7.82289C10.4116 8.27119 10.2127 8.6894 9.90606 9.02281C9.59941 9.35623 9.19926 9.58932 8.75797 9.69159C8.31667 9.79385 7.85478 9.76054 7.43273 9.596C7.01068 9.43146 6.64812 9.14336 6.39249 8.76939C6.13686 8.39542 6.00007 7.95299 6 7.5V7.47975C6.00059 7.42169 6.00309 7.36365 6.0075 7.30575C6.01425 7.19325 6.02775 7.03575 6.054 6.84225C6.1065 6.4575 6.20925 5.92725 6.417 5.33175C6.831 4.13925 7.6695 2.6655 9.3525 1.614C9.43602 1.5618 9.52901 1.52656 9.62614 1.5103C9.72328 1.49403 9.82268 1.49706 9.91864 1.51921C10.0146 1.54135 10.1053 1.58219 10.1855 1.63937C10.2657 1.69656 10.3338 1.76898 10.386 1.8525Z" fill="#1B1B1B"/>
                        </svg>
                        }
                        text="Quotation"
                        action={()=>{
                            addBlock("i",{
                                className: "block text-xs text-mt-green text-center px-2 mb-5"
                            },"");
                        }}/>
                    </div>
                </div>
            </div>
        )
    }

    function seasonsList(){
        let seasonsStrings = {
            1: "Spring",
            2: "Summer",
            3: "Autumn",
            4: "Winter"
        }
        if(seasons.length==4){
            return "All seasons";
        } else {
            return seasons.map(v=>seasonsStrings[v]).join(" ")
        }
    }

    function SeasonsSelect(){
        const [menu,setMenu] = useState(false);
        function newSeasons(id){
            let newSeasons = [...seasons];
            if(newSeasons.includes(id)){
                newSeasons = newSeasons.filter(v=>v!=id);
            } else {
                newSeasons.push(id)
            }
            updateSeasons(newSeasons);
        }
        function Season(props){
            return (
                <div className="bg-white py-1 flex justify-between items-center" onClick={()=>{
                    newSeasons(props.id);
                }}>
                    <span>{props.text}</span>
                    {seasons.includes(props.id) && <div className="w-3 aspect-square bg-gradient-to-t from-green-800 to-mt-green text-white rounded"></div>}
                </div>
            )
        }
        return (
            <div className="w-fit">
                <div className={`w-fit border-mt-green border-solid border-2 rounded-3xl text-xs py-1 px-3 outline-none flex justify-between items-center ${menu && "bg-gradient-to-t from-green-800 to-mt-green text-white"}`} onClick={()=>{
                    setMenu(!menu);
                }}>
                    <span className="mr-3">{seasonsList()}</span>
                    <svg width="10" height="10" className={menu && "rotate-180 invert"}viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.06048 1.53283L1.06049 1.53284L3.75889 3.95914C3.75889 3.95914 3.7589 3.95915 3.7589 3.95915C3.82398 4.01772 3.90967 4.05 3.99832 4.05C4.08696 4.05 4.17265 4.01772 4.23772 3.95916C4.23773 3.95915 4.23774 3.95914 4.23774 3.95914L6.93593 1.5333C6.93602 1.53322 6.93611 1.53313 6.93621 1.53305C6.97029 1.50318 6.99797 1.46704 7.01751 1.42665C7.03711 1.38613 7.04811 1.34221 7.04978 1.29745C7.05145 1.25268 7.04375 1.2081 7.0272 1.16631C7.01065 1.12453 6.98561 1.08647 6.95367 1.05426C6.92173 1.02206 6.88352 0.99635 6.84133 0.978513C6.79914 0.960677 6.75374 0.951032 6.70774 0.950079C6.66174 0.949125 6.61596 0.956878 6.57302 0.972939C6.5302 0.988956 6.49098 1.01295 6.45769 1.04364C6.4576 1.04373 6.45751 1.04381 6.45742 1.0439L3.99832 3.25472L1.53932 1.04345C1.53932 1.04345 1.53931 1.04344 1.53931 1.04344C1.50583 1.01332 1.46658 0.989892 1.42385 0.974375C1.38112 0.958857 1.33567 0.951526 1.29007 0.952754C1.24447 0.953982 1.19951 0.963748 1.15774 0.981556C1.11596 0.999364 1.07812 1.0249 1.04644 1.05681C1.01476 1.08874 0.989853 1.12642 0.973281 1.16778C0.956706 1.20915 0.948823 1.25331 0.950142 1.2977C0.951461 1.34209 0.961952 1.38573 0.980938 1.4261C0.999922 1.46646 1.02699 1.50271 1.06048 1.53283Z" fill="#1B1B1B" stroke="#1B1B1B" stroke-width="0.1"/>
                    </svg>
                </div>
                {menu &&
                <div className="w-full border-mt-green border-solid border-2 rounded-xl text-xs pb-1 pt-5 -translate-y-5 px-3 outline-none flex flex-col">
                    <Season text="Spring" id={1}/>
                    <Season text="Summer" id={2}/>
                    <Season text="Autumn" id={3}/>
                    <Season text="Winter" id={4}/>
                </div>}
            </div>
        )
    }
    

    return (
        <>
        <div className="w-full h-full px-8">
            <h1 className="text-xl text-center my-10 bold">Publish your own article !</h1>
            <form onSubmit={submitArticle}>
                <div className="mb-10">
                    <Subtitle text="About your theme"/>
                    <div className="flex flex-col mb-5">
                        <label className="flex justify-between items-center w-full mb-2">
                            <span className="text-sm">My article concerns</span>
                        </label>
                        <SeasonsSelect/>
                    </div>
                    <div className="flex flex-col mb-5">
                        <label for={"title"} className="flex justify-between items-center w-full mb-2">
                            <span className="text-sm">Title</span>
                            <span className="text-xxs">100 characters max</span>
                        </label>
                        <input className="w-full border-mt-green border-solid border-2 rounded-3xl text-xs py-1 px-3 outline-none" onChange={(event)=>{
                            updateTitle(event.target.value);
                        }} type={"text"} value={title} maxLength={100} required placeholder="Anna Derick"/>
                    </div>
                    <div className="flex flex-col mb-5">
                        <label for={"tags"} className="flex justify-between items-center w-full mb-2">
                            <span className="text-sm">Tags</span>
                        </label>
                        <input className="w-full border-mt-green border-solid border-2 rounded-3xl text-xs py-1 px-3 outline-none" onChange={(event)=>{
                            updateTags(event.target.value);
                        }} type={"text"} value={tags} placeholder="Italy, Countryside, Family"/>
                    </div>
                    <div className="flex flex-col mb-5">
                        <label for={"thumbnailName"} className="flex justify-between items-center w-full mb-2">
                            <span className="text-sm">Thumbnail</span>
                        </label>
                        <label for="thumbnail" className="w-fit bg-gradient-to-t from-green-800 to-mt-green text-mt-white px-5 py-1.5 rounded-3xl text-xs flex mb-3 items-center">
                            <span className="mr-2">{thumbnail ? thumbnail.name : "Upload an image"}</span>
                            <svg width="16" height="16" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.71097V5.03226C1 5.28892 1.11853 5.53507 1.3295 5.71656C1.54048 5.89804 1.82663 6 2.125 6H5.875C6.17337 6 6.45952 5.89804 6.6705 5.71656C6.88147 5.53507 7 5.28892 7 5.03226V4.70968M4 4.09677V1M4 1L5.3125 2.12903M4 1L2.6875 2.12903" stroke="white" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </label>
                        <input type="file" id="thumbnail" className="hidden" onChange={(e)=>{
                            updateThumbnail(e.target.files[0]);
                        }}/>
                        <input className="w-full border-mt-green border-solid border-2 rounded-3xl text-xs py-1 px-3 outline-none" onChange={(event)=>{
                            updateThumbnailName(event.target.value);
                        }} type={"text"} value={thumbnailName} placeholder="Thumbnail source"/>
                    </div>
                </div>
                <div className="mb-10">
                    <Subtitle text="Edit your text"/>
                    <div className="w-full min-h-48 bg-gradient-to-t from-green-800 to-mt-green text-white rounded-2xl flex flex-col items-center px-5 py-4">
                        {block ? 
                        <EditBlock {...block}/> :
                        <>{blocks.map(v=><Block {...v}/>)}
                        <button onClick={(event)=>{
                            event.preventDefault();
                            setMenu(true);
                        }} className="w-8 aspect-square bg-white rounded-full relative after:absolute after:top-1/2 after:left:1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:content[''] after:w-4 after:h-0.5 after:bg-mt-black before:absolute before:top-1/2 before:left:1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content[''] before:w-0.5 before:h-4 before:bg-mt-black"></button></>}
                    </div>
                </div>
                <div className="mb-10">
                    <Subtitle text="Preview"/>
                    <figure className="px-3 m-0">
                        <img className="object-cover w-full h-20" src={thumbnail && URL.createObjectURL(thumbnail)}/>
                        <figcaption className="text-xs opacity-50 mt-2">
                            {thumbnailName}
                        </figcaption>
                    </figure>
                    <div className="px-3 mt-8">
                        <div className="mb-5">
                            <h1 className="font-champ text-xl">{title}</h1>
                            <div className="text-xs">by <i>{props.user && props.user.name}</i></div>
                        </div>
                        <div id="article-content">
                            {blocks.map(v=>createElement(v.element,v.props,v.text))}
                        </div>
                    </div>
                </div>
                <div>
                    <CheckboxField
                    label="I want this article to be leaded"
                    change={updateLead}
                    value={lead}/>
                </div>
                <div className="flex justify-center">
                    <Cta text="Publish" type="submit"/>
                </div>
            </form>
        </div>
        {menu && <Menu/>}
        </>
        
    )
}



export default CreateArticle;