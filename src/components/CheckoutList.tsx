import classes from "../styles/CheckoutList.module.scss";
import { useContext, useState, useEffect } from "react";
import { ContextApi } from "../storage/Context";
import {RiDeleteBin5Fill} from "react-icons/ri";
import UserInfoForm from "./UserInfoForm";
import CheckoutItem from "./CheckoutItem";
import { Calculator } from "./Calculator";

interface arrI {
    ID:number,
    name:string,
    price:number,
    image:string,
    multiplier:number,
}
const CheckoutList = () =>{
    const {Cart, FinalPrice, Promotions, UserInfoCheck, Email, Adress, CreditCard} = useContext(ContextApi);
    const [cart, setCart] = Cart;
    const [finalPrice, setFinalPrice] = FinalPrice;
    const [promotions, setPromotions] = Promotions;
    const [userInfoCheck, setUserInfoCheck] = UserInfoCheck;
    const [email, setEmail] = Email;
    const [adress, setAdress] = Adress;
    const [creditCard, setCreditCard] = CreditCard;
    const [buttons, setButtons] = useState([true,false,false,false]);
    const [discountPrice, setDiscountPrice] = useState<any>();
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
        if(step===4 && (userInfoCheck[0]!==true || userInfoCheck[1]!==true || userInfoCheck[2]!==true)){
            return;
        }else{
            if(step<=4 && step>0){
                setButtons((prev)=>{
                    prev[0] = false;
                    prev[1] = false;
                    prev[2] = false;
                    prev[3] = false;
                    prev[step-1] = true;
                    return [...prev]
                })
                setStep(step);
            }else{
                return;
            }
        }
    }
    function buttonHandler(index:number){
        if(cart.length>0){
            stepHandler(step+index)
            //setStep((prev)=>prev+(index));  
        }
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
        applyQuantity(newList)

    }
    function applyPromotions(price:number){
        const calculated = Calculator(price, promotions);
        setDiscountPrice(calculated)
    }
    function applyQuantity (cart:arrI[]){
        let motionQuantity = 0;
        let motionPrice = 0;
        let motionsum = 0;
        let smokeQuantity = 0;
        let smokePrice = 0;
        let smokesum = 0;
        let newPrice = 0;
        for(let i in cart){
            if(cart[i].name==="Motion Sensor"){
                motionQuantity = cart[i].multiplier;
                motionPrice = cart[i].price/cart[i].multiplier
            }
            if(cart[i].name==="Smoke Sensor"){
                smokeQuantity = cart[i].multiplier;
                smokePrice = cart[i].price/cart[i].multiplier
            }
        }
        newPrice = finalPrice - smokePrice * smokeQuantity - motionPrice * motionQuantity;
        if(motionQuantity>0){
            if(motionQuantity%3===0){
                motionsum = motionsum + motionQuantity/3 * 65
            }
            if(motionQuantity%3!==0){
                const extra = motionQuantity%3;
                motionsum = motionsum + Math.floor(motionQuantity/3) * 65 + motionPrice * extra;
            }
        }
        if(smokeQuantity>0){
            if(smokeQuantity%2===0){
                smokesum = smokesum + smokeQuantity/2 * 35
            }
            if(smokeQuantity%2!==0){
                const extra = smokeQuantity%2;
                smokesum = smokesum + Math.floor(smokeQuantity/2) * 35 + smokePrice * extra;
            }
        }
        newPrice = newPrice + smokesum + motionsum;
        console.log(newPrice, "new Price");
        applyPromotions(newPrice);
    }
    function getColor(i:boolean){
        if(i===true){
            return "#1DB954";
        }
    }
    useEffect(()=>{
        if(step===2){
            sortHandler(cart)
        }
        console.log(cart);
    },[step, finalPrice])
    return (
        <div className={classes.mainBlock}>
            <div className={classes.steps}>
                <div style={{backgroundColor:getColor(buttons[0])}} onClick={()=>stepHandler(1)} className={classes.step}>
                    <p>1</p>
                </div>
                <p className={classes.lineStep}>{"=========>"}</p>
                <div style={{backgroundColor:getColor(buttons[1])}} onClick={()=>stepHandler(2)} className={classes.step}>
                    <p>2</p>
                </div>
                <p className={classes.lineStep}>{"=========>"}</p>
                <div style={{backgroundColor:getColor(buttons[2])}} onClick={()=>stepHandler(3)} className={classes.step}>
                    <p>3</p>
                </div>
                <p className={classes.lineStep}>{"=========>"}</p>
                <div style={{backgroundColor:getColor(buttons[3])}} onClick={()=>stepHandler(4)} className={classes.step}>
                    <p>4</p>
                </div>
            </div>
            {step===1 ? 
            <div className={classes.scrollBlock}>
                {cart.map((item:any, key:number)=>{
                    return (
                        <div key={key}>
                            <CheckoutItem deleteFromCart={()=>deleteFromCart(key)} ID={item.ID} name={item.name} price={item.price} image={item.image} multiplier={item.multiplier} />
                        </div>
                    )
                })}
                {cart.length===0 ? <p className={classes.empty}>No Items in Cart</p> : null}
            </div> :
            step===2 ? 
            <div>
                {cart.map((item:any, key:number)=>{
                    return (
                        <div key={key}>
                            <CheckoutItem deleteFromCart={()=>deleteFromCart(key)} ID={item.ID} name={item.name} price={item.price} image={item.image} multiplier={item.multiplier} />
                        </div>
                    )
                })}
                {cart.length>0 ? 
                <div className={classes.promotions}>
                    <div>
                        {promotions[0] ? <p>Promotion Activated -5%</p> :
                         promotions[1] ? <p>Promotion Activated -20% </p> : null}
                        {promotions[2] ? <p>Promotion Activated -20$</p> : null}
                    </div>
                    <div className={classes.priceBlock}>
                        <div>
                            <p>Total</p>
                            <p>{Math.round(finalPrice * 100) / 100}$</p>
                        </div>
                        <div>
                            <p>Discounts</p>
                            <p>{-Math.round((finalPrice-discountPrice) * 100) / 100}$</p>
                        </div>
                        <div className={classes.line}></div>
                        <div>
                            <p>Final Price</p>
                            <p>{Math.round(discountPrice * 100) / 100}$</p>
                        </div>
                    </div>
                </div> : <p className={classes.empty}>No Items in Cart</p>}
            </div> :
            step===3 ?
            <div><UserInfoForm/></div> :
            step===4 ? 
            <div className={classes.paymentBlock}>
                <h1>Payment Successful</h1>
                <p>Personal info</p>
                <p>Email Adress : {email}</p>
                <p>Adress : {adress}</p>
                <p>Credit Card Number : {creditCard}</p>
                <h2>Items Bought</h2>
                {cart.map((item:any, key:number)=>{
                    return (
                        <div className={classes.paymentCart}key={key}>
                            <img src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.multiplier}</p>
                        </div>
                    )
                })}
            </div>
            : null}
            <div className={classes.btnBlock}>
                <button onClick={()=>buttonHandler(-1)}>Back</button>
                {step!==3 && step!==4 ? <button onClick={()=>buttonHandler(1)}>Next</button> : 
                userInfoCheck[0]===true && userInfoCheck[1]===true && userInfoCheck[2]===true && step===3 ?
                <button onClick={()=>buttonHandler(1)}>Next</button> : null}
            </div>
        </div>
    )
}

export default CheckoutList;