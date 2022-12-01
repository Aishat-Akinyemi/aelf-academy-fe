import logo from './logo.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
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
import {Notification} from './components/Notification'
import { toast } from 'react-toastify';
import { NotificationSuccess } from './components/Notification';

import { login, getUserInfo, getAllCourses} from './utils/Aelf';

function App() {
  const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState();
  const [courses, setCourses] = useState([]);
  let navigate = useNavigate();

  const  loginUser = () => {
    try{
       toast(<NotificationSuccess text="Loading..."/>)
        login().then(
         async (res) => {
            if(res){
              setUserAddress(res);
              const user =  await getUserInfo(res);
              if(user){
                user.address = res;
                setUser(user);
                setCourses(await getAllCourses());
                navigate("/courses");
              }              
              else {
                setCourses(await getAllCourses());
                navigate("/account");
              }
            }
          },
          (err) => {
            console.log(err)
              alert(err.Message)
          })          
    } catch(e){ 
      console.log(e)       
    }
}


  const getUserDetails = async() => {
    try{
      const userInfo = await getUserInfo(userAddress);  
      if(userInfo){
        userInfo.address = userAddress;
        setUser(userInfo);           
        console.log(user);
      }            
      } catch(e){
      console.log(e) 
    }
  }


 
  return (
    <>
        <Notification/>
        <Header login={loginUser} user={user}/>
        <Routes>
            <Route path='/' element={<Home user={user}/>}/>
            <Route path='/courses' element={<Courses user={user}/>}/>
            <Route path='/course/:courseId' element={<Coursedetails/>}/>            
            <Route path='/quest/:courseId' element={<Quest user={user}/>}/>
            <Route path='/account' element={<Account user={user} getuser={getUserDetails}/>}/>
            <Route path='/entries/:courseId' element={<Submission user={user} />}/>
            {/* <Route path='/' element={}/> */}
            <Route path='*' element={<Home/>}/>
        </Routes>
        <Footer/>
    </>
  );
}

export default App;
