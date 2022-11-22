import { Button,Stack } from 'react-bootstrap';
import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

const Quest = ({user}) => {
    let navigate = useNavigate();
    const location = useLocation();
    const coursedetails = location.state;

  return (
        <div className='contain mm'>
            <header>
                <h2>Quest: {coursedetails.courseTitle}</h2>
                <Stack direction="horizontal" gap={4} className="my-4">
                  <div className="bg-light border p-1 sm-txt">Submission Reward: <span className='reward'>{coursedetails.submissionReward} ELF</span></div>
                  <div className="bg-light border p-1 sm-txt">Moderation Reward: <span className="reward">{coursedetails.moderationReward} ELF</span></div>
               </Stack>
            </header>
            <div className='content bg-secondary border my-4 p-5'>
                {coursedetails.challengeDescription}
            </div>
            <Stack direction="horizontal" gap={3} className="col-6 mx-auto justify-content-around"> 
                <Button variant="outline-primary"
                onClick={() => {
                  navigate(`/course/${coursedetails.courseId}`);
                  }}
                >Go back to Course</Button>
                <Button variant="primary"
                  onClick={() => {
                    navigate(`/entries/${coursedetails.courseId}`, {state: coursedetails});
                    }}
                >{user.role === 'Learner'? `Submit Entry`: `Review Entries`}</Button>
            </Stack>

        </div>
      )
}

export default Quest
