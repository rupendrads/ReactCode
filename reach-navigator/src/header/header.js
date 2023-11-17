import styles from './header.module.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../config';
import { useUser } from '../UserContext';

const Header = () => {
    const navigate = useNavigate();  
    const { subscriptionStatus } = useUser();
    const [showLogout, setShowLogout] = useState(false);

    useEffect(() => {
        if (subscriptionStatus === true) {
            setShowLogout(true);
        } else {
            setShowLogout(false);
        }
            
    },[subscriptionStatus]);

    const loginClick = () => {
        navigate('/login');
    } 

    const signupClick = () => {
        navigate('/signup');
    } 

    const handleLogout = async () => {
        const response = await fetch(`${backendUrl}/logout`, {
          method: 'POST',
          credentials: 'include', // Important for sending cookies
        });
      
        if (response.status === 200) {
          // Successfully logged out
            navigate("/"); // Navigate to login or home page
            setShowLogout(false);
        } else {
          // Handle logout failure
          console.error("Failed to logout");
        }
      };

    return (
        <div className={styles.page}>
            <nav className="navbar navbar-expand-lg bg-light" style={{ border: "1px solid #ededed"}}>
                <div className="container-fluid" style={{justifyContent:'flex-start'}}>
                    <div>
                        <a className="navbar-brand" href="#">
                            <img src="Reach_Navigator_Logo.png" height="70px"/>
                        </a> 
                    </div>
                    <div className={styles.linksnbuttons}>
                        <div>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">HOME</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" href="/platform">PLATFORM</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" href="/product">PRODUCT</a>
                                </li>
                                <li className="nav-item">
                                <a className="nav-link" href="/pricing">PRICING</a>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.buttons}>                            
                            { (showLogout === true ) &&
                              <button className={styles.loginbutton} onClick={handleLogout}>LOG OUT</button>
                            }
                            <button className={styles.signupbutton} onClick={signupClick}>SIGN UP</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;