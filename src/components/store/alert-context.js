import { createContext, useCallback, useState } from "react";

const AlertContext = createContext({
    type: "",
    text: "",
    alertOn: false,
    createAlert: (type, text)=>{},
    closeAlert: ()=>{},
})

export function AlertContextProvider(props){
    const [alertOn,setAlertOn] = useState(false)
    const [type, setType] = useState("")
    const [text,setText] = useState("")

    const createAlert = useCallback((alertType, alertText)=>{
        setType(alertType)
        setText(alertText)
        setAlertOn(true)
    },[])

    function closeAlert(){
        setAlertOn(false)
        setType("")
        setText("")
    }

    const context = {
        type,
        text,
        alertOn,
        createAlert,
        closeAlert,
    }

    return(
        <AlertContext.Provider value={context}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertContext