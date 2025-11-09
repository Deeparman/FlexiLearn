import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Info from '../components/Info'
import Review from '../components/Review'
import Courses from '../components/Courses'
import Footer from '../components/Footer'

const StudentHome = () => {
  return (
    <>
    <Navbar/>
    <Banner/>
    <Info/>
    <Review/>
    <Courses/>
    <Footer/>
    </>
  )
}

export default StudentHome