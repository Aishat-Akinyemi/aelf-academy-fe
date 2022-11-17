import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Routes, Route, useNavigate} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './Pages/Home';
import Coursedetails from './Pages/Coursedetails';
import Courses from './Pages/Courses';
import Quest from './Pages/Quest';
import Account from './Pages/Account';
import Submission from './Pages/Submission'

import { login, getAcademyInfo, getUserInfo, addLearner, getAllCourses} from './utils/Aelf';

function App() {
  const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState();
  const [courses, setCourses] = useState([]);
  let navigate = useNavigate();

  const  loginUser = () => {
    try{
        login().then(
         async (res) => {
            if(res){
              setUserAddress(res);
              setUser(await getUserInfo(res));
              // //add useraddress to userINFO
              // let us_info = await getUserInfo(res);
              // us_info.address = res;
              // setUser(us_info);
              setCourses(await getAllCourses());
              navigate("/account");
            }
          },
          (err) => {
              alert(err.Message)
          })          
    } catch(e){ 
      console.log(e)       
    }
}
    const addNewLearner = (userName) => {    
      addLearner(userName).then(
        res => {
          console.log(`added `, res)
          setUser(res);
        }
      ).catch(e => {
        alert(e.Message);
      })    
  }
  
  const getUserDetails = async() => {
    try{
      const userInfo = await getUserInfo(userAddress);  
        setUser(userInfo);           
        console.log(user);    
      } catch(e){
      console.log(e) 
    }
  }
 
  return (
    <>
        <Header login={loginUser} user={user}/>
        <Routes>
            <Route path='/' element={<Home user={user}/>}/>
            <Route path='/courses' element={<Courses user={user}/>}/>
            <Route path='/course/:courseId' element={<Coursedetails/>}/>            
            <Route path='/quest/:courseId' element={<Quest user={user}/>}/>
            <Route path='/account' element={<Account user={user} getUser={getUserDetails}/>}/>
            <Route path='/entries/:courseId' element={<Submission user={user} userAddress={userAddress} />}/>
            {/* <Route path='/' element={}/> */}
            <Route path='*' element={<Home/>}/>
        </Routes>
        <Footer/>
    </>
  );
}

export default App;
