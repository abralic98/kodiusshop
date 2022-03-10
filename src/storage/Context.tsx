
import React, {createContext, useState, useEffect, useRef} from "react"
import Axios from "axios";


export const ContextApi = createContext<any>({});

export const Storage = (props:any) =>{
    const server = "http://116.203.242.253:3004";
    const [cart, setCart] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [promotions, setPromotions] = useState([false,false,false])
    const firstRender = useRef<boolean>(true);
    const [windowSize, setWindowSize] = useState<Object>({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(()=>{
        if(firstRender){
            firstRender.current=false;
        }else{
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
    },[])
    const context = {
        displaySize:[windowSize, setWindowSize],
        Server:server,
        Cart:[cart, setCart],
        FinalPrice:[finalPrice, setFinalPrice],
        Promotions:[promotions, setPromotions]
    }

    return (
        <ContextApi.Provider value = {context}>
        {props.children}
        </ContextApi.Provider>
    )
}