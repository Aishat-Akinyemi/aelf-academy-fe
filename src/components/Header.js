import {useState} from 'react'
import logo from '../assets/img/logo.svg'
import { Button, Badge } from "react-bootstrap";
import {InitializeContract1, addLearner, getAcademyInfo, getAllCourses, getCourse, getResult} from '../utils/Aelf';
import {Link, useNavigate} from 'react-router-dom';

const Header = ({user}) => {
    const [userInfo, setUserInfo] = useState(user);
    let navigate = useNavigate();
//    const initContract = () => {
//         InitializeContract1();
//    }
    const getAInfo = async () => {
        try{
            console.log(await addLearner());  
        } catch(e){
            console.log(e);
            alert(e)
        }  
    }

  return (
    <nav className='nav-bar'>
        <ul className="nav">
            <li className="nav-item">                
                <Link className="nav-link active" to="/home">
                    <img src={logo} 
                    style={{width: "88px", height:"44px"}}              
                     />
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/home">FAQs</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="https://discord.gg/Xag6TAPcgh" target="_blank" rel="noopener noreferrer">Discord</a>
            </li>
            <li className="nav-item">
                <a className="nav-link btn" href="#">English</a>
            </li>
            <li className="nav-item">
             <Button variant="outline-primary" onClick={()=> {
                        // InitializeContract1();

                        navigate("/account");
                    }}
                >
                {userInfo.Username} 
                <Badge className='ms-2'>{userInfo.Reward}</Badge>
                </Button>
             {/* <Button variant="outline-primary" onClick={initContract}>Login with aelf</Button> */}
            </li>
            <li className="nav-item">
             <Button variant="outline-primary"
            //   onDoubleClick={addLearner}
            onClick ={getAInfo}
                >Create Account
                <Badge className='ms-2'>{userInfo.Reward}</Badge>
                </Button>
             {/* <Button variant="outline-primary" onClick={initContract}>Login with aelf</Button> */}
            </li>

        </ul>
  </nav>
  
  )
}

export default Header
