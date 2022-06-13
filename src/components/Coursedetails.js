import React, { useState } from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import TableOfContent from './TableOfContent';

const Coursedetails = () => {
    const [course, setCourse] = useState({
        courseId:1,
        submissionReward: 50,
        toc: ["Installing Aelf", "Installing dependencies", "Installing Aelf Extension", "Difference Between Wallet extension and Aelf sdk", "Aelf-CLI"],
        title: 'AELF 101: Getting Started with AElf',
        introduction: "Lorem ipsum dolor sit amet consectetur adipisicing elit\n.Ducimus obcaecati est ratione magnam ea dolorum, tempora perspiciatis adipisci iure hic quisquam optio doloremque impedit vel officiis reiciendis itaque repellat! Excepturi.",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Massa fermentum venenatis consequat pharetra. A, odio elit, neque, massa id velit. Risus eleifend mi tincidunt ipsum, libero nunc, et tellus. Est ullamcorper fermentum aenean fermentum vulputate vel curabitur tristique. Cursus pellentesque quis sollicitudin mauris elit amet sit. Consectetur ullamcorper massa bibendum adipiscing in. Proin ac amet, aenean ornare tortor. Ut diam augue lectus orci ullamcorper massa. Convallis quam massa gravida vel.
        Pellentesque enim eu accumsan tincidunt sed cursus enim massa. Aenean bibendum tempus leo tortor, dictum aliquet tellus. Rutrum nam quisque sed at risus, varius. Ut odio tincidunt fames nec, in orci blandit ac sollicitudin. Consectetur convallis a, quis congue neque ac. Sit dictum in a sodales malesuada aliquet. Fermentum tellus urna at cras est. Nunc ac cursus commodo non pretium eu habitasse.
        Elementum elementum diam bibendum sit vestibulum nibh. \n Eget blandit ornare eleifend enim, justo pulvinar duis. Rhoncus id nunc enim tellus quis sagittis diam libero elit. Suspendisse morbi eget eget eget ut viverra vitae. Tincidunt iaculis viverra adipiscing donec nunc posuere eget. Feugiat felis nulla eu est. Aliquet amet rhoncus congue tellus, risus enim pretium. Amet, tellus pharetra, in ornare. Ac in nunc, aliquam lacus urna risus mattis. Lacus, est nullam sed et.
        Tristique volutpat consequat eget porttitor sem. Pretium, habitasse porta donec elementum tortor odio sapien. Auctor diam magna pharetra bibendum vitae at ullamcorper mauris. Tortor sagittis cursus ultrices aliquam a massa egestas donec. Purus elementum, sapien ultrices habitant nascetur. Sagittis sit in dolor vestibulum luctus ut metus et feugiat. Porttitor nisl, lacus, sed sed vulputate. Aenean tristique nibh ullamcorper ut turpis. Bibendum eget volutpat justo, enim elementum, amet viverra enim tincidunt. Ac non nulla rhoncus, urna iaculis tempor. Erat gravida nunc lobortis scelerisque cras risus.
        Ornare quis ullamcorper diam, nisl. Egestas vel ultricies sit eget in tincidunt. Sagittis gravida semper est vitae, aliquet. Adipiscing tortor, rutrum nec in sapien semper sed hac. Sed scelerisque malesuada vulputate nisi bibendum pretium. Amet fermentum egestas nullam eu. Sed duis eu urna, vel nullam quam lacus. Adipiscing at arcu neque sit magna e.`,
        challengeDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iste repellat cumque soluta, corporis facilis culpa vel, ipsa quibusdam maiores a, illo eaque! Neque excepturi ipsum pariatur similique quod temporibus?
        Illum quibusdam quam numquam sed! Inventore molestiae sunt perspiciatis cupiditate maiores! Quisquam optio perspiciatis pariatur mollitia quas ipsum aut dicta ea reprehenderit saepe! Praesentium nemo aspernatur, numquam laudantium hic nobis.`
    });
    const [newLineText, setNewLineText] = useState(NewLineText(course.content));
    // const [newLineText, setNewLineText] = useState(() => () => NewLineText(course.content));
    function NewLineText(text) {        
        return text.split('\n').map((str, i) => <p key={i}>{str}</p>);         
    };

  return (
        <div className='container mm'>
            <header>
                <h2>{course.title}</h2>
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
                        <p style={{width :"max-content"}}>Well done! You’ve completed the course {course.title}. Take the challenge to earn {course.submissionReward} ELF</p>
                        <Button variant="outline-primary"  className="mt-3 align-self-end" style={{width :"max-content"}}>Attempt Challenge</Button>
                    </div>
                </Col>
            </Row>
        </div>
    
  )
}

export default Coursedetails
