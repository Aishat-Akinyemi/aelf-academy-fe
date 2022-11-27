import React, {useState, useEffect} from 'react'
import { Button, Stack,  Form, Card, Accordion} from 'react-bootstrap';
import { submitChallenge, getLearnerSubmission, getCourseSubmission, moderateChallenge } from '../utils/Aelf';
import {useNavigate, useLocation} from 'react-router-dom';
import UserSubmission from '../components/UserSubmission';


const SubmissionItem = ({user, submissions, handleModeration}) => {
  return (
    <div>
        {
            submissions.map((learner, i)=> ( 
                <Accordion.Item eventKey={i} key={i}>
                    <Accordion.Header>Learner: {learner.address}</Accordion.Header>
                        {
                            <Accordion.Body>
                                {
                                    learner.submissions.list.map((s, x) => (                                                                    
                                        <Card.Body key={x} className="d-flex"> 
                                            <a href={s.submissionUrl} target="_blank" rel="noopener noreferrer" className='me-auto bd-highlight'>View Submission</a> 
                                                                                                                       
                                            {
                                               ( 
                                                    (x== learner.submissions.list.length -1) &&(s.moderatedBy === null) && (user.role === 'Chief Moderator')) &&                                                                                    
                                                    <>
                                                        <Button variant="outline-danger" className='me-3'
                                                            onClick={(event)=> {
                                                                event.preventDefault();
                                                                handleModeration(learner.address, false);
                                                            }} 
                                                        >Reject</Button>
                                                        <Button variant="primary"
                                                             onClick={(event)=> {
                                                                event.preventDefault();
                                                                handleModeration(learner.address, true);
                                                            }}
                                                        >Approve</Button>                                                                                           
                                                    </>
                                            }
                                        </Card.Body>
                                ))
                                }
                            </Accordion.Body>
                        }
                    
                </Accordion.Item>
            ))
        }
    </div>
  )
}

export default SubmissionItem
