import { useEffect } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './product.module.css';

const Product = () => {
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
            <div className={styles.main}>
                <div className={styles.row}>
                    <div>
                        <div className={styles.pagetitle}>
                            <span>PRODUCTS</span>
                        </div>
                        <div className={styles.pagedesc}>
                            <p>
                            Welcome to Reach Navigator, where innovation meets professionalism in the realm of 
                            LinkedIn automation. Our array of products is meticulously designed to transform your 
                            LinkedIn networking experience, offering you a seamless blend of technology and personal 
                            touch. Explore our services that revolutionize content creation and management.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.rightImageBoxDiv}>
                            <div className={styles.imageBox}>
                                <img src="product1.jpeg" height="150px" width="100%"/> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div>
                        <div className={styles.leftImageBoxDiv}>
                            <div className={styles.imageBox}>
                                <img src="product2.jpeg" height="150px" width="100%"/> 
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.producttitle}>
                            <span>GENERATION:</span>
                        </div>
                        <div className={styles.productdesc}>
                            <p>
                            Step into the future of content creation with our Generation service. Utilizing the 
                            revolutionary GPT-4 technology, this feature assists you in crafting posts that are not only 
                            engaging but also deeply resonant with your audience. Whether you are creating a thoughtleadership 
                            article or a quick update, our Generation service helps you maintain a dynamic 
                            and engaging LinkedIn profile. Tailored to your needs, this service is your gateway to a rich 
                            and varied content landscape, fostering connections and engagements seamlessly
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div>
                        <div className={styles.producttitle}>
                            <span>TRAIN AI:</span>
                        </div>
                        <div className={styles.productdesc}>
                            <p>
                            The Train AI feature at Reach Navigator is designed to be your personalized content 
                            assistant. By allowing you to upload and classify your own posts, it helps in creating a 
                            bespoke AI tool tailored to mirror your unique writing style and tone. This feature transforms 
                            your LinkedIn strategy, facilitating a personalized touch in every piece of content you create. 
                            Empower yourself with a tool that understands and adapts to your communication nuances, 
                            making the process of content creation intuitive and aligned with your personal brand.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.rightImageBoxDiv}>
                            <div className={styles.imageBox}>
                                <img src="product3.jpeg" height="200px" width="100%"/> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div>
                        <div className={styles.leftImageBoxDiv}>
                            <div className={styles.imageBox}>
                                <img src="product4.jpeg" height="200px" width="100%"/> 
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.producttitle}>
                            <span>REPOST AUTOMATION:</span>
                        </div>
                        <div className={styles.productdesc}>
                            <p>
                            Our Repost Automation service is Enhance your LinkedIn profile’s vibrancy and reach with our 
                            Repost Automation feature. This service is designed to automate the reposting of content from 
                            other LinkedIn users based on specified topics and categories. It not only helps in keeping your 
                            profile fresh and updated but also fosters a sense of community and engagement by sharing 
                            relevant content from your network. Dive into a hassle-free experience of maintaining an active 
                            profile that resonates with your audience, fostering connections and engagements effortlessly.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div>
                        <div className={styles.producttitle}>
                            <span>SCHEDULING:</span>
                        </div>
                        <div className={styles.productdesc}>
                            <p>
                            Maintaining a consistent online presence is now easier than ever with our Scheduling 
                            feature. This service allows you to plan and automate your post uploads, ensuring that your 
                            profile remains active and engaging. Bid goodbye to the hassles of last-minute content 
                            rushes and welcome a more structured and stress-free approach to content management. 
                            With this tool, you can effectively plan your content calendar, selecting optimal times for 
                            post uploads to ensure maximum engagement and visibility in the LinkedIn community.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div className={styles.rightImageBoxDiv}>
                            <div className={styles.imageBox}>
                                <img src="product5.jpeg" height="200px" width="100%"/> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
