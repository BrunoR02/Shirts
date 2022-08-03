
import { useContext, useEffect } from "react"
import ShirtList from "../Shirt/ShirtList"
import AuthContext from "../store/auth-context"

export default function Home(){
    const {defaultTitle} = useContext(AuthContext)

    useEffect(()=>{
        document.title = defaultTitle + " - Home"
    },[defaultTitle])

    return(
        <>
            <ShirtList/> 
        </>
    )
}