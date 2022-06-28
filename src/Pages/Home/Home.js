import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Header from '../Header';

const Home = () => {
 
    return (
        <div>
            <Header></Header>
            <h2>home</h2>
        </div>
    );
};

export default Home;