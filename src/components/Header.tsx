
import classes from "../styles/Header.module.scss";
import logo from "../images/kodiuslogo.webp";
import {BsCart4} from "react-icons/bs";
import {FiMenu} from "react-icons/fi"
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ContextApi } from "../storage/Context";
const Header = () =>{

    const {FinalPrice, WindowSize, ToggleMobileBar} = useContext(ContextApi);
    const [finalPrice, setFinalPrice] = FinalPrice;
    const [windowSize, setWindowSize] = WindowSize;
    const [toggleMobileBar, setToggleMobileBar] = ToggleMobileBar;
    
    const navigate = useNavigate();
    function redirect(i:number){
        if(i===0){
            navigate("/")
        }
        if(i===1){
            navigate("/promotions")
        }
        if(i===2){
            navigate("/checkout")
        }
    }
    function getSideBar(){
        setToggleMobileBar(true);
    }
    return (
        <div className={classes.mainBlock}>
            {windowSize.width>=1000 ? 
            <div className={classes.header}>
                <div className={classes.logoBlock}>
                    <img src={logo} alt="" />        
                </div>
                <div className={classes.navBlock}>
                    <p onClick={()=>redirect(0)}>Home</p>
                    <p onClick={()=>redirect(1)}>Promotions</p>
                    <p onClick={()=>redirect(2)}>Checkout</p>
                </div>
                <div className={classes.checkoutBar}>
                    <p>{Math.round(finalPrice * 100) / 100}$</p>
                    <BsCart4 className={classes.icon}/>
                </div>
            </div> : 
            <div className={classes.header}>
                <FiMenu onClick={getSideBar} className={classes.menuBar}/>
                <div className={classes.logoBlock}>
                    <img src={logo} alt="" />        
                </div>
                <div className={classes.checkoutBar}>
                    <p>{Math.round(finalPrice * 100) / 100}$</p>
                    <BsCart4 className={classes.icon}/>
                </div>
            </div>}
        </div>
    )
}

export default Header;