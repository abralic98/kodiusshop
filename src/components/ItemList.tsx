
import classes from "../styles/ItemList.module.scss"
import Item from "./Item"
import {useState, useEffect, useContext} from "react";
import Axios from "axios";
import { ContextApi } from "../storage/Context";

const ItemList = () =>{
    const {Server} = useContext(ContextApi);
    const server = Server;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [items, setItems] = useState([{
        ID:0,
        name:"",
        price:0,
        image:""
    }]);
    useEffect(()=>{
        Axios.get(`${server}/api/get/items`)
        .then((response)=>{
            setItems(response.data);
            setIsLoading(false);
        })
    },[])
    
    return (
        <div className={classes.mainBlock}>
            {isLoading!==true ? 
            <div className={classes.itemList}>
                {items.map((item, index)=>{
                    return(
                        <Item key={index} ID={item.ID} name={item.name} price={item.price} image={item.image}/>
                    )
                })}
            </div>
            : null}
        </div>
    )
}

export default ItemList;