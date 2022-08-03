import { useContext, useEffect, useState } from "react"
import useInput from "../hook/useInput"
import {Link, useNavigate} from "react-router-dom"
import LoadingSpinner from "../LoadingSpinner"
import AuthContext from "../store/auth-context"
import {useDispatch} from "react-redux"
import {actions} from "../store/alert-store"

function Cadastro(){
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const nameInput = useInput("name")
    const emailInput = useInput("email")
    const passwordInput = useInput("password")
    const password2Input = useInput("password")

    const {defaultTitle} = useContext(AuthContext)
    useEffect(()=>{
        document.title = defaultTitle + " - Cadastro"
    },[defaultTitle])

    let formIsValid = false
    if(nameInput.isValid && emailInput.isValid && passwordInput.isValid && password2Input.isValid && passwordInput.value === password2Input.value){
        formIsValid = true
    }

    let errorMatch = ""
    if(passwordInput.value !== password2Input.value && passwordInput.isValid && password2Input.isValid){
        errorMatch = "As duas senhas precisam ser iguais"
    }

    let errorNameClass = nameInput.isInvalid ? "error" : ""
    let errorEmailClass = emailInput.isInvalid ? "error" : ""
    let errorPasswordClass = passwordInput.isInvalid ? "error" : ""
    let errorPassword2Class = password2Input.isInvalid || errorMatch !== "" ? "error" : ""

    function submitHandler(event){
        event.preventDefault()
        setIsLoading(true)
        const data = {
            email: emailInput.value,
            password: passwordInput.value
        }
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXeNVLMiaawayQGyKEVq_jVtFsLY3JzN4",{
            method: "POST",
            body: JSON.stringify({...data, returnSecureToken: true}),
            headers:{
                "Content-Type" : "application/json"
            }
        }).then(async response=>{
            if(response.ok){
                return response.json().then((data)=>{
                    let token = data.idToken
                    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBXeNVLMiaawayQGyKEVq_jVtFsLY3JzN4",{
                        method: "POST",
                        body: JSON.stringify({idToken: token, displayName: nameInput.value, returnSecureToken: false}),
                        headers:{
                            "Content-Type" : "application/json"
                        }
                    }).then(response=>{
                        if(response.ok){
                            nameInput.resetInput()
                            emailInput.resetInput()
                            passwordInput.resetInput()
                            password2Input.resetInput()
                            dispatch(actions.createAlert({type:"success", text: "Conta cadastrado com sucesso! Faça seu Login"}))
                            setIsLoading(false)
                            navigate("/")
                        } else {
                            return response.json().then((data)=>{
                                dispatch(actions.createAlert({type:"error", text: "Erro ao criar sua conta! Tente novamente"}))
                                setIsLoading(false)
                            })
                        }
                    })
                })
                
            } else {
                return response.json().then((data)=>{
                    let getError;
                    let errorMessage = "Erro ao criar sua conta! Tente novamente"
                    if(data && data.error && data.error.message){
                        getError = data.error.message
                        if(getError.includes("EMAIL")){
                            errorMessage = "Esse email já está cadastrado. Tente outro"
                        }
                    }
                    dispatch(actions.createAlert({type:"error", text: errorMessage}))
                    setIsLoading(false)
                })
            }
        }).catch((err)=>{
            
        })
    }
    return (
        <>
            {isLoading && <LoadingSpinner/>}
            <h2 className="title-1">Vamos criar a sua conta?</h2>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-control">
                    <label htmlFor="name" className={errorNameClass}>Digite o seu nome</label>
                    <input className={`${errorNameClass}-input`} type="text" id="name" name="name" required value={nameInput.value} onChange={nameInput.changeHandler} onBlur={nameInput.blurHandler}/>
                    {nameInput.isInvalid && <span className={`error-message ${errorNameClass}`}>{nameInput.errorMsg}</span>}
                </div>
                <div className="form-control">
                    <label htmlFor="email" className={errorEmailClass}>Digite o seu email</label>
                    <input className={`${errorEmailClass}-input`} type="text" id="email" name="email" required value={emailInput.value} onChange={emailInput.changeHandler} onBlur={emailInput.blurHandler}/>
                    {emailInput.isInvalid && <span className={`error-message ${errorEmailClass}`}>{emailInput.errorMsg}</span>}
                </div>
                <div className="form-control">
                    <label htmlFor="password" className={errorPasswordClass}>Crie uma nova senha</label>
                    <input className={`${errorPasswordClass}-input`} type="password" id="password" name="password" required value={passwordInput.value} onChange={passwordInput.changeHandler} onBlur={passwordInput.blurHandler}/>
                    {passwordInput.isInvalid && <span className={`error-message ${errorPasswordClass}`}>{passwordInput.errorMsg}</span>}
                </div>
                <div className="form-control">
                    <label htmlFor="password2" className={errorPassword2Class}>Confirme a sua senha</label>
                    <input className={`${errorPassword2Class}-input`} type="password" id="password2" name="password2" required value={password2Input.value} onChange={password2Input.changeHandler} onBlur={password2Input.blurHandler}/>
                    {(password2Input.isInvalid || errorMatch !== "") && <span className={`error-message ${errorPassword2Class}`}>{password2Input.errorMsg === "" ? errorMatch : password2Input.errorMsg}</span>}
                </div>
                <button disabled={!formIsValid}>Crie sua conta</button>
            </form>  
            <h4 className="text-1">Já tenho uma conta. <Link to="/login">Fazer Login</Link></h4>
        </>
    )
}

export default Cadastro