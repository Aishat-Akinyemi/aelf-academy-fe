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


function App() {
  // NightElfCheck.getInstance();

  return (
    <div>
     <Header/>
     {/* <About/>
     <Faq/> */}
     <Courses/>
     {/* <Coursedetails/> */}
     {/* <Quest/> */}
     {/* Submission */}
     <Footer/>
   
    </div>
  );
}

export default App;
