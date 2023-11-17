import Home from '../home/home';
import Login from '../login/login';
import Platform from '../platform/platform';
import Pricing from '../pricing/pricing';
import Signup from '../signup/signup';
import TrainAI from '../trainai/trainai';
import Generate from '../generate/generate';
import Product from '../product/product';
import styles from './content.module.css';

const Content = ({ path }) => {
    console.log(path);
    return (
        <div className={styles.page}>
            {(() => {
                switch (path) {                                    
                case "platform":
                    return <Platform />
                case "signup":
                    return <Signup />                    
                case "login":
                        return <Login />
                case "trainai":
                        return <TrainAI />
                case "pricing":
                        return <Pricing />
                case "product":
                    return <Product />
                case "generate":
                    return <Generate />
                default:
                    return <Home/>
            }
            })()}
        </div>
    );
}

export default Content;