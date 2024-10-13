function Footer(){

    function FooterTitle(props){
        return(
            <div className="text-mt-blue font-champ text-base bg-white p-1 w-fit mb-6 min-w-28 text-center">
                {props.text}
            </div>
        )
    }

    function FooterLink(props){
        return(
            <a href={props.href} className={`text-white block px-2 mb-2 text-center text-xs focus:bg-mt-blue`}>{props.text}</a>
        )
    }

    function Newsletter(){
        return(
            <form className="flex align-center text-xs mt-4 translate-x-5">
                <input type="email" placeholder="email@movtrip.fr" name="email" className="bg-mt-blue text-white placeholder-opacity-100 placeholder-white placeholder:underline py-2 px-3 rounded-3xl outline-none w-50"/>
                <input type="submit" value={"Subscribe"} className="bg-white rounded-3xl text-mt-blue py-2 px-5 -translate-x-10"/>
            </form>
        )
    }

    function MenuSocialNetwork(props){
        return (
            <a href={props.href} className="block w-10 aspect-square bg-mt-white relative rounded-full mx-1.5">
                <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2">
                    {props.svg}
                </div>
            </a>
        )
    }
    return (
        <footer className="w-full bg-mt-green py-5 px-5 mt-10">
            <div className="flex flex-col items-center w-full">
                <div className="flex flex-col mb-10 w-full items-center">
                    <FooterTitle text={"Newsletter"}/>
                    <figure className="m-0 w-32">
                        <img src="/images/White-spring.png"/>
                    </figure>
                    <Newsletter/>
                </div>
                <div className="flex flex-col mb-10 w-full items-center">
                    <FooterTitle text={"Travel"}/>
                    <div className="flex w-full justify-center">
                        <div className="flex flex-col mr-4">
                            <FooterLink href="#" text="Discover"/>
                            <FooterLink href="#" text="Autumn"/>
                            <FooterLink href="#" text="Winter"/>
                        </div>
                        <div className="flex flex-col ml-4">
                            <FooterLink href="#" text="Spring"/>
                            <FooterLink href="#" text="Summer"/>
                            <FooterLink href="#" text="Article of the day"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mb-10 w-full items-center">
                    <FooterTitle text={"Mov'Trip"}/>
                    <div className="flex w-full justify-center">
                        <div className="flex flex-col">
                            <FooterLink href="#" text="About us"/>
                            <FooterLink href="#" text="Contact us"/>
                            <FooterLink href="#" text="Terms of use"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                    <MenuSocialNetwork href={"#"} svg={<svg className="object-contain w-6 h-6 fill-mt-blue" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.00787 8.86568V13H3.71688V8.86568C3.71688 8.3134 3.26916 7.86568 2.71688 7.86568H1V7.06679H2.68162C3.22873 7.06679 3.67428 6.62712 3.68154 6.08006L3.71679 3.42374L3.71682 3.40037L3.71195 2.91774L3.71195 2.91762C3.70941 2.6692 3.75699 2.42233 3.85239 2.19113C3.94781 1.95988 4.08942 1.74834 4.26993 1.5692C4.45047 1.39002 4.66634 1.24684 4.90553 1.14879C5.14472 1.05075 5.40192 1.00003 5.66213 1C5.66215 1 5.66218 1 5.6622 1H8V1.8H6.74512C5.80268 1.8 5.0075 2.55499 5.0075 3.52468V6.06679C5.0075 6.61907 5.45522 7.06679 6.0075 7.06679H7.83118L7.70606 7.86568H6.00787C5.45559 7.86568 5.00787 8.3134 5.00787 8.86568Z" stroke="#1B1B1B" stroke-width="2" stroke-linejoin="round"/>
                    </svg>}/>
                    <MenuSocialNetwork href={"#"} svg={<svg className="object-contain w-6 h-6 fill-mt-blue" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.06 0H9.94C12.18 0 14 1.82 14 4.06V9.94C14 11.0168 13.5723 12.0495 12.8109 12.8109C12.0495 13.5723 11.0168 14 9.94 14H4.06C1.82 14 0 12.18 0 9.94V4.06C0 2.98322 0.427749 1.95054 1.18915 1.18915C1.95054 0.427749 2.98322 0 4.06 0ZM3.92 1.4C3.25165 1.4 2.61068 1.6655 2.13809 2.13809C1.6655 2.61068 1.4 3.25165 1.4 3.92V10.08C1.4 11.473 2.527 12.6 3.92 12.6H10.08C10.7483 12.6 11.3893 12.3345 11.8619 11.8619C12.3345 11.3893 12.6 10.7483 12.6 10.08V3.92C12.6 2.527 11.473 1.4 10.08 1.4H3.92ZM10.675 2.45C10.9071 2.45 11.1296 2.54219 11.2937 2.70628C11.4578 2.87038 11.55 3.09294 11.55 3.325C11.55 3.55706 11.4578 3.77962 11.2937 3.94372C11.1296 4.10781 10.9071 4.2 10.675 4.2C10.4429 4.2 10.2204 4.10781 10.0563 3.94372C9.89219 3.77962 9.8 3.55706 9.8 3.325C9.8 3.09294 9.89219 2.87038 10.0563 2.70628C10.2204 2.54219 10.4429 2.45 10.675 2.45ZM7 3.5C7.92826 3.5 8.8185 3.86875 9.47487 4.52513C10.1313 5.1815 10.5 6.07174 10.5 7C10.5 7.92826 10.1313 8.8185 9.47487 9.47487C8.8185 10.1313 7.92826 10.5 7 10.5C6.07174 10.5 5.1815 10.1313 4.52513 9.47487C3.86875 8.8185 3.5 7.92826 3.5 7C3.5 6.07174 3.86875 5.1815 4.52513 4.52513C5.1815 3.86875 6.07174 3.5 7 3.5ZM7 4.9C6.44305 4.9 5.9089 5.12125 5.51508 5.51508C5.12125 5.9089 4.9 6.44305 4.9 7C4.9 7.55695 5.12125 8.0911 5.51508 8.48492C5.9089 8.87875 6.44305 9.1 7 9.1C7.55695 9.1 8.0911 8.87875 8.48492 8.48492C8.87875 8.0911 9.1 7.55695 9.1 7C9.1 6.44305 8.87875 5.9089 8.48492 5.51508C8.0911 5.12125 7.55695 4.9 7 4.9Z" fill="#1B1B1B"/>
                    </svg>}/>
                    <MenuSocialNetwork href={"#"} svg={<svg className="object-contain w-6 h-6 fill-mt-blue" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.08967 0.694847C1.21355 0.679995 1.33901 0.700354 1.45249 0.753725C1.56597 0.807095 1.66315 0.891447 1.73352 0.997662C2.74343 2.52162 3.95587 3.15549 5.30173 3.29948C5.36742 2.70585 5.52273 2.11928 5.8149 1.60259C6.24322 0.84449 6.93975 0.286858 7.93461 0.0807454C9.30989 -0.204423 10.3567 0.309445 10.9636 0.93837L12.1898 0.701905C12.3181 0.677104 12.4506 0.690684 12.5716 0.741044C12.6927 0.791404 12.7973 0.876441 12.873 0.98612C12.9488 1.0958 12.9925 1.22554 12.9991 1.36004C13.0057 1.49453 12.9749 1.62817 12.9103 1.74517L11.7334 3.87829C11.8408 6.95656 11.0115 9.10521 9.24352 10.5854C8.30614 11.3703 6.9637 11.8157 5.49058 11.9534C4.00582 12.0917 2.32743 11.9244 0.6593 11.4219C0.516771 11.379 0.391633 11.2894 0.30277 11.1667C0.213907 11.044 0.166142 10.8948 0.166683 10.7417C0.167223 10.5885 0.216041 10.4397 0.305768 10.3176C0.395495 10.1956 0.521262 10.107 0.664089 10.0652C1.50294 9.81884 2.142 9.60637 2.7188 9.23438C1.89842 8.78545 1.29426 8.19818 0.866618 7.52902C0.272716 6.59869 0.0523967 5.56107 0.00860663 4.6258C-0.0351834 3.69053 0.0955025 2.82373 0.233715 2.19904C0.3124 1.84258 0.404086 1.48541 0.530666 1.14378C0.575316 1.02335 0.651087 0.917838 0.749755 0.838696C0.848424 0.759554 0.965535 0.709805 1.08967 0.694847Z" fill="#1B1B1B"/>
                    </svg>}/>
            </div>
            <p className="text-xs text-white text-center mt-5">Copyright © Mov’trip 2024. Mov’trip is not responsible for the content of external sites. </p>
        </footer>
    )
}
export default Footer;