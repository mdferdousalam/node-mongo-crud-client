import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';




const Update = () => {
    const StoredUser = useLoaderData();
    const [user, setUser] = useState(StoredUser)

    const handleUpdateUser = (event) => {
        event.preventDefault();
        console.log(user);

        fetch(`http://localhost:5000/users/${StoredUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('user updated successfully')
                    console.log(data);

                }
            })

    }

    const handleInputChange = event => {
        event.preventDefault();
        const value = event.target.value;
        const field = event.target.name;

        const newUser = { ...user, }
        newUser[field] = value;
        setUser(newUser)
        console.log(user);

    }


    return (
        <div>
            <h2>Updating: {StoredUser.name}</h2>
            <form onSubmit={handleUpdateUser} >
                <input onChange={handleInputChange} defaultValue={StoredUser.name} type="text" name="name" required placeholder='Name' />
                <br />
                <input onChange={handleInputChange} defaultValue={StoredUser.address} type="text" name="address" required placeholder='Addres' />
                <br />
                <input onChange={handleInputChange} defaultValue={StoredUser.email} type="email" name="email" required placeholder="Email" />
                <br />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default Update;