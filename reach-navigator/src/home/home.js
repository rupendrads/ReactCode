import styles from './home.module.css';
import { backendUrl } from '../config';

const Home = () => {
    const handleLinkedInSignIn = async () => {        
        const response = await fetch(`${backendUrl}/signin`, {
            method: 'GET',
            credentials: 'include',
      
          });
          console.log(response)
      
          if (response.status === 303) {
            // Follow the redirect URL sent by the server
            const data = await response.json();
            console.log(data);
            if (data.redirectURL) {
              window.location.href = data.redirectURL;
            }
          }
      };

    return (
        <div className={styles.page}>
            <div>
                <div className={styles.topbox} onClick={handleLinkedInSignIn}>
                    <img src="TopBoxImage.png" alt="" height="420px"/>
                    {/* <div className={styles.topboxleft}>
                        <div className={styles.elevate}>
                            <span>Elevate</span>
                        </div>
                        <div className={styles.your}>
                            <span>YOUR</span>
                        </div>
                        <div className={styles.professional}>
                            <span>PROFESSIONAL</span>
                        </div>
                        <div className={styles.brand}>
                            <span>BRAND</span>
                        </div>
                        <div className={styles.fasterthanever}>
                            <span>FASTER THAN EVER</span>
                        </div>
                    </div>
                    <div className={styles.topboxright}>
                        <div>
                            <div className={styles.connect}>
                                <span>CONNECT</span>
                            </div>
                            <div className={styles.connect} style={{paddingLeft:"50px"}}>
                                <span>YOUR</span>
                            </div>
                            <div className={styles.connect} style={{paddingLeft:"100px"}}>
                                <span>LINKEDIN</span>
                            </div>
                        </div>
                        <div className={styles.linkedinImage}>
                            <img src="connectlknd.png" height="250px" alt=""/>
                        </div>
                    </div>                     */}
                    {/* <h1>Connect to LinkedIn</h1> */}                    
                </div>
                <div className={styles.abouttitlediv}>
                    <div className={styles.abouttitle}>
                        <span>Navigating You to Success with AI-Powered Linked Automation</span>
                    </div>
                    <div className={styles.abouttitledesc}>
                        <p>
                            At Reach Navigator, we are revolutionizing the way professionals 
                            connect and communicate on LinkedIn. Leveraging the cutting edge GPT-4 technology, we empower individuals and businesses 
                            to enhance their LinkedIn presence, create engaging content, 
                            and foster meaningful connections, effortlessly.
                        </p>
                    </div>
                </div>
                <div className={styles.ourservicesdiv}>
                    <div className={styles.ourservicestitle}>
                        <span>Our Services</span>
                    </div>
                    <div className={styles.ourservicesrowone}>
                        <div className={styles.ourservicesrowonefirstdiv}>
                            <img src="ourservices1.jpeg" height="250px" width="100%"/>
                        </div>
                        <div className={styles.ourservicesrowoneseconddiv}>
                            <div className={styles.generationtitle}>
                                <span>GENERATION:</span>
                            </div>
                            <div className={styles.generationdesc}>
                                <p>
                                    Our Generation service is your personal 
                                    content assistant, helping you craft 
                                    compelling posts that resonate with 
                                    your audience. Utilize the power of 
                                    GPT-4 to create content that not only 
                                    engages but also builds a meaningful 
                                    connection with your LinkedIn network
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.ourservicesrowtwo}>
                        <div className={styles.ourservicesrowtwocolone}>
                            <div className={styles.generationtitle}>
                                <span>TRAIN AI:</span>
                            </div>
                            <div className={styles.generationdesc}>
                                <p>
                                    Our Train AI feature allows you to mold 
                                    the AI to understand and mimic your 
                                    unique writing style. By uploading and 
                                    classifying your posts, you create a 
                                    customized AI tool that understands the 
                                    nuances of your communication style, 
                                    making content creation a breeze
                                </p>
                            </div>
                            <div className={styles.ourservicesrowtwocolonebox}>
                                <img src="ourservices3.jpeg" height="100px" width="100%"/> 
                            </div>
                        </div>
                        <div className={styles.ourservicesrowtwocoltwo}>
                            <div className={styles.ourservicesrowtwocoltworowone}>
                                <div className={styles.ourservicesrowtwocoltworowonebox}>
                                    <img src="ourservices2.jpeg" height="100px" width="100%"/>
                                </div>
                            </div>
                            <div className={styles.ourservicesrowtwocoltworowtwo}>
                                <div className={styles.ourservicesrowtwocoltworowtwocol1}>
                                    <div className={styles.generationtitle}>
                                        <span>SCHEDULING:</span>
                                    </div>
                                    <div className={styles.generationdesc}>
                                        <p>
                                        With our Scheduling service, you can 
                                        automate your content uploads, 
                                        ensuring a consistent and professional 
                                        online presence. Plan your content 
                                        calendar effectively and let our tool 
                                        take care of posting at the optimal 
                                        times for maximum engagement.
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.ourservicesrowtwocoltworowtwocol2}>
                                    <div className={styles.ourservicesrowtwocoltworowtwocol2box}>
                                        <img src="ourservices1.jpeg" height="250px" width="100%"/>                                        
                                    </div>
                                </div>
                                <div className={styles.ourservicesrowtwocoltworowtwocol3}>                                    
                                    <div className={styles.generationtitle}>
                                        <span>REPOST AUTOMATION:</span>
                                    </div>
                                    <div className={styles.generationdesc}>
                                        <p>
                                        Our Repost Automation service is 
                                        designed to keep your profile active and 
                                        engaging by automatically reposting 
                                        content from other LinkedIn users based 
                                        on specified topics and categories. Stay 
                                        in the loop and maintain a vibrant 
                                        profile with minimal effort.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.aboutusrow}>
                    <div className={styles.aboutusdiv}>
                        <div className={styles.aboutustitle}>
                            <span>ABOUT US</span>
                        </div>
                        <div className={styles.aboutusdesc}>
                            <p>
                            Founded to revolutionize professional networking, Reach 
                            Navigator leverages AI technology to facilitate seamless 
                            and intelligent LinkedIn networking. Our dedicated team is 
                            committed to innovation, offering solutions that cater to 
                            the diverse needs of our clientele. Join us in navigating 
                            the future of professional connections
                            </p>
                        </div>
                    </div>
                    <div className={styles.aboutusquotediv}>
                        <div className={styles.aboutusquote}>
                            <p>
                                <q>
                                    Our goal as entrepreneurs has always been to build systems to save time and cost,
                                    Reach Navigator accomplishes both of these by helping you build your Personal Brand
                                    for a fraction of the resources
                                </q>
                            </p>
                            <p className={styles.aboutusquoteby}>
                            George Karpenko, Co-Founder Reach Navigator
                            </p>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;