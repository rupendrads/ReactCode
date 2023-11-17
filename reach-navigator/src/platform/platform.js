import { useEffect } from "react";
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './platform.module.css';

const Platform = () => {
    const navigate = useNavigate();
    const { subscriptionStatus, isLoading } = useUser();
    

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
      
    }, [subscriptionStatus, isLoading, navigate]);

    if (subscriptionStatus === null) {
        return <p>Loading...</p>;
    }

    if (!subscriptionStatus) {
        navigate("/pricing");
    }

    return (
        <div className={styles.page}>
            <div>
                <span className={styles.pagetitle}>Platform</span>
            </div>
            <div>
                <span className={styles.pagesubtitle}>Where the Magic Happens</span>
            </div>
            <div>
                <div className={styles.cardrow}>
                    <div>
                        <div className={styles.cardtitlediv}>
                            <span className={styles.cardtitle}>CONNECT TO LINKEDIN</span>
                        </div>
                        <div>
                            <p className={styles.cardpara}>
                                Connect your linkedin account to<br/> 
                                your reach navigator account to<br/>
                                allow automatic posting
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.cardtitlediv}>
                            <a href="/trainai">
                                <span className={styles.cardtitle}>TRAIN AI</span>
                            </a>
                        </div>
                        <div>
                            <p className={styles.cardpara}>
                                Upload and classify 10-15 of your <br/>
                                own posts so that we can train the<br/>
                                AI on thewhat and how of your writing
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.cardtitlediv}>
                            <a href="/generate">
                                <span className={styles.cardtitle}>GENERATE</span>
                            </a>
                        </div>
                        <div>
                            <p className={styles.cardpara}>
                                Enter your parameters, let <br/>
                                the AI write you a batch of 10 posts<br/>
                                Select the one you like and autopost it
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.cardrow}>
                    <div>
                        <div className={styles.cardtitlediv}>
                            <span className={styles.cardtitle}>SCHEDULING</span>
                        </div>
                        <div>
                            <p className={styles.cardpara}>
                                Schedule when you auto upload your<br/>
                                Linkedin AI Posts<br/>
                                - Coming Soon
                            </p>
                        </div>
                    </div>
                    <div>
                    <div className={styles.cardtitlediv}>
                            <span className={styles.cardtitle}>REPOST AUTOMATION</span>
                        </div>
                        <div>
                            <p className={styles.cardpara}>
                                Auto Repost Linkedin Users' Posts in<br/>
                                Specified topics and categories<br/>
                                - Coming Soon
                            </p>
                        </div>
                    </div>
                    <div>
                    <div className={styles.cardtitlediv}>
                            <span className={styles.cardtitle}>CUSTOMER SUPPORT</span>
                        </div>
                        <div>
                            <p className={styles.cardpara}>
                                Premium Customer Support outs you in<br/>
                                Direct mobile support with both one of our<br/>
                                Executive Developers and with one of our<br/>
                                Account managers
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Platform;