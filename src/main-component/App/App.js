import React from 'react';
import AllRoute from '../router'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "../../contexts/authContext";
import GoogleTranslate from '../../components/GoogleTranslate/GoogleTranslate';


const App = () => { 

  return (
    <div className="App" id='scrool'>
          <AuthProvider>
            <AllRoute/>
            <ToastContainer/>
            <GoogleTranslate/>
          </AuthProvider>
    </div>
  );
}

export default App;