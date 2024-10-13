function InputField(props){
    return (
        <div className="flex flex-col w-full max-w-60 mb-5">
            <label for={props.name} className="font-champ text-sm mb-2 flex justify-between items-center w-full"><span>{props.label}</span>{props.optionnal && <span className="font-dm text-xxs">(Optionnal)</span>}</label>
            <input type={props.type} name={props.name} id={props.id} required={!props.optionnal} onChange={(event)=>{
                props.change(event.target.value)
            }} className="border-solid outline-none border-mt-green border-2 w-full rounded-3xl text-xs py-1 px-2"/>
        </div>
    )
}

export default InputField;