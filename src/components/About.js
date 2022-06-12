import {Button} from 'react-bootstrap'
import displayImg from '../assets/img/person-programming.png'
import aelfLogo from '../assets/img/aelfLogo.png'

const About = () => {
  return (
    <div>
        <div className="about-academy d-flex">
            <div className="description">
                <h1>Learn.<span className='text-gradient'> Earn.</span><br/> Build.</h1>
                <p className='mt-4'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate minima sit veritatis ab, sequi at odio enim adipisci, repellendus quae ratione, eveniet corrupti perferendis distinctio nam dolore id soluta praesentium.</p>
                <Button className='mt-3'>Start Learning</Button>
            </div>
            <div >
                <img src={displayImg} alt="" className='about-cover-img flex-shrink-1' />
            </div>                
        </div>
        <div className="about-aelf d-flex justify-content-between mm">
            <div className="p-3">
                <img src={aelfLogo} alt="" className='aelf-logo' />
            </div>
            <div className="p-3">
                <h1>About Aelf Ecosystem</h1>
                <p className='mt-3'>lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum</p>
                <p>lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem </p>                   
                <Button className='mt-3 about-aelf-btn'>Start Learning</Button>
            </div>
        </div>
    </div>



  )
}

export default About
