import { useCallback, useContext, useEffect, useState} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import CartButton from "./Cart/CartButton"
import Alert from "./helper/Alert"
import LoadingSpinner from "./LoadingSpinner"
import AuthContext from "./store/auth-context"
import {useDispatch, useSelector} from "react-redux"
import {actions} from "./store/alert-store"

let active = false

function Header(){
    const dispatch = useDispatch()
    const alert = useSelector(state=>state)
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [menuClass, setMenuClass] = useState("")
    const [menuLogged, setMenuLogged] = useState("")
    const location = useLocation()
    const [oldURL, setOldURL] = useState(location.pathname)


    const {autoLogout, ResetAuto, isLogged} = authCtx
    useEffect(()=>{
        if(autoLogout){
            setIsLoading(true)
            setTimeout(()=>{
                dispatch(actions.createAlert({type:"alert", text:"Sessão expirada! Faça o login novamente"}))
                navigate("/")
                setIsLoading(false)
                ResetAuto()
            },1000)
        }
    },[autoLogout,dispatch,ResetAuto,navigate])

    function handleLogout(){
        if(active){
            handleMenu()
        }
        setIsLoading(true)
        setTimeout(()=>{
            authCtx.logout()
            setIsLoading(false)
            dispatch(actions.createAlert({type:"success", text:"Usuário deslogado com sucesso!"}))
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
            {alert.alertOn && <Alert type={alert.type} text={alert.text} />}
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