
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer, Header } from './components'
import Road from './config/Road'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8081";
function App() {

  return (
   <BrowserRouter>
      <Routes>
        <Route path='*' element={<>
          <Header/>
          <Road/>
          <Footer/>
        </>}/>
      </Routes>
   </BrowserRouter>
  )
}

export default App
