import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';

function Home() {
  return (
    <></>
  )
}

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="register-course" element={<CourseForm />}></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
