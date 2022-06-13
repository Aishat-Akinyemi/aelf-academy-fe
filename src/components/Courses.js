import Course from "./Course";
import { Row } from 'react-bootstrap'
import { useState } from "react";

const courseList =     [
        {
            CourseId : 1,
            SubmissionReward : 50,
            ModerationReward : 20,
            Level : 1,
            ContentUrl : '',
            IsActive : true,
            CourseTitle: 'AELF 101: Getting Started with AElf'
        },
        {
            CourseId : 2,
            SubmissionReward : 100,
            ModerationReward : 30,
            Level : 2,
            ContentUrl : '',
            IsActive : true,
            CourseTitle: 'AELF 201'
        },
        {
            CourseId : 3,
            SubmissionReward : 200,
            ModerationReward : 70,
            Level : 3,
            ContentUrl : '',
            IsActive : true,
            CourseTitle: 'AELF 301'
        },
        {
            CourseId : 4,
            SubmissionReward : 200,
            ModerationReward : 70,
            Level : 4,
            ContentUrl : '',
            IsActive : true,
            CourseTitle: 'AELF 401'
        },
        {
            CourseId : 5,
            SubmissionReward : 150,
            ModerationReward : 40,
            Level : 5,
            ContentUrl : '',
            IsActive : true,
            CourseTitle: 'AELF 501'
        },
        {
            CourseId : 6,
            SubmissionReward : 150,
            ModerationReward : 40,
            Level : 6,
            ContentUrl : '',
            IsActive : true,
            CourseTitle: 'AELF 601',
        }       
]


const Courses = () => {
    const [courses, setCourses] = useState(courseList);
  return (
    <div>
        <div className='courses-container'>
            <header className="courses-header mb-0">
                <h2 className="courses-page-title">About  Aelf academy courses</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ornare vitae venenatis ipsum, urna consectetur non. Auctor urna at vel sed tristique eget justo. Sem iaculis proin mi  </p>
            </header>

           <div className="mlm mrm mbm pb-5">
            <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                    {
                        courses.filter((course) => course.IsActive===true)
                            .map((course) => (
                                <Course key={course.CourseId} course={course} />
                            ))
                    }
                </Row>
           </div>

        
        </div>
    </div>
  )
}

export default Courses
