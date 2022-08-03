import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../store/alert-store"

function Alert(props){
    const dispatch = useDispatch()
    const alertOn = useSelector(state=>state.alertOn)
    const [classAnimate,setClassAnimate] = useState("")
    
    const animateFade = useCallback(()=>{
        setClassAnimate("alert-fadeout")
        setTimeout(()=>{
            dispatch(actions.closeAlert())
        },2000)
    },[dispatch])

    useEffect(()=>{
        if(alertOn){
            setTimeout(()=>{
                animateFade()
            },5000)
        }
    },[alertOn, animateFade])
       

    return(
        <div className={`alert alert-${props.type} ${classAnimate}`}>
            <button onClick={()=>{dispatch(actions.closeAlert())}} className="alert-close"></button>
            <p className="alert-message">{props.text}</p>
        </div>
    )
}

export default Alert