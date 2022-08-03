import { useContext,useState } from "react"
import {Link} from "react-router-dom"
import CartContext from "../store/cart-context"
import Modal from "../Modal"
import Backdrop from "../Backdrop"
import LoadingSpinner from "../LoadingSpinner"

export default function CartItem(props){
    const {addCart,removeCart} = useContext(CartContext)
    const [modalOn, setModalOn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function addHandler(){
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
            addCart({id: props.id, size: props.size})
        },500)
    }

    function removeHandler(){
        if(props.amount === 1){
            setModalOn(prevState=>!prevState)
        } else{
            setIsLoading(true)
            setTimeout(()=>{
                setIsLoading(false)
                removeCart({id: props.id, size: props.size})
            },500)
        }
    }

    function removeItemHandler(){
        setIsLoading(true)
        setTimeout(()=>{
            setIsLoading(false)
            removeCart({id: props.id, size: props.size}, "ALL")
        },1000)
    }



    return(
        <>
        <li className="cart-item">
            <button onClick={()=>{setModalOn(prevState=>!prevState)}} className="cart-item-delete"></button>
            <img className="cart-item-image" alt={props.name} src={props.img}></img>
            <div className="cart-item-info">
                <Link to={`/${props.name.toLowerCase().replace(/ /g, "-")}`}><h4>{props.name}</h4></Link>
                <p>Tamanho: {props.size.toUpperCase()}</p>
                <section className="cart-item-add">
                    Quantidade:
                    <button disabled={isLoading} onClick={removeHandler}>-</button>
                    {props.amount}
                    <button disabled={isLoading} onClick={addHandler}>+</button>
                </section>
            </div>
            <div className="cart-item-price">
                <span>R${props.price*props.amount}</span>
            </div>
        </li>
        {isLoading && <LoadingSpinner/>}
        {modalOn && <Modal closeModal={()=>{setModalOn(prevState=>!prevState)}} removeItem={removeItemHandler}/>}
        {modalOn && <Backdrop closeModal={()=>{setModalOn(prevState=>!prevState)}}/>}
        </>
    )
}