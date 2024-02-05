
import React from 'react';
import './logon.css';

const Logon = () => {
    const [formData, setFormData] = useState({
        userN: '',
        passW: '',
      });
    
        const changes = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const login = (e) => {
    e.preventDefault();

    // Basic validation, you can add more complex validation logic here
    if (formData.userN.trim() === '' || formData.password.trim() === '') {
        alert('Please enter both username and password');
        return;
    }

    // Perform login or further processing here
    console.log('Login successful!', formData);
    };

  return (
    <div
        className='parent'
    >
    <form 
        className='logon-form'
        onSubmit={login}
    >
        <div>
            <label
                className='formField'
            >
                Username:
                <input 
                    type='text'
                    name='userN'
                    value={form.userName}
                    onChange={changes}
                />
            </label>
        </div>
        <div>
            <label
                className='formField'
            >
                Password:
                <input 
                    type='password'
                    name='passW'
                    value={form.passW}
                    onChange={changes}
                />
            </label>
        </div>
        <div>
            <button type='submit'>Submit</button>
        </div>
    </form>
    </div>
  );
};

export default Logon;