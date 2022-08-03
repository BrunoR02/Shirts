import {useEffect, useContext} from "react"
import AuthContext from "../store/auth-context"

export default function Sobre(){
    const {defaultTitle} = useContext(AuthContext) 
    useEffect(()=>{
        document.title = defaultTitle + " - Sobre"
    },[defaultTitle])
    return(
        <>
            <h2 className="title-1">Sobre</h2>
            <div className="sobre">
                <span>Shirts</span> é um e-commerce de camisetas(shirts) simples.
                Esse é um projeto de site 
                que eu produzi totalmente em React, 
                usando Firebase como banco de dados e host.
                Possui várias funcionalidades dentre elas:<br/>
                . Sistema de autenticação ligado ao banco de dados.<br/>
                . Sistema de carrinho funcional, onde você adiciona itens pelo tamanho da roupa.<br/>
                . Sistema de alerta usado para mostrar avisos e erros, mantendo uma boa experiência ao usuário.<br/>
                . Feito usando diversas funcionalidades do React tais como Context API, Custom Hook, useCallback, useEffect, useLocation, etc.
                <p className="sobre-credits">Bruno Lucas Ribeiro Santos<br/>
                brunolucas23@gmail.com<br/>
                +55 (79) 98818-8543<br/>
                </p>
                <a href="https://www.linkedin.com/in/bruno-ribeiro02/" target="_blank" rel="noreferrer">Linkedin</a>
            </div>
        </>
        
    )
}
