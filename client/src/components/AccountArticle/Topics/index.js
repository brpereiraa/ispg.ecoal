import BigTopic from "./BigTopic";
import SmallTopic from "./SmallTopic";

function Topics(props){
    console.log(props.color);
    return (
        <div>
            {props.topics.length>0 && <BigTopic {...props.topics[0]} color={props.color}/>}
            {props.topics.length>1 && <SmallTopic {...props.topics[1]} color={props.color}/>}
            {props.topics.length>2 && <SmallTopic {...props.topics[2]} color={props.color} last={true}/>}
        </div>
    )
}
export default Topics;