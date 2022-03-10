
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import classes from "../styles/HomePage.module.scss"
const HomePage = () =>{
    return (
        <div className={classes.mainBlock}>
            <Header/>
            <h1>Latest Items</h1>
            <ItemList/>
        </div>
    )
}

export default HomePage;