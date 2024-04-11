import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
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
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard/:email' element={<Dashboard/>}/>      
        </Routes>
      </Router>
      </AuthContextProvider>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
