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
                <h4><span>Shirts</span> de e-commerce de camisetas(shirts) desenvolvido do zero, possuindo implementações funcionais e completas prontas para serem usados em uma aplicação real. Dentre elas:<br/></h4>
                
                •	Trabalhei uma boa UI que reage ao usuário usando animações e estados do React, bem como também um sistema de alerta funcional usando Redux, garantindo uma boa experiência a qualquer pessoa que queira comprar no site. <br/>
                •	Desenvolvi um sistema de sessão integrando LocalStorage com gerenciamento de estado global do React (Context API), que reage a inatividade do usuário após um tempo determinado, trazendo segurança caso outro alguém acesse com a sua conta e utilize suas informações, podendo ser reutilizado em qualquer outro site. <br/>
                •	Autenticação com integração via REST API do Firebase garantindo boa confiabilidade dos dados dos usuários.
                
                <p className="sobre-credits">Bruno Lucas Ribeiro Santos<br/>
                brunolucas23@gmail.com<br/>
                +55 (79) 98818-8543<br/>
                </p>
                <a href="https://www.linkedin.com/in/bruno-ribeiro02/" target="_blank" rel="noreferrer">Linkedin</a>
            </div>
        </>
        
    )
}
