
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import MobileSideBar from "../components/MobileSideBar";
import classes from "../styles/HomePage.module.scss"
import { useContext } from "react";
import { ContextApi } from "../storage/Context";
const HomePage = () =>{
    const {ToggleMobileSideBar} = useContext(ContextApi);
    const [toggleMobileSideBar, setToggleMobileSideBar] = ToggleMobileSideBar;
    return (
        <div className={classes.mainBlock}>
            <Header/>
            
            <h1>Latest Items</h1>
            <ItemList/>
        </div>
    )
}

export default HomePage;