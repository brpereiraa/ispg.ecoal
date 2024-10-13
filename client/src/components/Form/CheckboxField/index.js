function CheckboxField(props){
    return (
        <div onClick={()=>{
            props.change(!props.value);
        }} className="flex items-center">
            <div className={`w-3 aspect-square rounded ${props.value ? "bg-mt-green" : "border border-solid border-black"}`}>

            </div>
            <label className="text-xs ml-2">{props.label}</label>
        </div>
    )
}

export default CheckboxField;