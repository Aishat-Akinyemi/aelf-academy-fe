import React from 'react'
import About from '../components/About';
import Faq from '../components/Faq'

const Home = ({user}) => {
  return (
    <div>
      <About user={user}/>
      <Faq/>
    </div>
  )
}

export default Home
