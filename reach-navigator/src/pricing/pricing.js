import { useState, useEffect } from "react";
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './pricing.module.css';

const Pricing = () => {
    const { userid } = useUser();
    const navigate = useNavigate();
    const { subscriptionStatus, isLoading,fetchPermissions } = useUser();
    const [ExecutiveStyle, setExecutiveStyle] = useState(styles.unselectedcard);
    const [businessStyle, setBusinessStyle] = useState(styles.unselectedcard);
    const [EnterpriseStyle, setEnterpriseStyle] = useState(styles.unselectedcard);

    useEffect(() => {
        if (isLoading) {
            return;
        }
      
        if (subscriptionStatus === null && !isLoading) {
            navigate("/");
        }
        if (subscriptionStatus === false && !isLoading) {
            // Redirect to pricing page if subscription_status is false
            navigate("/pricing");
            // Redirect or show a message if the user doesn't have a subscription
            // You can decide what to do here based on your app's behavior
        }
        // Your additional logic here if needed
        // ...
      
    }, [subscriptionStatus, isLoading, navigate,fetchPermissions]);

    if (subscriptionStatus === null) {
        return <p>Loading...</p>;
    }

    if (!subscriptionStatus) {
        navigate("/pricing");
    }

    const ExecutiveCardSelected = () => {
        setExecutiveStyle(styles.selectedcard);
        setBusinessStyle(styles.unselectedcard);
        setEnterpriseStyle(styles.unselectedcard);
    }

    const businessCardSelected = () => {
        setBusinessStyle(styles.selectedcard);
        setExecutiveStyle(styles.unselectedcard);
        setEnterpriseStyle(styles.unselectedcard);
    }

    const EnterpriseCardSelected = () => {
        setEnterpriseStyle(styles.selectedcard);
        setExecutiveStyle(styles.unselectedcard);
        setBusinessStyle(styles.unselectedcard);
    }

    const getUrl = () => {
        let url = '';
        if (ExecutiveStyle === styles.selectedcard) {
            url = 'https://buy.stripe.com/14k8wM1aO0Tv5bOcMM';
        }
        if (businessStyle === styles.selectedcard) {
            url = 'https://buy.stripe.com/00g5kA3iW6dPdIk3cd';
        }
        if (EnterpriseStyle === styles.selectedcard) {
            url = 'https://buy.stripe.com/00g5kA1aOby90Vy6oq';
        }
        console.log(url);
        return url;
    }

    return (
        <div className={styles.page}>
            <div className={styles.cards} >
                <div className={ExecutiveStyle} onClick={ExecutiveCardSelected}>
                    <div className={styles.plantitle} >
                        <span>Executive</span>
                    </div>
                    <div className={styles.planimage}>
                         <img src="solo.jpeg" height="180px" width="80%"/> 
                        
                    </div>
                    <div className={styles.planprice}>
                        <span>$50 / month</span>
                    </div>
                    <div className={styles.planfeatures}>
                        <div className={styles.feature}>
                            <div>
                                <span>15 Posts</span>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.feature}>
                            <div>
                                <span>150 AI Post Ideas</span>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.feature}>
                            <div>
                                <span>24/7 Customer Support</span>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>                
                <div className={businessStyle} onClick={businessCardSelected}>
                    <div className={styles.plantitle}>
                        <span>Business</span>
                    </div>
                    <div className={styles.planimage}>
                        <img src="executive.jpeg" height="180px" width="80%"/>                    
                    </div>
                    <div className={styles.planprice}>
                        <span>$85 / month</span>
                    </div>
                    <div className={styles.planfeatures}>
                        <div className={styles.feature}>
                            <div>
                                <span>30 Posts</span>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.feature}>
                            <div>
                                <span>300 AI Post Ideas</span>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.feature}>
                            <div>
                                <span>Scheduling (Coming Soon)</span>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.feature}>
                            <div>
                                <span>24/7 Customer Support</span>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>                
                <div className={EnterpriseStyle} onClick={EnterpriseCardSelected}>
                    <div className={styles.plantitle}>
                        <span>Enterprise</span>
                    </div>
                    <div className={styles.planimage}>
                    <img src="business.jpeg" height="180px" width="80%"/>
                    </div>
                    <div className={styles.planprice}>
                        <span>$125 / month</span>
                    </div>
                    <div className={styles.planfeatures}>
                        <div className={styles.feature}>
                            <div>
                                <span>100 Posts</span>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.feature}>
                            <div>
                                <span>1000 AI Post Ideas</span>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.feature}>
                            <div>
                                <span>Scheduling (Coming Soon)</span>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.feature}>
                            <div>
                                <span>Repost Automation (Coming Soon)</span>
                            </div>
                            <div></div>
                        </div>
                        <div className={styles.feature}>
                            <div>
                                <span>24/7 Customer Support</span>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>                
            </div>
            <div className={styles.checkoutdiv}>
                <button className={styles.checkoutbutton}
                    disabled={(
                        (ExecutiveStyle === styles.selectedcard) ||
                        (businessStyle === styles.selectedcard) ||
                        (EnterpriseStyle === styles.selectedcard)) ? false : true}
                        onClick={() => window.location.href = `${getUrl()}?client_reference_id=${userid}`}>CHECK OUT</button>                  
            </div>
        </div>
    );    
}

export default Pricing;


