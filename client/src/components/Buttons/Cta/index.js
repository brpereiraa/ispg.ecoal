function Cta(props){
    return (
        <button type={props.type} onClick={props.action} className={`bg-gradient-to-t from-green-800 to-mt-green text-mt-white ${props.px ? "px-"+props.px.toString() : "px-5"} py-1.5 rounded-3xl text-sm mt-5 flex items-center`}><span className={`${props.icon && "mr-2"}`}>{props.text}</span>{props.icon}</button>
    )
}
export default Cta;