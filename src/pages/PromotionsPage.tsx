import classes from "../styles/PromotionsPage.module.scss"
import Header from "../components/Header";
import { useContext, useEffect } from "react";
import { ContextApi } from "../storage/Context";
import { useNavigate } from "react-router";
import MobileSideBar from "../components/MobileSideBar";

const PromotionsPage = () =>{
    const {Server, Promotions, FinalPrice, UserInfoCheck, ToggleMobileBar, ToggleMainBlock} = useContext(ContextApi);
    const [promotions, setPromotions] = Promotions;
    const [finalPrice, setFinalPrice] = FinalPrice;
    const [userInfoCheck, setUserInfoCheck] = UserInfoCheck;
    const [toggleMobileBar, setToggleMobileBar] = ToggleMobileBar;
    const [toggleMainBlock, setToggleMainBlock] = ToggleMainBlock;
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
            if(arr[0]===false && arr[2]===false){
                arr[i] = true;
            }
        }
        if(i===2 && arr[1]===false){
            arr[i]=true;
        }
        setPromotions((prev:Array<3>)=>[...prev]);
        setUserInfoCheck((prev:boolean[])=>{
            prev[0] = false;
            prev[1] = false;
            prev[2] = false;
            return [...prev];
        })
    }
    function deactivatePromotion(i:number){
        let arr = promotions;
        arr[i] = false;
        setPromotions((prev:Array<3>)=>[...prev]);
        setUserInfoCheck((prev:boolean[])=>{
            prev[0] = false;
            prev[1] = false;
            prev[2] = false;
            return [...prev];
        })
    }
    
    return (
        <div className={classes.mainBlock}>
            {toggleMobileBar===true ? <MobileSideBar/>: null}
            {toggleMainBlock===true ? 
            <div>
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
            </div> : null}
        </div>
    )
}

export default PromotionsPage;