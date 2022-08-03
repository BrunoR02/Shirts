export default function Backdrop(props){
    return(
        <div onClick={props.closeModal} className="backdrop"></div>
    )
}