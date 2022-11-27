import React, {useState, useEffect} from 'react'
import { Button, Stack,  Form, Card,  Accordion, Badge, Modal, Spinner} from 'react-bootstrap';
import AddCourse from '../components/AddCourse'
import { useNavigate} from 'react-router-dom';
import { addLearner, addCourse, getLearnerSubmission, getAllCourses} from '../utils/Aelf';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { NotificationSuccess, NotificationError } from '../components/Notification';
import {uploadDataToIpfs} from '../utils/Ipfs';

const Account = ({user, getUser}) => {
    let navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(user);
    const [submissionList, setSubmissionList] = useState([]);
    const [courses, setCourses]  =useState([]);
    const [show, setShow] = useState(() => () => user!==null);
    const [username, setUsername] = useState(''); 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true); 
    const [loading, setLoading] = useState(false);   

    const addNewCourse = async (data) => {
        try {
            setLoading(true);
            toast(<NotificationSuccess text="Adding course..."/>)
            const ipfsUrl = await uploadDataToIpfs(data);
            const newCourseData = {
                            submissionReward: data.submissionReward,
                            moderationReward: data.moderationReward,
                            level : data.level,
                            contentUrl: ipfsUrl,
                            courseTitle : data.title,                    
            };
            await addCourse(newCourseData);          
            toast.success(<NotificationSuccess text="Course Added successfully"/>)
        } catch(e) {          
            console.log(e);
            toast.error(<NotificationError text={` Error adding course.  ${e}`}/>)            
        } finally {
            setLoading(false);
        }         
    }

    const handleAddLearner =  () => { 
        try{
            setLoading(true);
            toast(<NotificationSuccess text="Registering leaner..."/>)
            (addLearner(username)).then(
                (res) => {                                       
                    console.log(`added user from account, ${res}`);
                },
                (error) => {}
            ).catch(
                (err) => {
                    console.log(err)
                } 
            ).finally(
                () => {
                    getUser()
                    handleClose();                       
                    navigate("/home"); 
                }
            )            
          } catch(e){
            console.log(e) 
          }   
        
    }

    // const handleAddLearner =  async () => { 
    //     try{
    //         setLoading(true);
    //         toast(<NotificationSuccess text="Registering learner..."/>)
    //         await addLearner(username);

    //         (addLearner(username)).then(
    //             (res) => {                                       
    //                 console.log(`added user from account, ${res}`);
    //             },
    //             (error) => {}
    //         ).catch(
    //             (err) => {
    //                 console.log(err)
    //             } 
    //         ).finally(
    //             () => {
    //                 getUser()
    //                 handleClose();                       
    //                 navigate("/home"); 
    //             }
    //         )            
    //       } catch(e){
    //         console.log(e) 
    //       }  finally {
            
    //       } 
        
    // }

    const getSubmission = async () => {
            try { 
                 setLoading(true);
                 const submission = await getLearnerSubmission(user.address);     
                 setSubmissionList(submission.submissions);
             } catch (error) {
             } finally {
                 setLoading(false);
             }        
    }
    const getCourses = async () => {
        try {
            setLoading(true);
            const courses = await getAllCourses();
            setCourses(courses);
        } catch (error) {
        } finally {
             setLoading(false);
         } 
    }

    useEffect(() => {     
        getSubmission();  
        getCourses();      
    }, [user]); 


    return (
        <>
            { !loading ? (
            <div className='contain mm'>
                {
                    userInfo ?
                    <>
                        <header>
                            <h2 className="text-center m-5">Welcome, {userInfo.username}!</h2>
                        </header>
                        <div className=''>
                            {
                                userInfo.role === 'Learner' 
                                &&
                                <>
                                { <Card border='primary'>
                                            <Card.Header>
                                                Quests Submission History 
                                            </Card.Header>
                                            <Card.Body>                                              
                                                {
                                                  (submissionList.length >0 && courses.length>0) ?
                                                    <Accordion>
                                                         {
                                                            submissionList.map((courseSubmission, i) => ( 
                                                                <Accordion.Item eventKey={i} key={i}>
                                                                    <Accordion.Header className='d-flex'>
                                                                        <span className='me-auto bd-highlight'>Course: {courses.find(c => c.courseId == courseSubmission.courseId).courseTitle}</span>
                                                                        {courseSubmission.submissions.list[ courseSubmission.submissions.list.length - 1].isApproved 
                                                                            &&   <span className='sm-txt'>
                                                                                    <span className='me-3'> Moderated by <h5 className='in-line ms-3'><Badge bg="primary">{courseSubmission.submissions.list[courseSubmission.submissions.list.length - 1].moderatedBy}</Badge></h5> </span> 
                                                                                    <span> Reward<h5 className='in-line ms-3'><Badge bg="primary"> {courses.find(c => c.courseId === courseSubmission.courseId).submissionReward} </Badge></h5></span>
                                                                                </span>
                                                                        } 
                                                                    </Accordion.Header>
                                                                        {
                                                                            <Accordion.Body>
                                                                                {
                                                                                    courseSubmission.submissions.list.map((s, x) => (                                                                    
                                                                                        <Card.Body key={x} className="d-flex"> 
                                                                                            <a href={s.submissionUrl} target="_blank" rel="noopener noreferrer" className='me-auto bd-highlight'>View Submission</a>
                                                                                                                                                                                                                                
                                                                                            {
                                                                                                s.moderatedBy 
                                                                                                ? 
                                                                                                <span className='sm-txt'>
                                                                                                    <span className='me-3'>
                                                                                                        Moderated by {s.moderatedBy}
                                                                                                    </span>
                                                                                                    <span >
                                                                                                        {s.isApproved ? 'Quest Approved': 'Not Approved'}
                                                                                                    </span>                                                                                                        
                                                                                                </span>
                                                                                                : <span className='sm-txt'>Awaiting Review</span>  
                                                                                            
                                                                                            }
                                                                                        </Card.Body>
                                                                                ))
                                                                                }
                                                                            </Accordion.Body>
                                                                        }
                                                                    
                                                                </Accordion.Item>
                                                             ))
                                                            }
                                                    </Accordion>
                                                    : <div className="mlm mrm mbm pb-5"><p>You have not yet submitted any quests.</p></div>
                                                } 
                                            </Card.Body>
                                    </Card>
                                    
                                }   
                                </> 
                            }
                        </div>               

                        {userInfo.role === "Admin" && <AddCourse addCourse={addNewCourse}/>}
                    </>
                    :
                    // account creation modal
                    <>
                    <Modal 
                        size="sm"
                        show={show} 
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered                    
                    >
                        <Modal.Header>
                        <Modal.Title>Create Learner Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="userNameInput">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="enter preferred username"
                                onChange={e =>  setUsername(e.target.value)}
                                autoFocus
                            />
                            </Form.Group>                        
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" disabled={username.length<3} onClick={handleAddLearner}>
                            Join
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                }      
            </div>
            ) : (
               <>                
                <Loader/>
                <div className='empty-div'></div>
               </>
            )
            }
        </>   
      )
}

export default Account


