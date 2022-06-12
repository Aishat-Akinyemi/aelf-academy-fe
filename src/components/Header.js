import React from 'react'
import logo from '../assets/img/logo.svg'
import { Button } from "react-bootstrap";

const Header = () => {
  return (
    <nav>
        <ul className="nav">
            <li className="nav-item">                
                <a className="nav-link active" href="#">
                    <img src={logo} 
                    style={{width: "88px", height:"44px"}}              
                     />
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Courses</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">FAQs</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Discord</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">English</a>
            </li>
            <li className="nav-item">
             <Button variant="outline-primary">Login with aelf</Button>
            </li>

        </ul>
  </nav>
  
  )
}

export default Header
