import React, { useState } from 'react';

const AccountCreation = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const validateInputs = () => {
    const regex = /^[a-zA-Z0-9\s]+$/;

    if (!name.trim() || !password.trim()) {
      alert('Please fill in all fields.');
      return false;
    }

    if (!regex.test(name)) {
      alert('Please use only letters and numbers in the Name field.');
      return false;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return false;
    }

    return true;
  };

  const signup = async () => {
    try {
      if (validateInputs()) {
        alert('Creating account...');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a 2-second delay
        alert('Account created successfully!');
      }
    } catch (error) {
      alert(`Error during account creation: ${error.message}`);
    }
  };

  return (
    <div className='flex justify-center items-center h-[80vh] bg-gray-800'>
      <div className='bg-gradient-to-r from-purple-800 to-indigo-800 px-10 py-10 rounded-xl text-white'>
        <div>
          <h1 className='text-center text-3xl mb-6 font-bold'>Welcome! Create an Account</h1>
        </div>

        <div>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} name='name' className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-400 outline-none' placeholder='Username'
          />
        </div>
        <div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='bg-gray-700 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-400 outline-none' placeholder='Password'
          />
        </div>
        <div className='flex justify-center mt-6'>
          <button onClick={signup} className='bg-pink-500 w-full text-white font-bold px-6 py-3 rounded-lg hover:bg-pink-600 transition duration-300'>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCreation;
