import { useContext } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../../context/userContext/apiCalls";
import { UserContext } from "../../context/userContext/UserContext";
import "./newUser.css";

export default function NewUser() {
    const [newUser, setNewUser] = useState({});

    const handleChange = (e) => {
        setNewUser((prev) => {
            return {
                ...prev, [e.target.name]: e.target.value
            }
        });
    };

    const { dispatch } = useContext(UserContext);

    const history = useHistory();

    const handleCreate = (e) => {
        e.preventDefault();
        createUser(newUser, dispatch);
        history.push("/users");
    };

    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>Username (required)</label>
                    <input
                        type="text"
                        placeholder="john"
                        name="username"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder="John"
                        name="name"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Last Name</label>
                    <input
                        type="text"
                        placeholder="Smith"
                        name="lastname"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Email (required)</label>
                    <input
                        type="email"
                        placeholder="john@gmail.com"
                        name="email"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Password (required)</label>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Phone</label>
                    <input
                        type="text"
                        placeholder="+1 123 456 78"
                        name="phone"
                        onChange={handleChange}
                    />
                </div>
                <div className="newUserItem">
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder="New York | USA"
                        name="address"
                        onChange={handleChange}
                    />
                </div>
                <button className="newUserButton" onClick={handleCreate}>
                    Create
                </button>
            </form>
        </div>
    );
}
