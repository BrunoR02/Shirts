import { useContext, useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import CartItem from "../Cart/CartItem"
import AuthContext from "../store/auth-context"
import CartContext from "../store/cart-context"
import {useDispatch} from "react-redux"
import {actions} from "../store/alert-store"

export default function CartPage(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartCtx = useContext(CartContext)
    const {defaultTitle,isLogged} = useContext(AuthContext)

    useEffect(()=>{
        document.title = defaultTitle + " - Sacola"
    },[defaultTitle])
    
    function checkoutHandler(){
        if(!isLogged){
            dispatch(actions.createAlert({type:"alert", text:"Você precisa estar logado para continuar a compra. Faça o login"}))
            cartCtx.setBuying()
            navigate("/login")
        } else{
            navigate("/checkout")
        }
    }

    return(
        <>
            <h2 className="cart-title">SACOLA</h2>
            <div className="cart-container">
                {cartCtx.cartTotal === 0 && 
                    <div className="cart-empty">
                        <p>Sua Sacola está vazia.</p>
                        <Link className="cart-empty-link" to="/">Ir para a página inicial</Link>
                    </div>}
                {cartCtx.cartTotal > 0 && <>
                    <ul className="cart-items">
                        {cartCtx.cartList.map(shirt=>{
                            return (<CartItem 
                            key={shirt.item.id + shirt.item.size}
                            id={shirt.item.id}
                            name={shirt.item.name} 
                            amount={shirt.amount}
                            price={shirt.item.price}
                            size={shirt.item.size}
                            img={shirt.item.img}/>)
                        })}
                    </ul>
                    <section className="cart-total">
                        <h4>Resumo do Pedido:</h4>
                        <div className="cart-total-value">
                            Total: <span>R${cartCtx.cartPrice}</span>
                        </div>
                        <button onClick={checkoutHandler}>Ir para pagamento</button>
                    </section>
                </>}
                
            </div>
        </>
    )
}