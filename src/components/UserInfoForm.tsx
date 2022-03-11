import classes from "../styles/UserInfoForm.module.scss"
const UserInfoForm = () =>{
    function handleSubmit(){

    }
    return (
        <div className={classes.mainBlock}>
            <div className={classes.formBlock}>
                <form onSubmit={handleSubmit}action="">
                    <p className={classes.title}>Register</p>
                    <div className={classes.inputBlock}>
                        <label htmlFor="">Username</label>
                        <input />
                    </div>
                    <div className={classes.inputBlock}>
                        <label htmlFor="">Email</label>
                        <input />
                    </div>
                    <div className={classes.inputBlock}>
                        <label htmlFor="">Password</label>
                        <input type="password" />
                    </div>
                    <div className={classes.inputBlock}>
                        <label htmlFor="">Steam32ID</label>
                        <input type="number" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserInfoForm;