import React, { useState } from 'react';
import { Link } from 'react-router-dom';





const AddUser = () => {
    const [user, setUser] = useState({})

    const handleAddUser = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(data => {
            if (data.acknowledged) {
                event.target.reset()
                alert("User added sucessfully")
            }
        })
    }

    const handleInputBlur = event => {
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;
        console.log(value, field);
        const newUser = { ...user, }
        newUser[field] = value;
        setUser(newUser)

    }

    return (
        <div>
            <Link to="/">Home</Link>
            <h2>Please add User</h2>
            <form onSubmit={handleAddUser} >
                <input onChange={handleInputBlur} type="text" name="name" required placeholder='Name' />
                <br />
                <input onChange={handleInputBlur} type="text" name="address" required placeholder='Addres' />
                <br />
                <input onChange={handleInputBlur} type="email" name="email" required placeholder="Email" />
                <br />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;