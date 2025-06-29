import React from 'react'
import ShowTrendingVideos from './components/ShowTrendingVideos'
import SelectRegion from './components/SelectRegion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      {/* <h1 className='text-blue-300'>hey</h1> */}
      {/* <ShowTrendingVideos></ShowTrendingVideos> */}
      {/* <SelectRegion></SelectRegion> */}
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<SelectRegion/>}></Route>
           <Route path='/trending' element={<ShowTrendingVideos/>}></Route> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
