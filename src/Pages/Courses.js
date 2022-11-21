import Course from "../components/Course";
import Loader from "../components/Loader";
import { Row, Button } from 'react-bootstrap';
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";

import { getAllCourses} from '../utils/Aelf';

const Courses = ({user}) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false); 
    
    const getAndSetCourses = async () => {
        try{
            setLoading(true);
            const courses = await getAllCourses();
            setCourses(courses);
        } catch (error){
            console.log({ error });
        } finally {
            setLoading(false);
        }        
    }

     useEffect(() => {
        getAndSetCourses();
      }, []);

  return (
    <div>
        <div className='courses-container'>
            <header className="courses-header mb-0">
                <h2 className="courses-page-title">About  Aelf academy courses</h2>
                <p> Enrol in self-paced courses that teach development on Aelf blockchain in various levels from beginner to intermediate and advanced.</p>
              
            </header>
            {!loading ?
                (<>
                    {courses ?
                        <div className="mlm mrm mbm pb-5">
                            <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                                    {
                                        courses.map((course) => (
                                                <Course key={course.courseId} course={course} user={user}/>
                                        ))
                                    }
                                </Row>
                        </div>
                        : <div className="mlm mrm mbm pb-5"><p>No courses Yet</p></div>
                        }
                    </>):
                     (<Loader/>)
                    }
                

            
        
        </div>
    </div>
  )
}

export default Courses


