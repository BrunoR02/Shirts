import { useEffect, useState } from "react";

function useInput(type, form = "register"){
    const [enteredValue, setEnteredValue] = useState("")
    const [inputIsTouched, setInputIsTouched] = useState(false)
    const [isValid,setIsValid] = useState(false)
    const [error, setError] = useState("")

    let inputType = type
    let formType = form

    useEffect(()=>{
        setError("")
        if(inputType==="name"){
            if(enteredValue.length < 2){
                setError("Nome muito curto.")
            } else if((enteredValue.indexOf(" ") === 0)){
                setError("Nome inválido. Não pode começar com espaço")
            } else if(!(/^[A-Za-z]+$/.test(enteredValue))){
                setError("Nome inválido. O nome só pode ter letras")
            }
            setIsValid(error === "")
        } else if(inputType === "email"){
            if(!enteredValue.trim().includes("@")){
                setError("Email inválido. Inclua o @")
            } else if(!(enteredValue.indexOf("@") > 0)){
                setError("Inválido. O email não pode começar com @")
            } else if(enteredValue.substring(enteredValue.indexOf("@") + 1) === ""){
                setError("Email Inválido. Precisa ter uma parte depois do @")
            } else if(!enteredValue.substring(enteredValue.indexOf("@") + 1).includes(".")){
                setError("Email inválido. Precisar ter um '.' depois do @")
            } else if(enteredValue.substring(enteredValue.indexOf(".") + 1) === ""){
                setError("Email inválido. Precisa ter uma parte depois do '.'")
            }
            setIsValid(error === "")
        } else if (inputType==="password"){
            if(formType === "register"){
                if(enteredValue.trim().length < 7){
                    setError("Senha muito curta. Mínimo 7 dígitos")
                } else if(!(/\d/.test(enteredValue))){
                    setError("A senha precisa ter pelo menos 1 número")
                } else if(!(/[A-Z]/.test(enteredValue))){
                    setError("A senha precisa ter pelo menos 1 letra maiúscula")
                }
            } else if( formType === "login"){
                if(enteredValue.trim().length < 7){
                    setError("Senha inválida. Precisa ter 7 dígitos no mínimo")
                } else if(enteredValue.trim().length === 1){
                    setError("Senha inválida. Digite alguma coisa")
                }
            }
            setIsValid(error === "")
        }
    },[enteredValue,inputType,formType, error])

    const inputIsInvalid = !isValid && inputIsTouched
    
    function changeHandler(event){
        setEnteredValue(event.target.value)
    }

    function blurHandler(){
        setInputIsTouched(true)
    }

    function resetInput(){
        setEnteredValue("")
        setInputIsTouched(false)
    }

    return {
        value: enteredValue,
        errorMsg: error,
        isValid,
        isInvalid: inputIsInvalid,
        changeHandler,
        blurHandler,
        resetInput,
    }
}

export default useInput