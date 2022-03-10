import classes from "../styles/PromotionsPage.module.scss"
import Header from "../components/Header";
import { useContext, useEffect } from "react";
import { ContextApi } from "../storage/Context";
import { useNavigate } from "react-router";

const PromotionsPage = () =>{
    const {Server, Promotions, FinalPrice} = useContext(ContextApi);
    const [promotions, setPromotions] = Promotions;
    const [finalPrice, setFinalPrice] = FinalPrice;
    const server = Server;
    const navigate = useNavigate();

    function redirect(){
        navigate("/checkout")
    }
    function activatePromotion(i:number){
        let arr = promotions;
        if(i===0){
            if(arr[1]===false){
                arr[i] = true;
            }
        }
        if(i===1){
            if(arr[0]===false){
                arr[i] = true;
            }
        }
        if(i===2){
            arr[i]=true;
        }
        setPromotions((prev:Array<3>)=>[...prev])
    }
    function deactivatePromotion(i:number){
        let arr = promotions;
        arr[i] = false;
        setPromotions((prev:Array<3>)=>[...prev])
    }
    
    function calculate(finalPrice:number, promotions:Array<boolean>){
        let sum = finalPrice;
        if(promotions[0]===true && promotions[1]===true){
            return 0;
        }
        if(promotions[0]===true && promotions[1]===false && promotions[2]===false){
            return sum = sum * 0.95
        }
        if(promotions[0]===false && promotions[1]===true && promotions[2]===false){
            return sum = sum * 0.80
        }
        if(promotions[0]===true && promotions[1]===false && promotions[2]===true){
            return sum = (sum * 0.95 - 20)
        }
        if(promotions[0]===false && promotions[1]===true && promotions[2]===true){
            return sum = (sum * 0.80 - 20)
        }
        if(promotions[0]===false && promotions[1]===false && promotions[2]===true){
            return sum-=20
        }
        if(promotions[0]===false && promotions[1]===false && promotions[2]===true){
            return sum-=20
        }
        
    }
    useEffect(()=>{
        console.log(promotions)
    },[promotions])
    return (
        <div className={classes.mainBlock}>
            <Header/>
            <h1>Available Promotions</h1>
            <div className={classes.promotionBlock}>
                <div className={classes.promotion}>
                    <img src={`${server}/var/www/kodius/uploads/5procent.jpg`} alt="" />
                    <p>5% OFF coupon</p>
                    {promotions[0]===false ? 
                    <button onClick={()=>activatePromotion(0)}>Activate</button>:
                    <button onClick={()=>deactivatePromotion(0)}>Deactivate</button>}
                </div>
                <div className={classes.promotion}>
                    <img src={`${server}/var/www/kodius/uploads/20procent.gif`} alt="" />
                    <p>20% OFF coupon</p>
                    {promotions[1]===false ? 
                    <button onClick={()=>activatePromotion(1)}>Activate</button>:
                    <button onClick={()=>deactivatePromotion(1)}>Deactivate</button>}
                </div>
                <div className={classes.promotion}>
                    <img src={`${server}/var/www/kodius/uploads/20euro.png`} alt="" />
                    <p>20 Euro Coupon</p>
                    {promotions[2]===false ?
                    <button onClick={()=>activatePromotion(2)}>Activate</button>:
                    <button onClick={()=>deactivatePromotion(2)}>Deactivate</button>}
                </div>
            </div>
            <div className={classes.btnBlock}>
                <button onClick={redirect}>CHECKOUT</button>
            </div>
        </div>
    )
}

export default PromotionsPage;