import { useContext, useState, useEffect } from "react"
import {useNavigate } from "react-router-dom"
import useInput from "../hook/useInput"
import LoadingSpinner from "../LoadingSpinner"
import AuthContext from "../store/auth-context"
import CartContext from "../store/cart-context"
import {useDispatch} from "react-redux"
import {actions} from "../store/alert-store"

export default function Login(){
    const dispatch = useDispatch()
    const authCtx = useContext(AuthContext)
    const {ResetBuying, wasBuying} = useContext(CartContext)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const emailInput = useInput("email")
    const passwordInput = useInput("password", "login")

    const {defaultTitle} = authCtx

    useEffect(()=>{
        document.title = defaultTitle + " - Login"
    },[defaultTitle])

    let formIsValid = false
    if(emailInput.isValid && passwordInput.isValid){
        formIsValid = true
    }


    let errorEmailClass = emailInput.isInvalid ? "error" : ""
    let errorPasswordClass = passwordInput.isInvalid ? "error" : ""


    function submitHandler(event){
        event.preventDefault()
        setIsLoading(true)
        const data = {
            email: emailInput.value,
            password: passwordInput.value
        }
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXeNVLMiaawayQGyKEVq_jVtFsLY3JzN4",{
            method: "POST",
            body: JSON.stringify({...data, returnSecureToken: true}),
            headers:{
                "Content-Type" : "application/json"
            }
        }).then(async response=>{
            if(response.ok){
                return response.json().then((data)=>{
                    emailInput.resetInput()
                    passwordInput.resetInput()
                    dispatch(actions.createAlert({type: "success", text:"Logado com sucesso!"}))
                    const expirationTime = new Date(new Date().getTime() + (data.expiresIn * 1000))
                    authCtx.login(data.idToken,data.displayName, expirationTime.toISOString())
                    if(wasBuying){
                        navigate("/sacola")
                        ResetBuying()
                    } else {
                        navigate("/")
                    }
                    setIsLoading(false)
                })
            } else {
                return response.json().then((data)=>{
                    let errorText = "Falha na autenticação. Tente Novamente"
                    let errorMessage;
                    if(data && data.error && data.error.message){
                        errorMessage = data.error.message
                        if(errorMessage.includes("EMAIL")){
                            errorText = "Email não encontrado! Veja se o digitou corretamente"
                        } else if(errorMessage.includes("INVALID")){
                            errorText = "Senha incorreta! Tente novamente"
                        }
                    }
                    dispatch(actions.createAlert({type: "error", text: errorText}))
                    setIsLoading(false)
                })
            }
        })
    }

    function cadastroHandle(){
        if(wasBuying){
            ResetBuying()
        }
        navigate("/cadastro")
    }

    return (
        <>
            {isLoading && <LoadingSpinner/>}
            <h2 className="title-1">Faça seu Login</h2>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-control">
                    <label htmlFor="email" className={errorEmailClass}>Digite o seu email</label>
                    <input className={`${errorEmailClass}-input`} type="text" id="email" name="email" required value={emailInput.value} onChange={emailInput.changeHandler} onBlur={emailInput.blurHandler}/>
                    {emailInput.isInvalid && <span className={`error-message ${errorEmailClass}`}>{emailInput.errorMsg}</span>}
                </div>
                <div className="form-control">
                    <label htmlFor="password" className={errorPasswordClass}>Digite a sua senha</label>
                    <input className={`${errorPasswordClass}-input`} type="password" id="password" name="password" required value={passwordInput.value} onChange={passwordInput.changeHandler} onBlur={passwordInput.blurHandler}/>
                    {passwordInput.isInvalid && <span className={`error-message ${errorPasswordClass}`}>{passwordInput.errorMsg}</span>}
                </div>
                <button disabled={!formIsValid}>Entrar</button>
            </form>
            <button onClick={cadastroHandle} className="button-1">Quero criar a minha conta</button>
        </>
    )
}