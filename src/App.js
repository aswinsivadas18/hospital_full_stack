
import AdminPanel from './Admin/AdminPanel';
import './App.css';
import Interface from './Components/Interface'
// import Login from './Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Interface/>} />
          {/* <Route path='/login' element={<Login />} /> */}
          <Route path='/Admin' element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

