import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../index.css';
const Home = () => {
  const [nameValue, setNameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, saveUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const newNameValue = e.target.value;

    setNameValue(newNameValue);
    if (newNameValue === '') setNameError('Name is required');
    else if (!/^[A-Z][a-z ]{3,}$/.test(newNameValue))
      setNameError(
        'Only letters and blanks are allowed and should be at least 5 of length',
      );
    else setNameError(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameError) {
      saveUser(nameValue);

      navigate('/pokedex');
    }
  };
  return (
    <div className="padre">
      <div className="img2">
        <img src="/pokedex.img" alt="Pokedex" />
      </div>
      <div className="text-center">
        <h1 className="text-red-500 text-center text-4xl font-bold">Hello Trainer!!</h1>
        <p>Type your name to start</p>
      </div>
      <div className="form">
        <form
          className="flex flex-row justify-center items-center mt-8 gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="shadow-md border border-black p-3 input1"
            value={nameValue}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-red-400 p-2 rounded hover:text-white hover:scale-90 hover:bg-red-700"
          >
            Start
          </button>
        </form>
        {nameError && <p className="text-red-500 text-center">{nameError}</p>}
        {user && <Navigate to="/pokedex" replace />}
      </div>

      <div className="img1 max-w-full">
        <img src={'./poke.img'} alt="" className="imge" />
      </div>
    </div>
  );
};

export default Home;
