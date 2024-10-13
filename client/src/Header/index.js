import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";





function Header(props) {
    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState(false);

    function Burger() {
        return (
            <>
                {menu ? <div className="w-8 flex justify-between aspect-square flex-col ml-3 bg-mt-green rounded-full relative" onClick={() => {
                    setMenu(!menu);
                }}>
                    <div className="absolute w-5 h-0.5 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded rotate-45"></div>
                    <div className="absolute w-5 h-0.5 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded -rotate-45"></div>

                </div> : <div className="w-7 flex justify-between h-5 flex-col ml-3" onClick={() => {
                    setMenu(!menu);
                }}>
                    <div className={`bg-black w-1/2 h-1 rounded bg-mt-green transition-all `} ></div>
                    <div className="bg-black w-full h-1 rounded bg-mt-green"></div>
                    <div className="bg-black w-1/2 h-1 rounded self-end bg-mt-green transition-all"></div>
                </div>}
            </>
        )
    }

    function Menu() {
        
        function MenuLink(props) {
            return (
                <Link to={props.href} onClick={() => {
                    setMenu(false); 
                }}>{props.text}</Link>
            )
        }

        function SubMenu(props) {
            const [open, setOpen] = useState(false);
            return (
                <div className="flex flex-col items-center">
                    <button onClick={
                        () => {
                            setOpen(!open);
                        }
                    } className="block relative">{props.text} <svg className={`absolute left-full top-1/2 translate-x-full -translate-y-1/3 ${open && "rotate-180"}`} width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 0.5H1.79289L2.64645 1.35355L7.64645 6.35355L8 6.70711L8.35355 6.35355L13.3536 1.35355L14.2071 0.5L13 0.5L3 0.5Z" fill="#00A15D" stroke="#00A15D" />
                        </svg>
                    </button>
                    {open && <div className="grid grid-cols-2 gap-1  justifiy-item-center text-mt-green text-lg mt-2 text-sm">
                        {props.links.map(v => <MenuLink href={v.href} text={v.text} />)}
                    </div>}
                </div>
            )
        }

        function MenuSocialNetwork(props) {
            return (
                <a href={props.href} className="block w-10 aspect-square bg-mt-green relative rounded-full mx-1.5">
                    <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                        {props.svg}
                    </div>
                </a>
            )
        }

        return (
            <div className="font-DMsans font-bold text-mt-black h-full w-full flex flex-col text-2xl">
                <div className="flex flex-col grow justify-center items-center">
                    <div className="flex flex-col mb-10 items-center">
                        <MenuLink href={"/"} text={"Discover."} />
                        <SubMenu text={"Seasons."} links={[
                            {
                                href: "/seasons/autumn",
                                text: "Autumn"
                            },
                            {
                                href: "/seasons/winter",
                                text: "Winter"
                            },
                            {
                                href: "/seasons/spring",
                                text: "Spring"
                            },
                            {
                                href: "/seasons/summer",
                                text: "Summer"
                            }
                        ]} />
                    </div>
                    <div className="flex flex-col mb-10 items-center">
                        <MenuLink href={"#"} text={"About us."} />
                        <MenuLink href={"#"} text={"Contact."} />
                    </div>
                    <div>
                        {props.user ? <MenuLink href={"/account"} text={"My account"} /> : <MenuLink href={"/login"} text={"Log in."} />}
                    </div>
                </div>
                <div class="max-w-md mx-auto p-4">
                    <form class="relative">
                        <div className="relative placeholder-DMsans">
                            <input
                                type="text"
                                className="border-b border-black placeholder-dm text-lg placeholder-opacity-100 text-red"
                                placeholder="search"
                            />
                            <span className="absolute top-1.5 right-0 -mr-2 pr-3 flex items-center color-green">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-green">
                                    <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                                </svg>
                            </span>
                        </div>






                    </form>
                </div>
                <div className="w-full flex justify-center items-center p-16">
                    <MenuSocialNetwork href={"#"} svg={<svg className="object-contain w-6 h-6" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.00787 8.86568V13H3.71688V8.86568C3.71688 8.3134 3.26916 7.86568 2.71688 7.86568H1V7.06679H2.68162C3.22873 7.06679 3.67428 6.62712 3.68154 6.08006L3.71679 3.42374L3.71682 3.40037L3.71195 2.91774L3.71195 2.91762C3.70941 2.6692 3.75699 2.42233 3.85239 2.19113C3.94781 1.95988 4.08942 1.74834 4.26993 1.5692C4.45047 1.39002 4.66634 1.24684 4.90553 1.14879C5.14472 1.05075 5.40192 1.00003 5.66213 1C5.66215 1 5.66218 1 5.6622 1H8V1.8H6.74512C5.80268 1.8 5.0075 2.55499 5.0075 3.52468V6.06679C5.0075 6.61907 5.45522 7.06679 6.0075 7.06679H7.83118L7.70606 7.86568H6.00787C5.45559 7.86568 5.00787 8.3134 5.00787 8.86568Z" stroke="white" stroke-width="2" stroke-linejoin="round" />
                    </svg>} />
                    <MenuSocialNetwork href={"#"} svg={<svg className="object-contain w-6 h-6" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.06 0H9.94C12.18 0 14 1.82 14 4.06V9.94C14 11.0168 13.5723 12.0495 12.8109 12.8109C12.0495 13.5723 11.0168 14 9.94 14H4.06C1.82 14 0 12.18 0 9.94V4.06C0 2.98322 0.427749 1.95054 1.18915 1.18915C1.95054 0.427749 2.98322 0 4.06 0ZM3.92 1.4C3.25165 1.4 2.61068 1.6655 2.13809 2.13809C1.6655 2.61068 1.4 3.25165 1.4 3.92V10.08C1.4 11.473 2.527 12.6 3.92 12.6H10.08C10.7483 12.6 11.3893 12.3345 11.8619 11.8619C12.3345 11.3893 12.6 10.7483 12.6 10.08V3.92C12.6 2.527 11.473 1.4 10.08 1.4H3.92ZM10.675 2.45C10.9071 2.45 11.1296 2.54219 11.2937 2.70628C11.4578 2.87038 11.55 3.09294 11.55 3.325C11.55 3.55706 11.4578 3.77962 11.2937 3.94372C11.1296 4.10781 10.9071 4.2 10.675 4.2C10.4429 4.2 10.2204 4.10781 10.0563 3.94372C9.89219 3.77962 9.8 3.55706 9.8 3.325C9.8 3.09294 9.89219 2.87038 10.0563 2.70628C10.2204 2.54219 10.4429 2.45 10.675 2.45ZM7 3.5C7.92826 3.5 8.8185 3.86875 9.47487 4.52513C10.1313 5.1815 10.5 6.07174 10.5 7C10.5 7.92826 10.1313 8.8185 9.47487 9.47487C8.8185 10.1313 7.92826 10.5 7 10.5C6.07174 10.5 5.1815 10.1313 4.52513 9.47487C3.86875 8.8185 3.5 7.92826 3.5 7C3.5 6.07174 3.86875 5.1815 4.52513 4.52513C5.1815 3.86875 6.07174 3.5 7 3.5ZM7 4.9C6.44305 4.9 5.9089 5.12125 5.51508 5.51508C5.12125 5.9089 4.9 6.44305 4.9 7C4.9 7.55695 5.12125 8.0911 5.51508 8.48492C5.9089 8.87875 6.44305 9.1 7 9.1C7.55695 9.1 8.0911 8.87875 8.48492 8.48492C8.87875 8.0911 9.1 7.55695 9.1 7C9.1 6.44305 8.87875 5.9089 8.48492 5.51508C8.0911 5.12125 7.55695 4.9 7 4.9Z" fill="white" />
                    </svg>} />
                    <MenuSocialNetwork href={"#"} svg={<svg className="object-contain w-6 h-6" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.08967 0.694847C1.21355 0.679995 1.33901 0.700354 1.45249 0.753725C1.56597 0.807095 1.66315 0.891447 1.73352 0.997662C2.74343 2.52162 3.95587 3.15549 5.30173 3.29948C5.36742 2.70585 5.52273 2.11928 5.8149 1.60259C6.24322 0.84449 6.93975 0.286858 7.93461 0.0807454C9.30989 -0.204423 10.3567 0.309445 10.9636 0.93837L12.1898 0.701905C12.3181 0.677104 12.4506 0.690684 12.5716 0.741044C12.6927 0.791404 12.7973 0.876441 12.873 0.98612C12.9488 1.0958 12.9925 1.22554 12.9991 1.36004C13.0057 1.49453 12.9749 1.62817 12.9103 1.74517L11.7334 3.87829C11.8408 6.95656 11.0115 9.10521 9.24352 10.5854C8.30614 11.3703 6.9637 11.8157 5.49058 11.9534C4.00582 12.0917 2.32743 11.9244 0.6593 11.4219C0.516771 11.379 0.391633 11.2894 0.30277 11.1667C0.213907 11.044 0.166142 10.8948 0.166683 10.7417C0.167223 10.5885 0.216041 10.4397 0.305768 10.3176C0.395495 10.1956 0.521262 10.107 0.664089 10.0652C1.50294 9.81884 2.142 9.60637 2.7188 9.23438C1.89842 8.78545 1.29426 8.19818 0.866618 7.52902C0.272716 6.59869 0.0523967 5.56107 0.00860663 4.6258C-0.0351834 3.69053 0.0955025 2.82373 0.233715 2.19904C0.3124 1.84258 0.404086 1.48541 0.530666 1.14378C0.575316 1.02335 0.651087 0.917838 0.749755 0.838696C0.848424 0.759554 0.965535 0.709805 1.08967 0.694847Z" fill="white" />
                    </svg>} />
                </div>
            </div>
        )
    }

    return (<header className="full p-4 z-50 border-b-2 border-b-mt-green border-b-solid relative">
        <nav className="flex justify-between items-center z-50 relative w-full">
            {!menu && <Link to={"/account"}>
                <figure className="m-0 aspect-square w-6">
                    <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 10.989C22 4.9225 17.072 0 11 0C4.928 0 0 4.9225 0 10.989C0 14.3302 1.518 17.3415 3.894 19.3627C3.916 19.3848 3.938 19.3848 3.938 19.4067C4.136 19.5608 4.334 19.7148 4.554 19.8687C4.664 19.9347 4.752 20.0214 4.862 20.1094C6.67984 21.3419 8.82573 22.0005 11.022 22C13.2183 22.0005 15.3642 21.3419 17.182 20.1094C17.292 20.0434 17.38 19.9568 17.49 19.8894C17.688 19.7367 17.908 19.5828 18.106 19.4288C18.128 19.4067 18.15 19.4067 18.15 19.3848C20.482 17.3401 22 14.3302 22 10.989ZM11 20.6154C8.932 20.6154 7.04 19.9554 5.478 18.8568C5.5 18.6807 5.544 18.5061 5.588 18.3301C5.71909 17.8531 5.91135 17.3951 6.16 16.9675C6.402 16.5495 6.688 16.1755 7.04 15.8455C7.37 15.5155 7.766 15.2089 8.162 14.9669C8.58 14.7249 9.02 14.5489 9.504 14.4169C9.99177 14.2854 10.4948 14.2193 11 14.2203C12.4996 14.2096 13.9442 14.7849 15.026 15.8235C15.532 16.3295 15.928 16.9235 16.214 17.6041C16.368 18.0001 16.478 18.4181 16.544 18.8568C14.9204 19.9982 12.9847 20.6122 11 20.6154ZM7.634 10.4404C7.44016 9.99655 7.34268 9.51665 7.348 9.03237C7.348 8.54975 7.436 8.06575 7.634 7.62575C7.832 7.18575 8.096 6.79112 8.426 6.46112C8.756 6.13112 9.152 5.8685 9.592 5.6705C10.032 5.4725 10.516 5.3845 11 5.3845C11.506 5.3845 11.968 5.4725 12.408 5.6705C12.848 5.8685 13.244 6.1325 13.574 6.46112C13.904 6.79112 14.168 7.18713 14.366 7.62575C14.564 8.06575 14.652 8.54975 14.652 9.03237C14.652 9.53837 14.564 10.0004 14.366 10.439C14.1749 10.8725 13.9065 11.2676 13.574 11.605C13.2365 11.937 12.8414 12.205 12.408 12.3956C11.4989 12.7692 10.4791 12.7692 9.57 12.3956C9.13662 12.205 8.74152 11.937 8.404 11.605C8.071 11.2725 7.80903 10.8772 7.634 10.4404ZM17.842 17.7361C17.842 17.6921 17.82 17.6701 17.82 17.6261C17.6036 16.9378 17.2847 16.2861 16.874 15.6929C16.4629 15.0953 15.9577 14.5682 15.378 14.1322C14.9353 13.7992 14.4554 13.5187 13.948 13.2963C14.1788 13.144 14.3927 12.9674 14.586 12.7696C14.914 12.4458 15.202 12.0839 15.444 11.6916C15.9312 10.8911 16.1829 9.96942 16.17 9.03237C16.1768 8.33871 16.0421 7.65094 15.774 7.01113C15.5093 6.39463 15.1284 5.83489 14.652 5.3625C14.1763 4.89504 13.6165 4.52181 13.002 4.2625C12.3611 3.99492 11.6725 3.86065 10.978 3.86787C10.2834 3.86108 9.59478 3.99582 8.954 4.26388C8.33422 4.52263 7.77303 4.90378 7.304 5.3845C6.83656 5.85968 6.46332 6.41908 6.204 7.03312C5.93594 7.67294 5.8012 8.36071 5.808 9.05437C5.808 9.53837 5.874 10.0004 6.006 10.439C6.138 10.901 6.314 11.319 6.556 11.7136C6.776 12.1096 7.084 12.4616 7.414 12.7916C7.612 12.9896 7.832 13.1642 8.074 13.3182C7.56502 13.5466 7.08499 13.8346 6.644 14.1763C6.072 14.6163 5.566 15.1429 5.148 15.7149C4.73311 16.3056 4.41386 16.958 4.202 17.6481C4.18 17.6921 4.18 17.7361 4.18 17.7581C2.442 15.9995 1.364 13.6263 1.364 10.989C1.364 5.6925 5.698 1.36263 11 1.36263C16.302 1.36263 20.636 5.6925 20.636 10.989C20.6331 13.5189 19.6286 15.9448 17.842 17.7361Z" fill="#00A15D" />
                    </svg>
                </figure>
            </Link>}
            <Link to={"/"} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <figure className="mg-0 w-32">
                    <img src="/images/Logo-spring.png"/>
                </figure>
            </Link>
            <div className="flex items-center">
                {!menu && <div className="aspect-square w-5">
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.1867 15.0815L14.1867 15.0814C14.2162 15.0692 14.243 15.0513 14.2656 15.0287C14.2656 15.0287 14.2656 15.0287 14.2657 15.0286L15.0286 14.2675L15.0286 14.2674C15.0513 14.2448 15.0692 14.218 15.0814 14.1884C15.0937 14.1589 15.1 14.1272 15.1 14.0952C15.1 14.0632 15.0937 14.0315 15.0815 14.002L15.0814 14.002C15.0692 13.9724 15.0513 13.9456 15.0287 13.923C15.0286 13.923 15.0286 13.923 15.0286 13.923L10.5457 9.43999C11.2304 8.52385 11.6 7.41457 11.6 6.24998C11.6 4.81984 11.0416 3.47848 10.0325 2.46759C9.02319 1.45652 7.67822 0.9 6.24998 0.9C4.82169 0.9 3.4768 1.45829 2.46759 2.46747C1.45653 3.47675 0.9 4.81997 0.9 6.24998C0.9 7.67829 1.45832 9.02321 2.46753 10.0324C3.47681 11.0434 4.82 11.6 6.24998 11.6C7.41461 11.6 8.52219 11.2304 9.43818 10.5473L13.9212 15.0286C13.9212 15.0286 13.9212 15.0286 13.9212 15.0286C13.9438 15.0513 13.9707 15.0692 14.0002 15.0814C14.0298 15.0937 14.0615 15.1 14.0934 15.1C14.1254 15.1 14.1571 15.0937 14.1867 15.0815ZM8.95134 8.95117C8.22802 9.67278 7.2699 10.07 6.24998 10.07C5.23009 10.07 4.272 9.67281 3.5487 8.95125C2.82714 8.22795 2.42999 7.26986 2.42999 6.24998C2.42999 5.23002 2.82719 4.27025 3.54862 3.54878C4.27193 2.82718 5.23005 2.42999 6.24998 2.42999C7.27007 2.42999 8.2298 2.82554 8.95117 3.54862C9.67278 4.27193 10.07 5.23005 10.07 6.24998C10.07 7.26993 9.67277 8.2297 8.95134 8.95117Z" fill="#00A15D" stroke="#00A15D" stroke-width="0.2" />
                    </svg>
                </div>}
                <Burger />
            </div>
        </nav>
        <Transition
            as={Fragment}
            show={menu}
            enter="transition-all duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all duration-500"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full">
            <div className="fixed w-screen h-screen top-0 left-0 bg-mt-white z-40">
                <Menu />
            </div>
        </Transition>
    </header>)
}
export default Header;