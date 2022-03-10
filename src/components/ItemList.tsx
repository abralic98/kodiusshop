
import classes from "../styles/ItemList.module.scss"
import Item from "./Item"
import {useState, useEffect, useContext} from "react";
import Axios from "axios";
import { ContextApi } from "../storage/Context";
interface Iitem {

}
const ItemList = () =>{
    const {Server} = useContext(ContextApi);
    const server = Server;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [items, setItems] = useState([{
        name:"",
        price:0,
        image:""
    }]);
    useEffect(()=>{
        Axios.get(`${server}/api/get/items`)
        .then((response)=>{
            console.log(response.data)
            setItems(response.data);
            setIsLoading(false);
        })
    },[])
    
    return (
        <div className={classes.mainBlock}>
            {isLoading!==true ? 
            <div className={classes.itemList}>
                {items.map((item)=>{
                    return(
                        <Item name={item.name} price={item.price} image={item.image}/>
                    )
                })}
            </div>
            : null}
            <div className={classes.pagination}>
                <button>Previous Page</button>
                <p>1</p>
                <button>Next Page</button>
            </div>
        </div>
    )
}

export default ItemList;