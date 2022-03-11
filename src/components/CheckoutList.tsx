import classes from "../styles/CheckoutList.module.scss";
import { useContext, useState, useEffect } from "react";
import { ContextApi } from "../storage/Context";
import {RiDeleteBin5Fill} from "react-icons/ri";
import UserInfoForm from "./UserInfoForm";

interface arrI {
    ID:number,
    name:string,
    price:number,
    image:string,
    multiplier:number,
}
const CheckoutList = () =>{
    const {Cart, FinalPrice} = useContext(ContextApi);
    const [cart, setCart] = Cart;
    const [finalPrice, setFinalPrice] = FinalPrice;
    const [sortedCart, setSortedCart] = useState([]);
    const [step, setStep] = useState<number>(1);
    function deleteFromCart(key:number){
        let newArr:Array<object> = [];
        let price = 0;
        for (let i = 0; i<cart.length; i++){
            if(i!==key){
                newArr.push(cart[i])
                price+=cart[i].price;
            }
        }
        console.log(newArr);
        setFinalPrice(price);
        setCart(newArr)
    }
    function stepHandler(step:number){
        setStep(step);
    }
    function buttonHandler(index:number){
        setStep((prev)=>prev+(index))
    }
    function sortHandler(cart:arrI[]){
        let newList:arrI[] = [];
        cart.forEach((e)=>{
        let el=newList.find(n => n.name===e.name);
        if(el){
            el.multiplier+=e.multiplier;
            el.price+=e.price
        }
        else newList.push(e);
        });
        console.log(newList)
        setCart(newList)
    }

    useEffect(()=>{
        if(step===2){
            sortHandler(cart)
        }
    },[step])
    return (
        <div className={classes.mainBlock}>
            <div className={classes.steps}>
                <div onClick={()=>stepHandler(1)} className={classes.step}>
                    <p>1</p>
                </div>
                <p className={classes.lineStep}>{"=========>"}</p>
                <div onClick={()=>stepHandler(2)} className={classes.step}>
                    <p>2</p>
                </div>
                <p className={classes.lineStep}>{"=========>"}</p>
                <div onClick={()=>stepHandler(3)} className={classes.step}>
                    <p>3</p>
                </div>
                <p className={classes.lineStep}>{"=========>"}</p>
                <div onClick={()=>stepHandler(4)} className={classes.step}>
                    <p>4</p>
                </div>
            </div>
            {step===1 ? 
            <div>
                {cart.map((item:any, key:number)=>{
                    return (
                        <div key={key}>
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
                                    <RiDeleteBin5Fill onClick={()=>deleteFromCart(key)}/>
                                    <p>{Math.round(item.price * 100) / 100}$</p>
                                </div>
                            </div>
                            <div className={classes.line}></div>
                        </div>
                    )
                })}
            </div> :
            step===2 ? 
            <div>2</div> :
            step===3 ?
            <div><UserInfoForm/></div> :
            step===4 ? <p>4</p> : null}
            <div className={classes.btnBlock}>
                <button onClick={()=>buttonHandler(-1)}>Back</button>
                <button onClick={()=>buttonHandler(1)}>Next Step</button>
            </div>
        </div>
    )
}

export default CheckoutList;