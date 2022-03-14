
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import MobileSideBar from "../components/MobileSideBar";
import classes from "../styles/HomePage.module.scss"
import { useContext, useEffect, useState} from "react";
import { ContextApi } from "../storage/Context";
const HomePage = () =>{
    const {ToggleMobileBar, ToggleMainBlock} = useContext(ContextApi);
    const [toggleMobileBar, setToggleMobileBar] = ToggleMobileBar;
    const [toggleMainBlock, setToggleMainBlock] = ToggleMainBlock
    useEffect(()=>{
        if(toggleMobileBar===true){
            setTimeout(()=>setToggleMainBlock(false),500)
        }
    },[toggleMobileBar])
    return (
        <div className={classes.mainBlock}>
            {toggleMobileBar===true ? 
            <MobileSideBar/> : null}
            {toggleMainBlock===true ? 
            <div>
                <Header/>
                <h1>Latest Items</h1>
                <ItemList/>
            </div>:null}
        </div>
    )
}

export default HomePage;