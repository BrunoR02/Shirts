import { useContext } from "react"
import CartContext from "../store/cart-context"
import { Link } from "react-router-dom"
import bag from "../../img/bag.png"

export default function CartButton(){
    const cartCtx = useContext(CartContext)
    
    return(
        <Link className="cart-button" to="/sacola">
            <img className="cart-button-image" src={bag} alt="bag"/> <span>{cartCtx.cartTotal}</span>
        </Link>
    )
}