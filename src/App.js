import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <Header/>
      <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard/:email' element={<Dashboard/>}/>      
        </Routes>
      </Router>
      </AuthContextProvider>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
