import classes from "../styles/MobileSideBar.module.scss";
import logo from "../images/kodiuslogo.webp";
import {IoMdReturnLeft} from "react-icons/io";
import { useContext } from "react";
import { ContextApi } from "../storage/Context";
import { useNavigate } from "react-router";
const MobileSideBar = () =>{
    const {ToggleMobileBar, ToggleMainBlock} = useContext(ContextApi);
    const [toggleMobileBar, setToggleMobileBar] = ToggleMobileBar;
    const [toggleMainBlock, setToggleMainBlock] = ToggleMainBlock;
    const navigate = useNavigate();
    function removeBar(){
        setToggleMainBlock(true);
        setToggleMobileBar(false);
    }
    function redirect (i:number){
        if(i===0){
            navigate("/")
            removeBar();
        }
        if(i===1){
            navigate("/promotions");
            removeBar();
        }
        if(i===2){
            navigate("/checkout")
            removeBar();
        }
    }
    return (
        <div className={classes.mainBlock}>
            <img src={logo} alt="" />
            <div className={classes.list}>
                <p onClick={()=>redirect(0)}>Home</p>
                <p onClick={()=>redirect(1)}>Promotions</p>
                <p onClick={()=>redirect(2)}>Checkout</p>
                <IoMdReturnLeft onClick={removeBar} className={classes.icon}/>
            </div>
        </div>
    )
}
export default MobileSideBar;