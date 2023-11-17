import { useState, useEffect } from 'react';
import styles from './trainai.module.css';
import { backendUrl } from '../config';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const TrainAI = () => {
    const navigate = useNavigate();
    const { subscriptionStatus, isLoading } = useUser();
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [posts, setPosts] = useState([]);
    const [recommendedMessage, setRecommendedMessage] = useState('');    

    useEffect(() => {
        if (isLoading) {
          return;
        }
      
       if(subscriptionStatus === null && !isLoading){
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

    useEffect(() => {
        if (subscriptionStatus === true) {
            const fetchRecommendedCount = async () => {
                const response = await fetch(`${backendUrl}/post-training-count`, {
                    credentials: 'include', // Important for sending cookies
                });
                const data = await response.json();  // Parse the JSON response
                setRecommendedMessage(data.message);  // Set the 'message' field from the JSON object
            };
      
            fetchRecommendedCount();
        }
    }, [subscriptionStatus]);
    
    if (subscriptionStatus === null) {
        return <p>Loading...</p>;
    }

    if (!subscriptionStatus) {
        navigate("/pricing");
    }      

    const contentChanged = (e) => {
        setContent(e.target.value);
    }

    const categoryChanged = (e) => {
        setCategory(e.target.value);
    }

    const nextPost = async (e) => {
        const items = [...posts];
        items.push({
            'post_content': content,
            'Category': category
        });
        setPosts([...items]);
        setContent("");
        setCategory("");
        //////////////////////////
        e.preventDefault();

        const postData = {
            post_content: content,
            category: category,
            };
        
        const response = await fetch(`${backendUrl}/add-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Important for sending cookies
            body: JSON.stringify(postData),
        });
        console.log(response);
    
        if (response.status === 200) {
            console.log("Post added successfully");
        
            // Refresh the recommended post count
            const postCountResponse = await fetch(`${backendUrl}/post-training-count`, {
                credentials: 'include',
            });
            const newMessageData = await postCountResponse.json();  // Parse as JSON
            setRecommendedMessage(newMessageData.message);  // Set the 'message' field from the JSON object
    
        } else {
            console.log("Failed to add post");
        }
    }

    const finish = async (e) => {
        if (content.length > 0) {
            nextPost(e);
        }
        console.log(posts);       
    }

    return (
        <div className={styles.page}>
            <div>
                <span className={styles.pagetitle}>Train AI</span>
            </div>
            <div>
                <span className={styles.pagesubtitle}>Behind the Scenes</span>
            </div>
            <div>
                <span>{recommendedMessage}</span>
            </div>
            <div>
                <textarea className={`form-control ${styles.textarea}`} id="post" rows="10"
                    placeholder="Insert Post" onChange={contentChanged} value={content} />
            </div>
            <div className={styles.buttons}>
                <div>
                    <select class="form-select" className={styles.classifyselect} onChange={categoryChanged} value={category}>
                        <option selected>Select Classify Post</option>
                        <option value="AI">AI</option>
                        <option value="Entrepreneurship">Entrepreneurship</option>
                        <option value="Finance">Finance</option>
                        <option value="Innovation">Innovation</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Management">Management</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Motivation and Self Improvement">Motivation and Self Improvement</option>
                        <option value="Networking">Networking</option>
                        <option value="Product">Product</option>
                        <option value="Sales">Sales</option>                        
                        <option value="Software">Software</option>
                        <option value="Startups">Startups</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Talent Acquisition">Talent Acquisition</option>
                    </select>
                </div>
                <div>
                    <button className={styles.nextpostfinishbutton} onClick={nextPost}>POST</button>
                    {/* <button className={styles.nextpostfinishbutton} onClick={finish}>FINISH</button> */}
                </div>                
            </div>
        </div>
    );
}

export default TrainAI;