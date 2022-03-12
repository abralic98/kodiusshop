
import React, {createContext, useState, useEffect, useRef} from "react"
import Axios from "axios";


export const ContextApi = createContext<any>({});

export const Storage = (props:any) =>{
    const server = "http://116.203.242.253:3004";
    const [cart, setCart] = useState<object[]>([]);
    const [finalPrice, setFinalPrice] = useState<number>(0);
    const [promotions, setPromotions] = useState<boolean[]>([false,false,false]);
    const [userInfoCheck, setUserInfoCheck] = useState<boolean[]>([]);
    const [email, setEmail] = useState<string>();
    const [adress, setAdress] = useState<string>();
    const [creditCard, setCreditCard] = useState<number>();

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
        Promotions:[promotions, setPromotions],
        UserInfoCheck:[userInfoCheck, setUserInfoCheck],
        Email:[email, setEmail],
        Adress:[adress, setAdress],
        CreditCard:[creditCard, setCreditCard]
    }

    return (
        <ContextApi.Provider value = {context}>
        {props.children}
        </ContextApi.Provider>
    )
}