import React from 'react'
import About from '../components/About';
import Faq from '../components/Faq'

const Home = ({user, login}) => {
  return (
    <div>
      <About user={user} login={login}/>
      <Faq/>
    </div>
  )
}

export default Home
