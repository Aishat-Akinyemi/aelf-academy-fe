import React, {useState} from 'react';
import { Button, Stack,  Form, Card, ListGroup} from 'react-bootstrap';

const UserSubmission = ({submissionList, handleSubmission}) => {
    const [currentSubmissionInput, setCurrentSubmissionInput] = useState('');
    const handleChange = event => {
        event.preventDefault();
        let val = event.target.value.trim();
        setCurrentSubmissionInput(val);
      };

  return (
    <>                    
        {
        ((submissionList &&
        !submissionList[submissionList.length - 1].isApproved) || submissionList ==null) &&
        <Card border='primary' className='mb-5'>
            <Card.Header>
                Submit Solution
            </Card.Header>
            <Card.Body>
                <Stack direction="horizontal" gap={3}>
                    <Form.Control 
                        className="me-auto" 
                        placeholder="Enter link to the github repo or gist..." 
                        value={currentSubmissionInput}
                        onChange= {handleChange}
                    />
                    <Button variant="primary" disabled={currentSubmissionInput.length<10}
                        onClick={(e) => {
                            e.preventDefault();                            
                            handleSubmission(currentSubmissionInput);
                            setCurrentSubmissionInput('');
                            }}
                    >Submit</Button>
                </Stack>
            </Card.Body>
        </Card>
        }

        {
            submissionList &&
            <Card className=''>
                <Card.Header>
                    Previous Submissions
                </Card.Header>
                <Card.Body>
                <ListGroup variant="flush">{
                    submissionList &&
                    submissionList.map((s, i)=> (
                        <ListGroup.Item key={i} className='border p-3'>
                            <a href={s.submissionUrl} target="_blank" rel="noopener noreferrer">View Submission</a>                                                            
                        </ListGroup.Item>                        
                    )) 
                    }                        
                </ListGroup>
                </Card.Body>
            </Card>     
        }
</>
  )
}
export default UserSubmission
