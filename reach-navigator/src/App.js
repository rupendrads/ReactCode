import Header from './header/header';
import Content from './content/content';
import Footer from './footer/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';
import './App.css';

function App() {
  return (
    <div className="page">      
      <Router>
      <UserProvider>
          <Header />
          <div className="content">
          
            <Routes>
              <Route exact path='/' element={<Content path="" />}></Route>
              <Route exact path='/main' element={<Content path="pricing" />}></Route>
              <Route exact path='/platform' element={<Content path="platform" />}></Route>
              <Route exact path='/signup' element={<Content path="signup" />}></Route>
              <Route exact path='/login' element={<Content path="login" />}></Route>
              <Route exact path='/trainai' element={<Content path="trainai" />}></Route>
              <Route exact path='/pricing' element={<Content path="pricing" />}></Route>
              <Route exact path='/product' element={<Content path="product" />}></Route>
              <Route exact path='/generate' element={<Content path="generate" />}></Route>
            </Routes>        
          </div>
          <Footer />   
          </UserProvider>  
        </Router> 
    </div>
  );
}

export default App;
