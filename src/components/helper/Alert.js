import { useCallback, useContext, useEffect, useState } from "react"
import AlertContext from "../store/alert-context"

function Alert(props){
    const {alertOn,closeAlert} = useContext(AlertContext)
    const [classAnimate,setClassAnimate] = useState("")
    
    const animateFade = useCallback(()=>{
        setClassAnimate("alert-fadeout")
        setTimeout(()=>{
            closeAlert()
        },2000)
    },[closeAlert])

    useEffect(()=>{
        if(alertOn){
            setTimeout(()=>{
                animateFade()
            },5000)
        }
    },[alertOn, animateFade])
       

    return(
        <div className={`alert alert-${props.type} ${classAnimate}`}>
            <button onClick={closeAlert} className="alert-close"></button>
            <p className="alert-message">{props.text}</p>
        </div>
    )
}

export default Alert