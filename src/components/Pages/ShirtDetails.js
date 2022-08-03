import { useContext, useEffect,useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import LoadingSpinner from "../LoadingSpinner"
import AuthContext from "../store/auth-context"
import CartContext from "../store/cart-context"
import {useDispatch} from "react-redux"
import {actions} from "../store/alert-store"

export default function ShirtDetails(){
    const dispatch = useDispatch()
    const cartCtx = useContext(CartContext)
    const [shirtItem, setShirtItem] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [loaded,setLoaded] = useState(false)
    const [added,setAdded] = useState(false)
    const [size,setSize] = useState("p")
    const params = useParams()
    const navigate = useNavigate()

    const {defaultTitle} = useContext(AuthContext)
    useEffect(()=>{
        document.title = loaded ? defaultTitle + " - " + shirtItem.name : defaultTitle
    },[defaultTitle,shirtItem.name,loaded])

    useEffect(()=>{
        setIsLoading(true)
        fetch("https://shirts-4fcd3-default-rtdb.firebaseio.com/products.json").then(
            response=>response.json()
        ).then(data=>{
            const list = []

            for(const key in data){
                list.push({...data[key]})
            }

            let item = list.filter(item=>item.price>0).find(item=>item.name.toLowerCase().replace(/ /g, "-")===params.productSlug)

            if(!item){
                dispatch(actions.createAlert({type:"error",text:"Erro 404! Essa página não existe"}))
                navigate("/")
            }
            setIsLoading(false)
            setShirtItem(item)
            setLoaded(true)
        }).catch((err)=>{
            dispatch(actions.createAlert({type:"error",text:"Erro ao carregar os dados do produto. Recarregue a página."}))
            setIsLoading(false)
        })
    },[params,navigate,dispatch])

    function updateValue(event){
        setSize(event.target.value)
    }

    function addHandler(){
        setAdded(true)
        const cartItem = {
            size: size,
            ...shirtItem
        }
        
        cartCtx.addCart(cartItem)
        setTimeout(()=>{setAdded(false)},2000)
    }
    

    return(
        <>
            <div className="detail">
                {isLoading && <LoadingSpinner/>}
                {!isLoading && (<><img src={shirtItem.img} alt={shirtItem.name}/>
                <section className="detail-info">
                    <h4 className="detail-info-name">{shirtItem.name}</h4>
                    <p className="detail-info-desc">{shirtItem.desc}</p>
                    <div className="detail-info-size">
                        <label htmlFor="size">Escolha o tamanho:</label>
                        <select id="size" name="size" onChange={updateValue}>
                            <option value="p">P</option>
                            <option value="m">M</option>
                            <option value="g">G</option>
                        </select>
                    </div>
                    <span className="detail-info-price">R${shirtItem.price}</span><br/>
                    <button disabled={added} onClick={addHandler} className="detail-add">{!added ? "Adicionar à sacola": "Item adicionado a sacola!"}</button>
                </section></>)}
            </div>
        </>
    )
}