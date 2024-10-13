import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import Cta from "../components/Buttons/Cta";
import {Swiper, SwiperSlide, useSwiper} from "swiper/react";
import 'swiper/css';
import AccountArticle from "../components/AccountArticle";

function Account(props){
    const navigate = useNavigate();
    useEffect(()=>{
        if(props.user == null || props.authorization == null){
            navigate("/login");
        } else {
            if(props.user.admin==1){
                setSection(1)
            } else {
                setSection(2);
            }
        }
    },[])
    const [errors,updateErrors] = useState([]);
    const [section,setSection] = useState(0);
    async function logout(){
        try{
            const response = await axios.get(props.server+"logout",{
                headers: {
                    Authorization : props.authorization
                }
            });
            props.changeUser(null);
            navigate("/login");
            
        } catch(err){
            updateErrors(err.response.data);
        }
    }

    function AccountSectionButton(props){
        return <button className={`bold mx-5 text-bm relative ${props.section == section && "text-mt-green before:content[''] before:w-full before:bg-mt-green before:h-0.5 before:-bottom-0.5 before:left-0 before:absolute"}`}>{props.text}</button>
    }

    async function deleteArticle(id){
        try{
            const response = await axios.delete(`${props.server}articles/${id}`,{
                headers: {
                    authorization : props.authorization
                }
            });
            props.updateUser();
        } catch(err){
            console.log(err.response.data);
        }
    }

    function Subtitle(props){
        return <h2 className="mb-5 sm relative before:absolute before:w-2 before:aspect-square before:-left-2 before:top-1/2 before:bg-mt-green before:rounded-full before:-translate-x-full before:-translate-y-1/2">{props.text}</h2>
    }

    function InputField(props){
        return (
            <div className="flex flex-col w-full mb-5">
                <label for={props.name} className="text-sm mb-2 flex justify-between items-center w-full"><span>{props.label}</span>{props.optionnal && <span className="font-dm text-xxs">(Optionnal)</span>}</label>
                {props.icon ? 
                <div className="relative">
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2.5 -translate-x-full -left-0">{props.icon}</div>
                    <input type={props.type} name={props.name} id={props.id} required={!props.optionnal} value={props.value} onChange={(event)=>{
                    props.change(event.target.value)
                }} className="border-solid outline-none border-mt-green border-2 w-full rounded-3xl text-xs py-1 px-2" placeholder={props.placeholder}/>
                </div>:
                <input type={props.type} name={props.name} id={props.id} required={!props.optionnal} value={props.value} onChange={(event)=>{
                    props.change(event.target.value)
                }} className="border-solid outline-none border-mt-green border-2 w-full rounded-3xl text-xs py-1 px-2" placeholder={props.placeholder}/>
                }
            </div>
        )
    }

    function EditAccount(props){
        const [name,updateName] = useState(props.user.name);
        const [email,updateEmail] = useState(props.user.email);
        const [facebook, updateFacebook] = useState(props.user.facebook);
        const [twitter, updateTwitter] = useState(props.user.twitter);
        const [instagram, updateInstagram] = useState(props.user.instagram);
        const [errors,updateErrors] = useState([]);

        async function handleSubmit(event){
            event.preventDefault();
            console.log(name)
            const data = new FormData();
            data.append("name",name);
            data.append("email",email);
           
            if(props.user.admin==1){
                if(facebook!=null){
                    data.append("facebook",facebook);
                }
                if(instagram!=null){
                    data.append("instagram",instagram);
                }
                if(twitter!=null){
                    data.append("twitter",twitter)
                }
                
            }
            try{
                const response = axios.post(`${props.server}user`,data,{
                    headers: {
                        Authorization : props.authorization
                    }
                })
                props.updateUser();
                
            } catch(err){
                console.log(err.response.data);
                updateErrors(err.response.data);
            }
        }

        return (
                <form className="px-10 flex flex-col items-center" onSubmit={handleSubmit}>
                        <Cta text="Edit" type="Submit"/>
                        <div className="w-full mt-6 flex flex-col">
                            <Subtitle text="Personal informations"/>
                            <InputField
                            label="Full name"
                            value={name}
                            change={updateName}
                            type="text"/>
                            <InputField
                            label="Email"
                            value={email}
                            change={updateEmail}
                            type="email"
                            />
                        </div>
                        {props.user.admin==1 && 
                        <div className="w-full mt-6 flex flex-col">
                            <Subtitle text="Social medias"/>
                            <InputField
                            label="Facebook"
                            type="url"
                            placeholder="https://facebook.com/"
                            value={facebook}
                            change={updateFacebook}
                            icon={<svg width="16" height="16" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.00525 6.96589V10H2.81125V6.96589C2.81125 6.41361 2.36353 5.96589 1.81125 5.96589H1V5.76676H1.78775C2.33564 5.76676 2.78152 5.32588 2.78769 4.77802L2.81119 2.69092L2.81121 2.67109L2.80796 2.29188L2.80796 2.29178C2.80633 2.10405 2.83701 1.92032 2.89582 1.75234C2.95463 1.58437 3.03869 1.44017 3.13709 1.32508C3.23526 1.21025 3.34405 1.12844 3.4525 1.07605C3.56026 1.02399 3.66927 1.00002 3.77475 1C3.77478 1 3.77481 1 3.77484 1H5V1.2H4.49675C3.54069 1.2 3.005 2.04473 3.005 2.76939V4.76676C3.005 5.31905 3.45272 5.76676 4.005 5.76676H4.85832L4.83185 5.96589H4.00525C3.45297 5.96589 3.00525 6.41361 3.00525 6.96589Z" stroke="#1B1B1B" stroke-width="2" stroke-linejoin="round"/>
                            </svg>
                            }
                            optionnal={true}/>
                            <InputField
                            label="Instagram"
                            type="url"
                            placeholder="https://instagram.com/"
                            value={instagram}
                            change={updateInstagram}
                            icon={<svg width="16" height="16" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.9 0H7.1C8.7 0 10 1.3 10 2.9V7.1C10 7.86913 9.69447 8.60675 9.15061 9.15061C8.60675 9.69447 7.86913 10 7.1 10H2.9C1.3 10 0 8.7 0 7.1V2.9C0 2.13087 0.305535 1.39325 0.84939 0.84939C1.39325 0.305535 2.13087 0 2.9 0ZM2.8 1C2.32261 1 1.86477 1.18964 1.52721 1.52721C1.18964 1.86477 1 2.32261 1 2.8V7.2C1 8.195 1.805 9 2.8 9H7.2C7.67739 9 8.13523 8.81036 8.47279 8.47279C8.81036 8.13523 9 7.67739 9 7.2V2.8C9 1.805 8.195 1 7.2 1H2.8ZM7.625 1.75C7.79076 1.75 7.94973 1.81585 8.06694 1.93306C8.18415 2.05027 8.25 2.20924 8.25 2.375C8.25 2.54076 8.18415 2.69973 8.06694 2.81694C7.94973 2.93415 7.79076 3 7.625 3C7.45924 3 7.30027 2.93415 7.18306 2.81694C7.06585 2.69973 7 2.54076 7 2.375C7 2.20924 7.06585 2.05027 7.18306 1.93306C7.30027 1.81585 7.45924 1.75 7.625 1.75ZM5 2.5C5.66304 2.5 6.29893 2.76339 6.76777 3.23223C7.23661 3.70107 7.5 4.33696 7.5 5C7.5 5.66304 7.23661 6.29893 6.76777 6.76777C6.29893 7.23661 5.66304 7.5 5 7.5C4.33696 7.5 3.70107 7.23661 3.23223 6.76777C2.76339 6.29893 2.5 5.66304 2.5 5C2.5 4.33696 2.76339 3.70107 3.23223 3.23223C3.70107 2.76339 4.33696 2.5 5 2.5ZM5 3.5C4.60218 3.5 4.22064 3.65804 3.93934 3.93934C3.65804 4.22064 3.5 4.60218 3.5 5C3.5 5.39782 3.65804 5.77936 3.93934 6.06066C4.22064 6.34196 4.60218 6.5 5 6.5C5.39782 6.5 5.77936 6.34196 6.06066 6.06066C6.34196 5.77936 6.5 5.39782 6.5 5C6.5 4.60218 6.34196 4.22064 6.06066 3.93934C5.77936 3.65804 5.39782 3.5 5 3.5Z" fill="#1B1B1B"/>
                            </svg>
                            }
                            optionnal={true}/>
                            <InputField
                            label="Twitter"
                            type="url"
                            placeholder="https://twitter.com/"
                            value={twitter}
                            change={updateTwitter}
                            icon={<svg width="16" height="16" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.838211 0.521135C0.933503 0.509996 1.03001 0.525265 1.1173 0.565293C1.20459 0.605321 1.27934 0.668585 1.33348 0.748247C2.11033 1.89122 3.04298 2.36662 4.07825 2.47461C4.12878 2.02939 4.24826 1.58946 4.473 1.20194C4.80247 0.633367 5.33827 0.215143 6.10354 0.0605591C7.16145 -0.153318 7.96673 0.232084 8.43358 0.703777L9.37675 0.526429C9.47544 0.507828 9.57737 0.518013 9.6705 0.555783C9.76363 0.593553 9.84407 0.657331 9.90234 0.73959C9.9606 0.821849 9.99426 0.919156 9.99933 1.02003C10.0044 1.1209 9.98068 1.22113 9.93096 1.30888L9.02569 2.90872C9.10832 5.21742 8.47042 6.82891 7.1104 7.93905C6.38934 8.52775 5.35669 8.86179 4.22352 8.96503C3.0814 9.06879 1.79033 8.94332 0.507154 8.56639C0.397516 8.53422 0.301256 8.46706 0.2329 8.37503C0.164544 8.28301 0.127802 8.17112 0.128217 8.05624C0.128633 7.94137 0.166185 7.82975 0.235206 7.73823C0.304227 7.64671 0.400971 7.58025 0.510838 7.54889C1.15611 7.36413 1.6477 7.20478 2.09139 6.92579C1.46032 6.58909 0.995581 6.14863 0.666629 5.64676C0.209781 4.94902 0.0403051 4.1708 0.00662049 3.46935C-0.0270642 2.7679 0.0734635 2.1178 0.179781 1.64928C0.240308 1.38194 0.310835 1.11406 0.408205 0.857832C0.442551 0.767511 0.500836 0.688378 0.576735 0.629022C0.652633 0.569666 0.742719 0.532354 0.838211 0.521135Z" fill="#1B1B1B"/>
                            </svg>
                            }
                            optionnal={true}/>
                            
                        </div>}
                </form>
        )
    }

    function EditPassword(props){
        const [oldPassword, updateOldPassword] = useState();
        const [newPassword, updateNewPassword] = useState();
        const [newPasswordConfirmation, updateNewPasswordConfirmation] = useState();
        const [errors,updateErrors] = useState([]);
        async function handleSubmit(event){
            event.preventDefault();
            const data = new FormData;
            data.append("old_password",oldPassword);
            data.append("new_password",newPassword);
            data.append("new_password_confirmation",newPasswordConfirmation);
            try{
                const response = await axios.post(`${props.server}user/password`,data,{
                    headers: {
                        Authorization : props.authorization
                    }
                })
            } catch (err){
                console.log(err.response.data);
                updateErrors(err.response.data);
            }
        }
        return (
            <form className="px-10 flex flex-col items-center" onSubmit={handleSubmit}>
                <p className="text-xs italic text-justify">A secure password helps protect your account. A strong password should be at least 10 characters long, use a combination of letters, numbers and symbols.</p>
                <div className="flex flex-col items-center w-full mt-10">
                    <InputField
                    type="password"
                    label="Your password"
                    value={oldPassword}
                    change={updateOldPassword}/>
                    <InputField
                    type="password"
                    label="New password"
                    value={newPassword}
                    change={updateNewPassword}/>
                    <InputField
                    type="password"
                    label="Confirm a new password"
                    value={newPasswordConfirmation}
                    change={updateNewPasswordConfirmation}/>
                </div>
                <Cta text="Update" type="submit"/>
            </form>
        )
    }

    return (
        <>
        {props.user && 
        <div className="w-full h-full mt-5">
            <div className="flex flex-col items-center">
                <figure className="m-0 aspect-square w-20">
                    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 10.989C22 4.9225 17.072 0 11 0C4.928 0 0 4.9225 0 10.989C0 14.3302 1.518 17.3415 3.894 19.3627C3.916 19.3848 3.938 19.3848 3.938 19.4067C4.136 19.5608 4.334 19.7148 4.554 19.8687C4.664 19.9347 4.752 20.0214 4.862 20.1094C6.67984 21.3419 8.82573 22.0005 11.022 22C13.2183 22.0005 15.3642 21.3419 17.182 20.1094C17.292 20.0434 17.38 19.9568 17.49 19.8894C17.688 19.7367 17.908 19.5828 18.106 19.4288C18.128 19.4067 18.15 19.4067 18.15 19.3848C20.482 17.3401 22 14.3302 22 10.989ZM11 20.6154C8.932 20.6154 7.04 19.9554 5.478 18.8568C5.5 18.6807 5.544 18.5061 5.588 18.3301C5.71909 17.8531 5.91135 17.3951 6.16 16.9675C6.402 16.5495 6.688 16.1755 7.04 15.8455C7.37 15.5155 7.766 15.2089 8.162 14.9669C8.58 14.7249 9.02 14.5489 9.504 14.4169C9.99177 14.2854 10.4948 14.2193 11 14.2203C12.4996 14.2096 13.9442 14.7849 15.026 15.8235C15.532 16.3295 15.928 16.9235 16.214 17.6041C16.368 18.0001 16.478 18.4181 16.544 18.8568C14.9204 19.9982 12.9847 20.6122 11 20.6154ZM7.634 10.4404C7.44016 9.99655 7.34268 9.51665 7.348 9.03237C7.348 8.54975 7.436 8.06575 7.634 7.62575C7.832 7.18575 8.096 6.79112 8.426 6.46112C8.756 6.13112 9.152 5.8685 9.592 5.6705C10.032 5.4725 10.516 5.3845 11 5.3845C11.506 5.3845 11.968 5.4725 12.408 5.6705C12.848 5.8685 13.244 6.1325 13.574 6.46112C13.904 6.79112 14.168 7.18713 14.366 7.62575C14.564 8.06575 14.652 8.54975 14.652 9.03237C14.652 9.53837 14.564 10.0004 14.366 10.439C14.1749 10.8725 13.9065 11.2676 13.574 11.605C13.2365 11.937 12.8414 12.205 12.408 12.3956C11.4989 12.7692 10.4791 12.7692 9.57 12.3956C9.13662 12.205 8.74152 11.937 8.404 11.605C8.071 11.2725 7.80903 10.8772 7.634 10.4404ZM17.842 17.7361C17.842 17.6921 17.82 17.6701 17.82 17.6261C17.6036 16.9378 17.2847 16.2861 16.874 15.6929C16.4629 15.0953 15.9577 14.5682 15.378 14.1322C14.9353 13.7992 14.4554 13.5187 13.948 13.2963C14.1788 13.144 14.3927 12.9674 14.586 12.7696C14.914 12.4458 15.202 12.0839 15.444 11.6916C15.9312 10.8911 16.1829 9.96942 16.17 9.03237C16.1768 8.33871 16.0421 7.65094 15.774 7.01113C15.5093 6.39463 15.1284 5.83489 14.652 5.3625C14.1763 4.89504 13.6165 4.52181 13.002 4.2625C12.3611 3.99492 11.6725 3.86065 10.978 3.86787C10.2834 3.86108 9.59478 3.99582 8.954 4.26388C8.33422 4.52263 7.77303 4.90378 7.304 5.3845C6.83656 5.85968 6.46332 6.41908 6.204 7.03312C5.93594 7.67294 5.8012 8.36071 5.808 9.05437C5.808 9.53837 5.874 10.0004 6.006 10.439C6.138 10.901 6.314 11.319 6.556 11.7136C6.776 12.1096 7.084 12.4616 7.414 12.7916C7.612 12.9896 7.832 13.1642 8.074 13.3182C7.56502 13.5466 7.08499 13.8346 6.644 14.1763C6.072 14.6163 5.566 15.1429 5.148 15.7149C4.73311 16.3056 4.41386 16.958 4.202 17.6481C4.18 17.6921 4.18 17.7361 4.18 17.7581C2.442 15.9995 1.364 13.6263 1.364 10.989C1.364 5.6925 5.698 1.36263 11 1.36263C16.302 1.36263 20.636 5.6925 20.636 10.989C20.6331 13.5189 19.6286 15.9448 17.842 17.7361Z" fill="#00A15D"/>
                    </svg>
                </figure>
                <div className="flex items-center">
                    <h2 className="text-base mt-2 mr-2">Hello, {props.user.name}</h2>
                    <figure className="m-0 w-6 aspect-square">
                        <img src="/images/hand_icon.png"/>
                    </figure>
                </div>
                <Cta text="Log out" action={logout} icon={<svg width="10" height="10" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.3715 4.53489H4.89109C4.85828 4.53489 4.82753 4.54954 4.80703 4.57535C4.75919 4.63465 4.70794 4.69186 4.65395 4.74628C4.43315 4.97193 4.17161 5.15176 3.88379 5.27582C3.5856 5.4044 3.2651 5.47036 2.94141 5.46977C2.61407 5.46977 2.29698 5.40419 1.99903 5.27582C1.71121 5.15176 1.44967 4.97193 1.22887 4.74628C1.00767 4.52139 0.831288 4.25485 0.709498 3.9614C0.583073 3.65721 0.519519 3.33419 0.519519 3.00001C0.519519 2.66582 0.583757 2.3428 0.709498 2.03861C0.831139 1.74489 1.00608 1.48047 1.22887 1.25373C1.45165 1.02699 1.71065 0.848381 1.99903 0.724195C2.29698 0.595823 2.61407 0.530242 2.94141 0.530242C3.26875 0.530242 3.58583 0.595126 3.88379 0.724195C4.17217 0.848381 4.43117 1.02699 4.65395 1.25373C4.70794 1.30885 4.75851 1.36605 4.80703 1.42466C4.82753 1.45047 4.85897 1.46512 4.89109 1.46512H5.3715C5.41455 1.46512 5.44121 1.41629 5.41729 1.37931C4.89314 0.547684 3.97604 -0.00278013 2.93389 1.05618e-05C1.29652 0.0041966 -0.016249 1.36117 0.00015202 3.0307C0.0165531 4.67372 1.32727 6 2.94141 6C3.98083 6 4.89382 5.45023 5.41729 4.6207C5.44052 4.58372 5.41455 4.53489 5.3715 4.53489ZM5.97902 2.95605L5.00931 2.17466C4.97309 2.14536 4.92047 2.17187 4.92047 2.21861V2.74884H2.77467C2.7446 2.74884 2.72 2.77396 2.72 2.80466V3.19535C2.72 3.22605 2.7446 3.25117 2.77467 3.25117H4.92047V3.7814C4.92047 3.82814 4.97378 3.85465 5.00931 3.82535L5.97902 3.04396C5.98556 3.03874 5.99084 3.03207 5.99448 3.02445C5.99811 3.01684 6 3.00848 6 3.00001C6 2.99153 5.99811 2.98317 5.99448 2.97556C5.99084 2.96794 5.98556 2.96127 5.97902 2.95605Z" fill="white"/>
                </svg>
                }/>
            </div>
            <nav className="flex items-center justify-center mt-8">
                {props.user.admin==1 && <AccountSectionButton text="Articles" section={1}/>}
                <AccountSectionButton text="Informations" section={2}/>
                <AccountSectionButton text="Security" section={3}/>
            </nav> 
            <Swiper
            className="mt-5"
            onSlideChange={(swiper)=>{
                console.log(section, swiper.realIndex+1)
                if(props.user.admin==1){
                    setSection(swiper.realIndex+1);
                } else {
                    setSection(swiper.realIndex+2);
                }   
            }}>
                {props.user.admin==1 && 
                <SwiperSlide className="mt-10">
                    {props.user.articles.length>0 ? 
                    <div className="px-5 flex flex-col items-center">
                        {props.user.articles.map(v=>
                        <div className={`flex justify-between w-full items-center mb-5 pb-5 ${props.user.articles.indexOf(v) != props.user.articles.length-1 && "border-b-solid border-b-mt-green border-b"}`}>
                            <AccountArticle {...v} server={props.server}/>
                            <button  onClick = {()=>{
                                deleteArticle(v.id);
                            }} className="w-10 h-10 aspect-square rounded-full bg-gradient-to-t from-green-800 to-mt-green relative before:absolute before:left-1/2 before:top-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:bg-white before:w-4 before:h-0.5 before:rotate-45 after:absolute after:left-1/2 after:top-1/2 after:-translate-y-1/2 after:-translate-x-1/2 after:bg-white after:w-4 after:h-0.5 after:-rotate-45"></button>
                        </div>)}
                        <Link to={"/articles/create"}>
                            <Cta text="Write an article"/>
                        </Link>
                    </div> :
                    <div className="px-10 flex flex-col items-center">
                        <figure>
                            <img src="/images/Spring-illustration.jpg"/>
                        </figure>
                        <p className="text-xs text-center mt-5 mb-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, culpa? Similique quidem, explicabo nostrum ea optio culpa non maiores eius laudantium perspiciatis, veritatis nihil modi officiis sint? Non, dolorum. Fugiat!</p>
                        <Link to={"/articles/create"}>
                            <Cta text="Write an article"/>
                        </Link>
                    </div>}
                </SwiperSlide>}
                <SwiperSlide>
                    <EditAccount {...props}/>
                </SwiperSlide>
                <SwiperSlide className="mt-5">
                    <EditPassword {...props}/>
                </SwiperSlide>
            </Swiper>  
        </div>
        
        }
        </>
    )
}

export default Account;