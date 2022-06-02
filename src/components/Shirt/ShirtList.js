import { useCallback, useContext, useEffect, useState } from "react"
import ShirtItem from "./ShirtItem"
import LoadingSpinner from "../LoadingSpinner"
import { useLocation, useNavigate} from "react-router-dom"
import AlertContext from "../store/alert-context"


function ShirtList(){
    const {createAlert} = useContext(AlertContext)
    const [shirtList, setShirtList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [loaded,setLoaded] = useState(false)
    const [ordering,setOrdering] = useState("default")
    const location = useLocation()
    const navigate = useNavigate()

    const OrderPrice = useCallback((list, order)=>{
        let orderedList = []

        if(order === "higher"){
            orderedList = list.sort((a,b)=>b.price-a.price)
        } else if( order === "lower"){
            orderedList = list.sort((a,b)=>a.price-b.price)
        } else if(order==="default") {
            orderedList = list.sort((a,b)=>a.id.localeCompare(b.id))
        } 

        return orderedList
    },[])
    

    useEffect(()=>{
        setIsLoading(true)
        fetch("https://shirts-4fcd3-default-rtdb.firebaseio.com/products.json").then(
            response=>response.json()
        ).then(data=>{
            const list = []

            for(const key in data){
                list.push({...data[key]})
            }

            setShirtList(list.filter(item=>item.price>0))
            setIsLoading(false)
            setLoaded(true)
        }).catch((err)=>{
            createAlert("error", "Erro ao carregar os produtos. Recarregue a página.")
            setIsLoading(false)
        })
    },[createAlert])


    useEffect(()=>{
        const params = new URLSearchParams(location.search)
        const order = params.get("order")
        setOrdering(order || "default")
        if(loaded){
            setIsLoading(true)
            setTimeout(()=>{
                setShirtList(prevList=>OrderPrice(prevList,order || "default"))
                setIsLoading(false)
            },500)
        }
    },[location.search,loaded,OrderPrice])

    function updateValue(event){
        if(event.target.value === "default"){
            navigate("/")
        } else {
            navigate(`?order=${event.target.value}`)
        }
    }

    return(
        <>
            <select className="shirt-order" id="order" name="order" value={ordering} onChange={updateValue}>
                <option value="default">Lançamento</option>
                <option value="lower">Menor Preço</option>
                <option value="higher">Maior Preço</option>
            </select>
            <div className="shirt">
                <ul className="shirt-list container">
                    {isLoading && <LoadingSpinner/>}
                    {!isLoading && shirtList.map(item=>{
                        return <ShirtItem key={item.id} img={item.img}
                        name={item.name}
                        price={item.price}
                        desc={item.desc}/>
                    })}
                    {!isLoading && shirtList.length === 0 && <p>Nada por aqui.</p>}
                </ul>
            </div>
        </>
        
    )
}

export default ShirtList