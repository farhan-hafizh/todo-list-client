import React from 'react';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  return (
    <div className="home-container flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your To-Do List!</h1>
      <p className="text-lg mb-8">This application helps you manage your tasks and stay organized.</p>
      <Button className="bg-blue-500 hover:bg-blue-700" text="Get Started" onClick={()=> navigate('/tasks')}/>
    </div>
  );
}

export default Home;
