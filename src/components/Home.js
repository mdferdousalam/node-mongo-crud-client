import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const users = useLoaderData();
    const [displayUsers, setDisplauUsers] = useState(users)

    const handleDelete = user => {
        const agree = window.confirm(`Are you sure to delete: ${user.name}`)
        console.log(agree);
        if (agree) {

            console.log('Deleating with id: ', user._id)
            fetch(`http://localhost:5000/users/${user._id}`, {
                method: 'DELETE',
            }).then(res => res.json()).then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    alert('User Deleted successfully ')
                    const remainingUsers = displayUsers.filter(usr => usr._id !== user._id)
                    setDisplauUsers(remainingUsers)
                }
            })
        }
    }

    return (
        <div>
            <h2>Home</h2>
            <Link to="/users/add">Add User</Link>
            <h3>Users: {displayUsers.length}</h3>
            <div>
                {
                    displayUsers.map(user => <p key={user._id}>
                        {user.name}{user.address}{user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>
                                update
                            </button>
                        </Link>
                        <button onClick={() => handleDelete(user)}>X</button>
                    </p>)
                }
            </div>

        </div>
    );
};

export default Home;