import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function Client() {

  
  return (
    <div className="App">
      <div className="window border col-8 mx-auto mt-4  bg-light">
         
        {/* <LoginForm/>  */}
        <RegisterForm/>
      </div>
    </div>
  );
}

export default Client;
