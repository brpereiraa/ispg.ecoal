import { Link } from "react-router-dom";
function FormBottomLink(props){
    return (
        <Link to={props.to} className="inline-block relative before:content[''] before:absolute before:w-full before:h-0.5 before:-bottom-0.5 before:left-0 before:bg-mt-green">{props.text}</Link>
    )
}

export default FormBottomLink;