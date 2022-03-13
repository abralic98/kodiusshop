
import classes from "../styles/Item.module.scss"
import {useState, useContext, useEffect, useRef} from "react";
import { ContextApi } from "../storage/Context";

interface Iitem {
    ID:number,
    name:string,
    price:number,
    image:string
}

const Item = (props:Iitem) =>{
    const {FinalPrice, Cart, UserInfoCheck} = useContext(ContextApi);
    const [finalPrice, setFinalPrice] = FinalPrice;
    const [userInfoCheck, setUserInfoCheck] = UserInfoCheck;
    const [cart, setCart] = Cart;
    const [multiplier, setMultiplier] = useState<number>(1);
    const [textColor, setTextColor] = useState<string>("rgb(121, 0, 0)");
    const buttonValue = useRef<HTMLButtonElement>(null);

    useEffect(()=>{
        console.log(cart)
    },[cart])
    function addToCart(name:string, price:number, image:string, multiplier:number){
        setCart((prev:any)=>{
            return(
                [...prev, 
                {
                    name:name,
                    price:price*multiplier,
                    image:image,
                    multiplier:multiplier
                }]
            )
        })
        setUserInfoCheck((prev:boolean[])=>{
            prev[0] = false;
            prev[1] = false;
            prev[2] = false;
            return [...prev];
        })
        setFinalPrice((prev:number)=>prev+price*multiplier);
        changeButtonText();
    }
    
    function changeButtonText(){
        if (buttonValue.current!==null){
            buttonValue.current.innerHTML = "Success";
            setTextColor("#1DB954");
            setTimeout(returnButtonText, 500);
        }
    }
    function returnButtonText(){
        if (buttonValue.current!==null){
            buttonValue.current.innerHTML = "Add To Cart";
            setTextColor("rgb(121, 0, 0)");
        }
    }

    return(
        <div className={classes.mainBlock}>
            <img src={props.image} alt="" />
            <div className={classes.namePriceBlock}>
                <p>{props.name}</p>
                <p>{props.price}$</p>
            </div>
            <div className={classes.buttonBlock}>
                <button style={{color:textColor}}onClick={()=>addToCart(props.name, props.price, props.image, multiplier)} ref={buttonValue}>Add To Cart</button>
                <select onChange={(e)=>{
                            const selected = parseInt(e.target.value);
                            setMultiplier((prev)=>prev = selected)
                        }}>
                        <option value="1">1x</option>
                        <option value="2">2x</option>
                        <option value="3">3x</option>
                        <option value="4">4x</option>
                        <option value="5">5x</option>
                </select>
            </div>
        </div>
    )
}

export default Item;