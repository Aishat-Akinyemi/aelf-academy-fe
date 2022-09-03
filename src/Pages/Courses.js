import Course from "../components/Course";
import Loader from "../components/Loader";
import { Row, Button } from 'react-bootstrap';
import { useState, useEffect, useCallback } from "react";

import { getAllCourses} from '../utils/Aelf';
import { fetchDataFromIpfs } from "../utils/Ipfs";

const Courses = ({user}) => {
    const getCourses =  async () => {
        getAllCourses().then(
            (rawData)=>{
                const coursesList = [];
                rawData.map(course => {
                    if(course.courseId==='1'){
                        //correct error I committed during testing, TODO remember to remove after deploying a new contract
                        course.contenturl = 'https://ipfs.io/ipfs/QmWeN3ttqoXJCPttynVBpZa3QE1e5TR9wuFqjPH6K99cSU';
                    }
                    fetchDataFromIpfs(course.contenturl).then(
                        (res) => {
                            const finalCourseObj= {
                                courseId : course.courseId,
                                submissionReward: course.submissionReward,
                                moderationReward: course.moderationReward,
                                level: course.level,
                                introduction: res.data.introduction,
                                toc: res.data.toc,
                                challengeDescription: res.data.challengeDescription,
                                content: res.data.challengeDescription,
                                courseTitle: course.courseTitle ,
                              }  
                              if(course.courseId ==='3'){
                                finalCourseObj.introduction = 'This course aims to help you setup your local system for smartcontract development on Aelf blockchain protocol.';
                              } 
                              return finalCourseObj;
                        })
                    .then(result => {
                        coursesList.push(result);
                        return result;
                    })
                    return coursesList;
                    
                })
              
            },
            (error) => {
                alert(error.Message);
                setLoading(false);
            }); 
    }
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);    
   
   
    useEffect(() => {
        setLoading(true);
        getCourses().then(data => setCourses(data));
        setLoading(false);
      }, [courses]);
    
  return (
    <div>
        <div className='courses-container'>
            <header className="courses-header mb-0">
                <h2 className="courses-page-title">About  Aelf academy courses</h2>
                <p> Enrol in self-paced courses that teach development on Aelf blockchain in various levels from beginner to intermediate and advanced.</p>
                {/* <Button variant="outline-primary"
                    onClick={forceUpdate}
                
                >View All Courses</Button>  */}
            </header>
            {!loading ?
                (<>
                    {courses ?
                        <div className="mlm mrm mbm pb-5">
                            <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
                                    {
                                        // courses.filter((course) => course.isActive===true)
                                        //     .map((course) => (
                                        //         <Course key={course.courseId} course={course} user={user}/>
                                        //     ))
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
// const Courses = ({user}) => {
//     const [courses, setCourses] = useState([]);
//     const [loading, setLoading] = useState(false);    
//     const [, updateState] = useState();
//     const getCourses = useCallback(() => {
//         setLoading(true);
//         getAllCourses().then(
//             (rawData)=>{
//                 const coursesList = [];
//                 rawData.map(course => {
//                     if(course.courseId==='1'){
//                         //correct error I committed during testing, TODO remember to remove after deploying a new contract
//                         course.contenturl = 'https://ipfs.io/ipfs/QmWeN3ttqoXJCPttynVBpZa3QE1e5TR9wuFqjPH6K99cSU';
//                     }
//                     fetchDataFromIpfs(course.contenturl).then(
//                         (res) => {
//                             const finalCourseObj= {
//                                 courseId : course.courseId,
//                                 submissionReward: course.submissionReward,
//                                 moderationReward: course.moderationReward,
//                                 level: course.level,
//                                 introduction: res.data.introduction,
//                                 toc: res.data.toc,
//                                 challengeDescription: res.data.challengeDescription,
//                                 content: res.data.challengeDescription,
//                                 courseTitle: course.courseTitle ,
//                               }  
//                               if(course.courseId ==='3'){
//                                 finalCourseObj.introduction = 'This course aims to help you setup your local system for smartcontract development on Aelf blockchain protocol.';
//                               } 
//                               return finalCourseObj;
//                         })
//                     .then(result => {
//                         coursesList.push(result);
//                         return result;
//                     })
//                     setCourses(coursesList);
//                     setLoading(false);
//                 })
              
//             },
//             (error) => {
//                 alert(error.Message);
//                 setLoading(false);
//             });    
//     });
//     const forceUpdate = useCallback(() => updateState({}), []);
//     useEffect(() => {
//         getCourses();
//       }, []);
    
//   return (
//     <div>
//         <div className='courses-container'>
//             <header className="courses-header mb-0">
//                 <h2 className="courses-page-title">About  Aelf academy courses</h2>
//                 <p> Enrol in self-paced courses that teach development on Aelf blockchain in various levels from beginner to intermediate and advanced.</p>
//                 <Button variant="outline-primary"
//                     onClick={forceUpdate}
                
//                 >View All Courses</Button> 
//             </header>
//             {!loading ?
//                 (<>
//                     {courses ?
//                         <div className="mlm mrm mbm pb-5">
//                             <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
//                                     {
//                                         // courses.filter((course) => course.isActive===true)
//                                         //     .map((course) => (
//                                         //         <Course key={course.courseId} course={course} user={user}/>
//                                         //     ))
//                                         courses.map((course) => (
//                                                 <Course key={course.courseId} course={course} user={user}/>
//                                         ))
//                                     }
//                                 </Row>
//                         </div>
//                         : <div className="mlm mrm mbm pb-5"><p>No courses Yet</p></div>
//                         }
//                     </>):
//                      (<Loader/>)
//                     }
                

            
        
//         </div>
//     </div>
//   )
// }

export default Courses


