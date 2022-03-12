import classes from "../styles/UserInfoForm.module.scss"
import {useRef, useContext} from "react"; 
import { ContextApi } from "../storage/Context";
const UserInfoForm = () =>{
    const {UserInfoCheck, Email, Adress, CreditCard} = useContext(ContextApi);
    const [userInfoCheck, setUserInfoCheck] = UserInfoCheck;
    const [email, setEmail] = Email;
    const [adress, setAdress] = Adress;
    const [creditCard, setCreditCard] = CreditCard;
    const emailInputRef = useRef<HTMLInputElement>(null);
    const adressInputRef = useRef<HTMLInputElement>(null);
    const creditCardInputRef = useRef<HTMLInputElement>(null);
    function getColor(i:boolean){
        if(i===true){
            return "#1DB954";
        }
        if(i===false){
            return "red";
        }
    }
    function handleSubmit(e:any){
        e.preventDefault();
        if(emailInputRef.current!==null){
            if(emailInputRef.current.value!==""){
                setUserInfoCheck((prev:Array<boolean>)=>{
                    prev[0]=true;
                    return [...prev]
                })
            }else{
                setUserInfoCheck((prev:Array<boolean>)=>{
                    prev[0]=false;
                    return [...prev]
                })
                emailInputRef.current.value="";
            }
        }
        if(adressInputRef.current!==null){
            if(adressInputRef.current.value!==""){
                setUserInfoCheck((prev:Array<boolean>)=>{
                    prev[1]=true;
                    return [...prev]
                })
            }else{
                setUserInfoCheck((prev:Array<boolean>)=>{
                    prev[1]=false;
                    return [...prev]
                })
                adressInputRef.current.value="";
            }
        }
        if(creditCardInputRef.current!==null){
            if(creditCardInputRef.current.value!==""){
                setUserInfoCheck((prev:Array<boolean>)=>{
                    prev[2]=true;
                    return [...prev]
                })
            }else{
                setUserInfoCheck((prev:Array<boolean>)=>{
                    prev[2]=false;
                    return [...prev]
                })
                creditCardInputRef.current.value="";
            }
        }
    }
    return (
        <div className={classes.mainBlock}>
            <div className={classes.formBlock}>
                <form onSubmit={handleSubmit}action="">
                    <p className={classes.title}>Register</p>
                    <div className={classes.inputBlock}>
                        <label htmlFor="">Email</label>
                        <input onChange={(e)=>setEmail(e.target.value)} style={{borderColor:getColor(userInfoCheck[0])}}ref={emailInputRef}type="email" />
                    </div>
                    <div className={classes.inputBlock}>
                        <label htmlFor="">Adress</label>
                        <input onChange={(e)=>setAdress(e.target.value)} style={{borderColor:getColor(userInfoCheck[1])}} ref={adressInputRef}type="text" />
                    </div>
                    <div className={classes.inputBlock}>
                        <label htmlFor="">Credit Card Number</label>
                        <input onChange={(e)=>setCreditCard(e.target.value)} style={{borderColor:getColor(userInfoCheck[2])}} ref={creditCardInputRef} type="number" />
                    </div>
                    <button>Check</button>
                </form>
            </div>
        </div>
    )
}

export default UserInfoForm;