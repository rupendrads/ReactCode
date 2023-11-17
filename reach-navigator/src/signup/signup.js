import styles from './signup.module.css';

const Signup = () => {
    return (
        <div className={styles.page}>
            <div className={styles.pagetitlediv}>
                <span className={styles.pagetitle}>Sign Up</span>
            </div>
            <div>
                <div className="form.group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" />
                </div>
                <div className="form.group">
                    <label for="email">E-mail</label>
                    <input type="text" class="form-control" id="email" />
                </div>
                <div className="form.group">
                    <label for="pass">password</label>
                    <input type="password" class="form-control" id="pass" />
                </div>
            </div>
            <div className={styles.signupdiv}>
                <button className={styles.signupbutton}>SIGN UP</button>
            </div>
        </div>
    );
}

export default Signup;