import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Faq from './components/Faq';
import Courses from './components/Courses'
import Coursedetails from './components/Coursedetails';
import Quest from './components/Quest'
import Submission from './components/Submission'
import Account from './components/Account'
import { useState } from 'react';

const userList = [
  {
    Username: 'chief_moderator1',
    Role: 'Chief Moderator',
    Level: null,
    Reward: 1000000000
  },
  {
    Username: 'admin1',
    Role: 'Admin',
    Level: null,
    Reward: 2000000000
  },
  {
    Username: 'Kate',
    Role: 'Learner',
    Level: 1,
    Reward: 50000000
  }
]

function App() {
  const [user, setUser] = useState(userList[0]);
  // NightElfCheck.getInstance();

  return (
    <div>
     <Header/>
     {/* <About/>
     <Faq/> */}
     {/* <Courses/> */}
     {/* <Coursedetails/> */}
     {/* <Quest/> */}
     {/* <Submission/> */}
     <Account/>
     <Footer/>
   
    </div>
  );
}

export default App;
