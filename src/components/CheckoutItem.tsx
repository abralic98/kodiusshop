import classes from "../styles/CheckoutList.module.scss"
import {RiDeleteBin5Fill} from "react-icons/ri";
import {useContext} from "react";
import { ContextApi } from "../storage/Context";
interface Iitem {
    deleteFromCart:()=>void,
    ID:number,
    name:string,
    price:number,
    image:string,
    multiplier:number,
}
const CheckoutItem = (item:Iitem) =>{
    const {Cart, FinalPrice} = useContext(ContextApi);
    const [cart, setCart] = Cart;
    const [finalPrice, setFinalPrice] = FinalPrice;
    
    return (
        <div>
            <div className={classes.item}>
                <div className={classes.info}>
                    <div className={classes.name}>
                        <img src={item.image} alt="" />
                        <p>{item.name}</p>
                    </div>
                    <div className={classes.multiplier}>
                        <p>Quantity</p>
                        <p>{item.multiplier}</p>
                    </div>
                    <div className={classes.specialPromotion}>
                        {
                        item.name==="Motion Sensor" ? 
                        <p>Attention for every 3x {item.name} you get special discount</p> :
                        item.name==="Smoke Sensor" ? 
                        <p>Attention for every 2x {item.name} you get special discount</p> :
                        null}    
                    </div>
                </div>
                <div className={classes.priceBlock}>
                    <RiDeleteBin5Fill onClick={()=>item.deleteFromCart()}/>
                    <p>{Math.round(item.price * 100) / 100}$</p>
                </div>
            </div>
            <div className={classes.line}></div>
        </div>
    )
}

export default CheckoutItem;