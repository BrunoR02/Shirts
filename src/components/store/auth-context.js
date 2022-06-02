import { createContext, useCallback, useEffect, useState } from "react";

let expireTimeout;

const AuthContext = createContext({
    token: "",
    displayName: "",
    isLogged: false,
    autoLogout: false,
    ResetAuto: ()=>{},
    login: (idToken)=>{},
    logout: ()=>{},
    defaultTitle: "",
})

//Titulo do site
const defaultTitle = document.title

function CalculateRemainingTime(expirationTime){
    const expirationDate = new Date(expirationTime).getTime()
    const actualDate = new Date().getTime()

    const duration = expirationDate - actualDate
    return duration
}

export function AuthContextProvider(props){
    const [token,setToken] = useState(null)
    const [displayName,setDisplayName] = useState("")
    const [autoLogout, setAutoLogout] = useState(false)
    
    const isLogged = !!token 
    
    const logout = useCallback(()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("expirationTime")
        setToken(null)
        setDisplayName("")
    
        clearTimeout(expireTimeout)
    },[])

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
        setDisplayName(localStorage.getItem("name"))
        if(isLogged){
            const durationTime = CalculateRemainingTime(localStorage.getItem("expirationTime"))
            if(durationTime < 6000){
                setAutoLogout(true)
                logout()
            } else {
                expireTimeout = setTimeout(()=>{
                    setAutoLogout(true)
                    logout()
                }, durationTime)
            }
            
        }
    },[isLogged, logout])

    function login(idToken,name, expirationTime){
        localStorage.setItem("token", idToken)
        localStorage.setItem("name", name)
        localStorage.setItem("expirationTime",expirationTime)
        setToken(idToken)
        setDisplayName(name)
        

        const durationTime = CalculateRemainingTime(expirationTime)
        expireTimeout = setTimeout(()=>{
            setAutoLogout(true)
            logout()
        },durationTime)
    }

    const ResetAuto = useCallback(()=>{
        setAutoLogout(false)
    },[])

    const context = {
        token,
        displayName,
        isLogged,
        autoLogout,
        ResetAuto,
        login,
        logout,
        defaultTitle,
    }


    return(
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext