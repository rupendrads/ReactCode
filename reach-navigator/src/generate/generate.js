import { useState, useEffect } from 'react';
import { useUser } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './generate.module.css';
import { backendUrl } from '../config';

const Generate = () => {
    const navigate = useNavigate();
    const { subscriptionStatus, isLoading } = useUser();
    const [writingStyle, setWritingStyle] = useState("");
    const [professionalStyle, setProfessionalStyle] = useState(styles.styleoptionunselect);
    const [casualStyle, setCasualStyle] = useState(styles.styleoptionunselect);
    const [formalStyle, setFormalStyle] = useState(styles.styleoptionunselect);

    const [wordCount, setWordCount] = useState(0);
    const [fiftyStyle, setFiftyStyle] = useState(styles.wordcountoptionoff);
    const [hundredStyle, setHundredStyle] = useState(styles.wordcountoptionoff);
    const [oneFiftyStyle, setOneFiftyStyle] = useState(styles.wordcountoptionoff);
    const [twoHundredStyle, setTwoHundredStyle] = useState(styles.wordcountoptionoff);

    const [category, setCategory] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [categoryselect, setCategorySelect] = useState("");

    const [bulletPoints, setBulletPoints] = useState("• ");
    
    const [count, setCount] = useState(1);
    const [posts, setPosts] = useState(null);
    const [taskID, setTaskID] = useState(null);

    const [generating, setGenerating] = useState(false);

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

    const professionalOptionSelected = () => {
        setProfessionalStyle(styles.styleoptionselect);
        setCasualStyle(styles.styleoptionunselect);
        setFormalStyle(styles.styleoptionunselect);
        setWritingStyle("professional");
    }

    const casualOptionSelected = () => {
        setProfessionalStyle(styles.styleoptionunselect);
        setCasualStyle(styles.styleoptionselect);
        setFormalStyle(styles.styleoptionunselect);
        setWritingStyle("casual");
    }

    const formalOptionSelected = () => {
        setProfessionalStyle(styles.styleoptionunselect);
        setCasualStyle(styles.styleoptionunselect);
        setFormalStyle(styles.styleoptionselect);
        setWritingStyle("my style");
    }

    const fiftySelected = () => {
        setFiftyStyle(styles.wordcountoptionon);
        setHundredStyle(styles.wordcountoptionoff);
        setOneFiftyStyle(styles.wordcountoptionoff);
        setTwoHundredStyle(styles.wordcountoptionoff);
        setWordCount(50);
    }

    const hundredSelected = () => {
        setFiftyStyle(styles.wordcountoptionoff);
        setHundredStyle(styles.wordcountoptionon);
        setOneFiftyStyle(styles.wordcountoptionoff);
        setTwoHundredStyle(styles.wordcountoptionoff);
        setWordCount(100);
    }

    const onFiftySelected = () => {
        setFiftyStyle(styles.wordcountoptionoff);
        setHundredStyle(styles.wordcountoptionoff);
        setOneFiftyStyle(styles.wordcountoptionon);
        setTwoHundredStyle(styles.wordcountoptionoff);
        setWordCount(150);
    }

    const twoHundredSelected = () => {
        setFiftyStyle(styles.wordcountoptionoff);
        setHundredStyle(styles.wordcountoptionoff);
        setOneFiftyStyle(styles.wordcountoptionoff);
        setTwoHundredStyle(styles.wordcountoptionon);
        setWordCount(200);
    }

    const categoryInputChanged = (e) => {
        setCategoryInput(e.target.value);
        setCategory(e.target.value);
        setCategorySelect("");
    }

    const categorySelectChanged = (e) => {
        setCategorySelect(e.target.value);
        setCategory(e.target.value);
        setCategoryInput("");
    }

    const handleBulletPoints = (e) => {
        const { keyCode, target } = e;
      
        // If Enter is pressed, add a new bullet point on the next line.
        if (keyCode === 13) {
          e.preventDefault();  // prevent the default behavior of creating a new line
          const startPos = target.selectionStart;
          const endPos = target.selectionEnd;
          const value = target.value;
          
          // Insert a new line followed by a bullet point at the current cursor position.
          const newValue = `${value.substring(0, startPos)}\n• ${value.substring(endPos)}`;
          setBulletPoints(newValue);
        }
      
        // If the text area becomes empty, re-insert a bullet point.
        if (target.value === "") {
          setBulletPoints("• ");
        }
      };

    const generate = async () => {
        console.log(writingStyle);
        console.log(wordCount);
        console.log(category);
        console.log(bulletPoints);

        setGenerating(true);

        const bulletPointsArray = bulletPoints
        .split('\n')
        .map(s => s.substring(2))
        .filter(s => s.length > 0);

        const payload = {
        category,
        writingStyle,
        wordCount: parseInt(wordCount, 10),
        bulletPoints:bulletPointsArray
        };
    
        const response = await fetch(`${backendUrl}/generate-posts`, {
            
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          
          if (response.status === 200) {

            const data = await response.json();
            setTaskID(data.task_id);  // Save the task ID
            pollForCompletion(data.task_id);  // Start polling
          } else {
            console.error("Error generating posts");
          }
        }

    const nextPost = () => {
        if (count < 10) {
            setCount(count + 1);            
        }
    }

    const prevPost = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }

    const Post = async () => {
        // const json = { 'linkedin_post': 'Content', 'Writing_style': 'Formal', 'Category': 'Growth' };
        // console.log(json);

        const selectedPost = posts[`post_${count}`];
        console.log(selectedPost);
        
        const response = await fetch(`${backendUrl}/linkedin-post`, {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ linkedin_content: selectedPost,categorytype:category,writingStyle:writingStyle,wordcount:wordCount }),
        });
        
        if (response.status === 303) {
            const data = await response.json();
            if (data.redirectURL) {
            window.location.href = data.redirectURL;
            }
        } else {
            console.error('Error sending post to LinkedIn');
        }
    };
    const pollForCompletion = (taskId) => {
        const intervalId = setInterval(async () => {
          const response = await fetch(`${backendUrl}/generated-posts/${taskId}`, {
            method: 'GET',
            credentials: 'include',
          });
          
          if (response.status === 200) {
            const data = await response.json();
            
            if (data.message !== 'still generating or invalid task_id') {
              clearInterval(intervalId);  // Stop the polling
              setPosts(data);  // Process the generated posts
              setGenerating(false);
            }
          } else {
            console.error("Error polling for task completion");
          }
        }, 5000);  // Poll every 5 seconds
      }
      
    return (
        <div className={styles.page}>
            <div>
                <span className={styles.pagetitle}>Generate</span>
            </div>
            <div>
                <span className={styles.pagesubtitle}>Behind the Scenes</span>
            </div>
            <div className={styles.generateinputdiv}>
                <div className={styles.generateinputrow}>
                    <div className={styles.generateinputlabeldiv}>
                        <div className={styles.generateinputlabel}>SELECT STYLE</div>
                    </div>
                    <div className={styles.styleoptiondiv}>
                        <div className={`${styles.styleoption} ${professionalStyle}`} onClick={professionalOptionSelected}>PROFESSIONAL</div>
                        <div className={`${styles.styleoption} ${casualStyle}`} onClick={casualOptionSelected}>CASUAL</div>
                        <div className={`${styles.styleoption} ${formalStyle}`} onClick={formalOptionSelected}>MY STYLE</div>
                    </div>
                </div>
                <div className={styles.generateinputrow}>
                    <div className={styles.generateinputlabeldiv}>
                        <div className={styles.generateinputlabel}>SELECT TOPIC</div>
                    </div>
                    <div className={styles.categoryinputdiv}>
                        <div className={styles.categorytextboxdiv}>
                            <input type="text" class="form-control" id="categoryinput" onChange={categoryInputChanged}/>
                        </div>
                        <div className={styles.categoryselectdiv}>
                            <select class="form-select" className={styles.categoryselect}
                                disabled={categoryInput.length > 0}
                                value={categoryselect}
                            onChange={categorySelectChanged}>
                                <option value="">Select Category</option>
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
                    </div>
                </div>
                <div className={styles.generateinputrow}>
                    <div className={styles.generateinputlabeldiv}>
                        <div className={styles.generateinputlabel}>SELECT LENGTH</div>
                    </div>
                    <div className={styles.wordcountoptiondiv}>
                        <div className={`${styles.wordcountoption} ${fiftyStyle}`} onClick={fiftySelected}>50</div>
                        <div className={`${styles.wordcountoption} ${hundredStyle}`} onClick={hundredSelected}>100</div>
                        <div className={`${styles.wordcountoption} ${oneFiftyStyle}`} onClick={onFiftySelected}>150</div>
                        <div className={`${styles.wordcountoption} ${twoHundredStyle}`} onClick={twoHundredSelected}>200</div>
                    </div>
                </div>
                <div className={styles.generateinputrow}>
                    <div className={styles.generateinputlabeldiv}>
                        <div className={styles.generateinputlabel}>BULLETS</div>
                    </div>
                    <div className={styles.bulletsinputdiv}>                        
                        <textarea
                            className={`form-control ${styles.textarea}`} id="bullets" rows="5"
                            value={bulletPoints}
                            onChange={(e) => setBulletPoints(e.target.value)}
                            onKeyDown={handleBulletPoints}                            
                        />
                    </div>
                </div>
                <div className={styles.generateinputrow}>
                    { generating === true &&
                        <div class="d-flex flex-grow-1 justify-content-end align-items-center" style={{width: '100%'}}>
                            <div class="d-flex">
                                <strong style={{marginRight: '20px'}}>Generating...</strong>
                                <div class="spinner-border" role="status">
                                    <span class="sr-only"></span>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={styles.generatebuttondiv}>
                        <div className={styles.generatebutton} onClick={generate}>
                            <span>GENERATE</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.postsdiv}>
                <div>
                    <textarea className={`form-control ${styles.textarea}`} id="post" rows="10" placeholder="Post" value={posts !== null ? posts["post_" + count]: "" } />
                </div>
                <div className={styles.postbuttonsdiv}>
                    <div>
                        <div className={styles.prevnextbutton} onClick={prevPost}>
                            <span>PREVIOUS</span>
                        </div>
                    </div>
                    <div>
                        <div className={styles.prevnextbutton} onClick={nextPost}>
                            <span>NEXT</span>
                        </div>
                    </div>
                    <div>
                        <div className={styles.postbutton} onClick={Post}>
                            <span>POST</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Generate;
