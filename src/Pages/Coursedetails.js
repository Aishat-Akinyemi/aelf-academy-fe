import React, { useState, useEffect } from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import TableOfContent from '../components/TableOfContent';
import {useNavigate, useLocation, useParams } from 'react-router-dom';

const Coursedetails = () => {
    const location = useLocation();
    let navigate = useNavigate();
    // const {courseId } = useParams();
    const course = location.state;    
    const [newLineText, setNewLineText] = useState(NewLineText(course.content));
    function NewLineText(text) {             
        return text.split('\n').map((str, i) => <p key={i}>{str}</p>);         
    };
  return (
        <div className='contain mm'>
            <header>
                <h2>{course.courseTitle}</h2>
                <div>{course.introduction}</div>
            </header>
            <hr className='my-5'/>
            <Row>
                <Col className="pb-5">
                    <TableOfContent toc={course.toc}/>
                </Col>
                <Col md={8}>
                    <div className='course-content'>{newLineText}</div>
                    <hr className='my-5'/>
                    <div className="d-flex flex-column">
                        <p style={{width :"max-content"}}>Well done! You’ve completed {course.courseTitle} course. Take the challenge to earn {course.submissionReward} ELF</p>
                        <Button variant="outline-primary"  className="mt-3 align-self-end" style={{width :"max-content"}}
                            onClick={() => {
                                navigate(`/quest/${course.courseId}`, {state: course});
                            }}                        
                        >View Quest</Button>
                    </div>
                </Col>
            </Row>
        </div>
    
  )
}

export default Coursedetails
