import classes from "../styles/MobileSideBar.module.scss";
import logo from "../images/kodiuslogo.webp"
import {IoMdReturnLeft} from "react-icons/io"
import { useContext } from "react";
import { ContextApi } from "../storage/Context";
const MobileSideBar = () =>{
    const {MobileSideBar} = useContext(ContextApi);
    const [mobileSideBar, setMobileSideBar] = MobileSideBar;
    function removeBar(){
        setMobileSideBar(false);
    }
    return (
        <div className={classes.mainBlock}>
            <img src={logo} alt="" />
            <div className={classes.list}>
                <p>Home</p>
                <p>Promotions</p>
                <p>Checkout</p>
                <IoMdReturnLeft onClick={removeBar} className={classes.icon}/>
            </div>
        </div>
    )
}
export default MobileSideBar;