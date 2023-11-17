import styles from './login.module.css';

const Login = () => {
    return (
        <div className={styles.page}>
            <div className={styles.form}>                
                <div className="form.group">
                    <label for="email">E-mail</label>
                    <input type="text" class="form-control" id="email" />
                </div>
                <div className="form.group">
                    <label for="pass">password</label>
                    <input type="password" class="form-control" id="pass" />
                </div>
            </div>
            <div className={styles.logindiv}>
                <button className={styles.loginbutton}>LOG IN</button>
            </div>
        </div>
    );
}

export default Login;