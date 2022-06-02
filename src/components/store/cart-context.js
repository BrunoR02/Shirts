import { createContext,useEffect,useState } from "react";

let cartTimeout;

const CartContext = createContext({
    cartList: [],
    cartTotal: 0,
    cartPrice: 0,
    wasBuying: false,
    setBuying: ()=>{},
    setNotBuying: ()=>{},
    addCart: (item)=>{},
    removeCart: (item)=>{},
    updateCart: (list)=>{}
})

function CalculateRemainingTime(expirationTime){
    const expirationDate = expirationTime
    const actualDate = new Date().getTime()

    const duration = expirationDate - actualDate
    return duration
}

export function CartContextProvider(props){
    const [list,setList] = useState([])
    const [changed,setChanged] = useState(false)
    const [wasBuying, setWasBuying] = useState(false)

    function addCartHandler(item){
        if(list.some(shirt=>shirt.item.id===item.id && shirt.item.size===item.size)){
            setList(prevList=>{
                let lista = prevList.map(shirt=>{
                    if(shirt.item.id ===item.id && shirt.item.size === item.size){
                        return {amount: ++shirt.amount, item: shirt.item}
                    } 
                    return shirt
                })
                return lista
            })
        } else{
            setList(prevList=>{
                return [...prevList,{amount: 1,item: item}]
            })
        }
        setChanged(true)
    }

    function removeCartHandler(item, action="ONE"){
        if(action === "ONE"){
            setList(prevList=>{
                let lista = prevList.map(shirt=>{
                    if(shirt.item.id ===item.id && shirt.item.size === item.size){
                        return {amount: --shirt.amount, item: shirt.item}
                    } 
                    return shirt
                }).filter(item=>item.amount !== 0)
                return lista
            })
        } else {
            setList(prevList=>{
                let lista = prevList.filter(shirt=>{
                    if(shirt.item.id === item.id && shirt.item.size === item.size){
                        return false
                    }
                    return true
                })
                return lista
            })
        }
        setChanged(true)
    }

    let totalAmount = 0
    if(list.length>0){
        list.map((item)=>{
            totalAmount += item.amount
            return null
        })
    }

    let cartTotalPrice = 0
    if(list.length>0){
        list.map(shirt=>{
            cartTotalPrice += shirt.amount*shirt.item.price
            return null
        })
    }

    function setBuying(){
        setWasBuying(true)
    }

    function ResetBuying(){
        setWasBuying(false)
    }

    useEffect(()=>{
        if(changed){
            if(list.length !== 0){
                localStorage.setItem("cart", JSON.stringify(list))
                const expiresIn = new Date(new Date().getTime() + 3600000).getTime()
                localStorage.setItem("expirationCart", expiresIn.toString())
                setChanged(false)
                const duration = CalculateRemainingTime(localStorage.getItem("expirationCart"))
                cartTimeout = setTimeout(expireCart,duration)
            } else if (list.length === 0) {
                expireCart()
                setChanged(false)
            }
        }
        
    },[list, changed])

    function expireCart(){
        localStorage.removeItem("cart")
        localStorage.removeItem("expirationCart")
        clearTimeout(cartTimeout)
    }

    useEffect(()=>{
        if(localStorage.getItem("cart")){
            setList(JSON.parse(localStorage.getItem("cart")))
            
            const duration = CalculateRemainingTime(localStorage.getItem("expirationCart"))
            if(duration < 60000){
                expireCart()
                setList([])
            } else {
                cartTimeout = setTimeout(expireCart,duration)
            }
        }
    },[])

    const context = {
        cartList: list,
        cartTotal: totalAmount,
        cartPrice: cartTotalPrice,
        wasBuying,
        setBuying,
        ResetBuying,
        addCart: addCartHandler,
        removeCart: removeCartHandler,
    }

    return(
        <CartContext.Provider value={context}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext