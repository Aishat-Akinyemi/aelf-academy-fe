import { Card, Button, Col } from 'react-bootstrap'
import Proptypes, { object } from 'prop-types';
import {PerformACall} from '../utils/Aelf'


const Course = ({ course}) => {
    const performAction = () => {
        PerformACall();
    }
  return (
    <Col>
        <Card className="course-card">
            <Card.Body className='ml-3 mt-3 mb-5'>
                <Card.Title className="course-header mb-3">{course.CourseTitle}</Card.Title>
                <Card.Subtitle className='d-flex justify-content-between course-details'>
                    <span 
                    className={` ${course.Level<=2 && "lt-beginner"} ${(course.Level > 2) && (course.Level <= 4) && "lt-intermediate"} ${(course.Level > 4) && "lt-advanced"}`}
                    > 
                    {course.Level<=2 && "Beginner"} {(course.Level > 2) && (course.Level <= 4) && "Intermediate"} {(course.Level > 4) && "Advanced"}</span>
                    <span>Level {course.Level}</span>
                    <span>{course.SubmissionReward} ELF</span>
                </Card.Subtitle>
                <Card.Text className='mt-3 mb-5 pr-3'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo sit a laborum odit natus velit. Placeat aut obcaecati molestiae fuga minus.
                </Card.Text>
                <Button variant="outline-primary"><span className='p-3' onClick={performAction}>Start Now</span></Button>  <a href="" className='sm-txt p-5'>Moderate submission</a>
            </Card.Body>
        </Card>
    </Col>
  )
}

// Course.propTypes = {
//     course : PropTypes.instanceOf(Object),
//     // Proptypes.object.isRequired
// };

export default Course


