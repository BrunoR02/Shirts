import { useCallback, useContext, useEffect, useState} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import CartButton from "./Cart/CartButton"
import Alert from "./helper/Alert"
import LoadingSpinner from "./LoadingSpinner"
import AlertContext from "./store/alert-context"
import AuthContext from "./store/auth-context"

let active = false

function Header(){
    const authCtx = useContext(AuthContext)
    const alertCtx = useContext(AlertContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [menuClass, setMenuClass] = useState("")
    const [menuLogged, setMenuLogged] = useState("")
    const location = useLocation()
    const [oldURL, setOldURL] = useState(location.pathname)


    const {autoLogout, ResetAuto, isLogged} = authCtx
    const {createAlert} = alertCtx
    useEffect(()=>{
        if(autoLogout){
            setIsLoading(true)
            setTimeout(()=>{
                createAlert("alert", "Sessão expirada! Faça o login novamente")
                navigate("/")
                setIsLoading(false)
                ResetAuto()
            },1000)
        }
    },[autoLogout,createAlert,ResetAuto,navigate])

    function handleLogout(){
        if(active){
            handleMenu()
        }
        setIsLoading(true)
        setTimeout(()=>{
            authCtx.logout()
            setIsLoading(false)
            alertCtx.createAlert("success", "Usuário deslogado com sucesso!")
        },1000)
    }

    const handleMenu = useCallback(()=>{
        if(!active){
            if(isLogged){
                setMenuClass("menu-active-logged")
            } else {
                setMenuClass("menu-active")
            }
            active = true
        } else {
            setMenuClass("")
            active = false
        }
    },[isLogged])

    useEffect(()=>{
        setOldURL(location.pathname)
        if(location.pathname !== oldURL && active){
            handleMenu()
        }
    },[location.pathname, oldURL,handleMenu])

    useEffect(()=>{
        if(isLogged){
            setMenuLogged("nav-logged")
        } else {
            setMenuLogged("")
        }
    },[isLogged])

    return(
        <header className="header">
            {isLoading && <LoadingSpinner/>}
            {alertCtx.alertOn && <Alert type={alertCtx.type} text={alertCtx.text} />}
            <Link to="/" className="header-title"><h2>Shirts</h2></Link>
            <section>
                {window.screen.width < 768 && <button onClick={handleMenu} className="header-menu"></button>}
                {authCtx.isLogged && <h4 className="header-message">Bem-vindo {authCtx.displayName}!</h4>}
                <ul className={`nav ${menuClass} ${menuLogged}`}>
                    {!authCtx.isLogged && <Link to="/login"><li>Login</li></Link>}
                    {!authCtx.isLogged && <Link to="/cadastro"><li>Cadastro</li></Link>}
                    {authCtx.isLogged && <button onClick={handleLogout} className="logout">Sair</button>}
                    <Link to="/sobre"><li>Sobre</li></Link>
                </ul>
                <CartButton/>
            </section>
        </header>
    )
}


export default Header