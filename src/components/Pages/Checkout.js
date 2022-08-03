import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import LoadingSpinner from "../LoadingSpinner"
import AuthContext from "../store/auth-context"

export default function Checkout(){
    const [isLoading,setIsLoading] = useState(false)
    const {defaultTitle} = useContext(AuthContext)

    useEffect(()=>{
        document.title = defaultTitle + " - Checkout"
    },[defaultTitle])

    useEffect(()=>{
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
        },500)
    },[])

    return(
        <>
            {isLoading && <LoadingSpinner/>}
            {!isLoading && <div className="checkout">
                <h2 className="title-1">Checkout</h2>
                <section className="checkout-message">
                    Esse site é apenas um projeto para meu portfólio.
                    Ele acaba aqui.<br/>
                    <Link to="/sobre">Clique aqui para saber sobre o projeto.</Link>
                    <p className="checkout-message-credits">Bruno Lucas Ribeiro Santos<br/>
                    brunolucas23@gmail.com<br/>
                    +55 (79) 98818-8543<br/>
                    </p>
                    <a href="https://www.linkedin.com/in/bruno-ribeiro02/" target="_blank" rel="noreferrer">Linkedin</a>
                </section>
            </div>}
            
        </>
    )
}