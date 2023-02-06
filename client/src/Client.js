import logo from './logo.svg';
import './App.css';
import TestPage from './pages/TestPage';

function Client() {

  
  return (
    <div className="App">
      <div className="window border col-8 mx-auto mt-4"> 
        <TestPage/> 
      </div>
    </div>
  );
}

export default Client;
