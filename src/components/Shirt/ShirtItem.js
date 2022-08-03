import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function ShirtItem(props){
    const slug = props.name.toLowerCase().replace(/ /g, "-")
    const [gridSize,setGridSize] = useState("4")
    useEffect(()=>{
        if(window.screen.width < 768){
            setGridSize("6")
        }
    },[])

    return(
        <Link to={`/${slug}`}>
        <li className={`shirt-item grid-${gridSize}`}>
            <img className="shirt-item-image" alt={props.name} src={props.img}></img>
            <div className="shirt-item-info">
                <h4>{props.name}</h4>
                <span>R${props.price}</span>
            </div>
        </li>
        </Link>
    )
}