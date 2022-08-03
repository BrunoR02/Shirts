import { useEffect, useState } from "react";

export default function useInput(type, form = "register"){
    const [enteredValue, setEnteredValue] = useState("")
    const [inputIsTouched, setInputIsTouched] = useState(false)
    const [isValid,setIsValid] = useState(false)
    const [error, setError] = useState("")

    let inputType = type
    let formType = form

    useEffect(()=>{
        setError("")
        let errorMessage = "";
        if(inputType==="name"){
            if(enteredValue.length < 2){
                errorMessage = "Nome muito curto."
            } else if((enteredValue.indexOf(" ") === 0)){
                errorMessage = "Nome inválido. Não pode começar com espaço"
            } else if(!(/^[A-Za-z]+$/.test(enteredValue))){
                errorMessage = "Nome inválido. O nome só pode ter letras"
            }
            setIsValid(errorMessage === "")
        } else if(inputType === "email"){
            if(!enteredValue.trim().includes("@")){
                errorMessage = "Email inválido. Inclua o @"
            } else if(!(enteredValue.indexOf("@") > 0)){
                errorMessage = "Inválido. O email não pode começar com @"
            } else if(enteredValue.substring(enteredValue.indexOf("@") + 1) === ""){
                errorMessage = "Email Inválido. Precisa ter uma parte depois do @"
            } else if(!enteredValue.substring(enteredValue.indexOf("@") + 1).includes(".")){
                errorMessage = "Email inválido. Precisar ter um '.' depois do @"
            } else if(enteredValue.substring(enteredValue.indexOf(".") + 1) === ""){
                errorMessage = "Email inválido. Precisa ter uma parte depois do '.'"
            }
            setIsValid(errorMessage === "")
        } else if (inputType==="password"){
            if(formType === "register"){
                if(enteredValue.trim().length < 7){
                    errorMessage = "Senha muito curta. Mínimo 7 dígitos"
                } else if(!(/\d/.test(enteredValue))){
                    errorMessage = "A senha precisa ter pelo menos 1 número"
                } else if(!(/[A-Z]/.test(enteredValue))){
                    errorMessage = "A senha precisa ter pelo menos 1 letra maiúscula"
                }
            } else if( formType === "login"){
                if(enteredValue.trim().length < 7){
                    errorMessage = "Senha inválida. Precisa ter 7 dígitos no mínimo"
                } else if(enteredValue.trim().length === 1){
                    errorMessage = "Senha inválida. Digite alguma coisa"
                }
            }
            setIsValid(errorMessage === "")
        }
        setError(errorMessage)
    },[enteredValue,inputType,formType, error])

    const inputIsInvalid = !isValid && inputIsTouched

    function resetInput(){
        setEnteredValue("")
        setInputIsTouched(false)
    }

    return {
        value: enteredValue,
        errorMsg: error,
        isValid,
        isInvalid: inputIsInvalid,
        changeHandler: (event) =>{setEnteredValue(event.target.value)},
        blurHandler: ()=>{setInputIsTouched(true)},
        resetInput,
    }
}