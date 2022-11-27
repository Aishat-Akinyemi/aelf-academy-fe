import React, {useState, useEffect} from 'react'
import { Button, Stack,  Form, Card, ListGroup, Accordion, ToastContainer, Toast} from 'react-bootstrap';
import { submitChallenge, getLearnerSubmission, getCourseSubmission, moderateChallenge } from '../utils/Aelf';
import {useNavigate, useLocation} from 'react-router-dom';
import UserSubmission from '../components/UserSubmission';
import SubmissionItem from '../components/SubmissionItem';
import { NotificationSuccess, NotificationError } from '../components/Notification';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';


const Submission = ({user}) => {
    const location = useLocation();
    const course = location.state;    
    const [submissionList, setSubmissionList] = useState(); 
    const [userSubmissions, setUserSubmissions] = useState();
    const [loading, setLoading] = useState(false);

    const getSubmission = async () => { 
       if(user.role === 'Learner') { 
           try { 
                setLoading(true);
                const submission = await getLearnerSubmission(user.address);
                let sub = submission.submissions.find( e => e.courseId == course.courseId).submissions.list;             
                return sub;
            } catch (error) {
                console.log({ error });
            } finally {
                setLoading(false);
            }
       }
    }
    
    const getCourseSubmissionList = async () => {      
       try { 
            if(user.role !== "Learner"){
                const allSubmissions = await getCourseSubmission(course.courseId);
                let sub =  allSubmissions.userSubmissions;
                return sub;
        }
        } catch (error) {
            console.log({ error });
        } finally {
            setLoading(false);
        }
    }

   const moderate = (learnerId, isApproved) => {
        try{
            setLoading(true)
            toast(<NotificationSuccess text={`${isApproved? 'Approving': 'Rejecting'} submission...`}/>) ;
            moderateChallenge({
                    courseId: course.courseId,
                    learnerId: learnerId,
                    isApproved: isApproved
                }).then(
                    (res) =>{
                        console.log("successfully moderated");
                        toast.success(<NotificationSuccess text={` Successfully ${isApproved? 'Approved': 'Rejected'} submission.`}/>) ;
                        getCourseSubmissionList();
                    },
                    (err) => {
                        console.log({err});
                        toast(<NotificationError text={err.message}/>) 
                    }
                )               
        } catch(e){
            console.log({e});
            toast(<NotificationError text={e.message}/>) 
        } finally {
            setLoading(false);
        }

    }

    const handleSubmission = async (value) => {
        setLoading(true);  
        if (!(value.startsWith('https://github.com/') || value.startsWith('https://gist.github.com/') || value.startsWith('www.github.com/'))) {
            setLoading(false);
            toast.error(<NotificationError text="Invalid Github url."/>);
            setLoading(false);
            return;
        }     
        const data = {
            courseId: course.courseId,
            submissionUrl: value
        };
        try {
           await (submitChallenge(data));
           toast(<NotificationSuccess text={`Submitted successfully`}/>) ;
           getSubmission();                       
          } catch(e){
            toast.error(<NotificationError text={e.Message}/>);
          } finally{
            setLoading(false);
          } 
    }

    
    useEffect(() => {     
        getSubmission().then(data => setSubmissionList(data));
        getCourseSubmissionList().then(data => setUserSubmissions(data));
    }, [submissionList, userSubmissions, handleSubmission]);  

  return (
    <div className='contain mm position-relative'>
            <header>
                <h2>{user.role === 'Learner' && `Your`} Submissions to Quest: {course.courseTitle}</h2>
                <Stack direction="horizontal" gap={4} className="my-4">
                  <div className="bg-light border p-1 sm-txt">Submission Reward: <span className='reward'>{course.submissionReward} ELF</span></div>
                  <div className="bg-light border p-1 sm-txt">Moderation Reward: <span className="reward">{course.moderationReward} ELF</span></div>
               </Stack>
            </header>
            <div className=''>
                {
                    user.role === 'Learner' 
                    ?
                    <>
                    {!loading?
                        (
                        <UserSubmission submissionList={submissionList} handleSubmission={handleSubmission}/>
                        ):
                        <Loader/>
                    }
                    </>

                    :<>
                       { <Card>
                                <Card.Header>
                                    { `${user.role === 'Chief Moderator'? 'Review': ''} Quest Submissions`} 
                                </Card.Header>
                                <Card.Body>
                                {!loading?
                                    (                                      
                                        <Accordion>
                                            { 
                                                userSubmissions ?
                                                <SubmissionItem submissions={userSubmissions} user={user} handleModeration={moderate}/>
                                                :
                                                <p>No submissions yet for this course</p>
                                            }
                                        </Accordion>
                                      ):
                                    <Loader/>
                                }
                                </Card.Body>
                        </Card>                         
                    }   

                    
                    </> 
                }
            </div>
            
            {/* <ToastContainer className="p-3" position='middle-center'>
                <Toast show={showSubmissionSuccess} onClose={() => setShowSubmissionSuccess(!showSubmissionSuccess)}>
                    <Toast.Header>                    
                    <strong className="me-auto"> Congrats on submitting your solution 🚀🚀 </strong>
                    </Toast.Header>
                    <Toast.Body>Successfully submitted solution to quest: {course.courseTitle}</Toast.Body>
                </Toast>

                <Toast show={showModerationSuccess} onClose={()=> setShowModerationSuccess(!showModerationSuccess)}>
                    <Toast.Header>                    
                    <strong className="me-auto">Great job on the review🙌</strong>
                    </Toast.Header>
                    <Toast.Body>Evaluation successfully Recorded</Toast.Body>
                </Toast>
            </ToastContainer> */}
            
    </div>
        
  )
}

export default Submission




