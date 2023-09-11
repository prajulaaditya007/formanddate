// AddUser.tsx
import { useState } from "react";
import axios from "axios";
import "./AddUser.css";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const AddUser = ({ onUserAdded }: any) => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, user);
      onUserAdded(response.data);
      setUser({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="add-user">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="label-input">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="label-input">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="label-input">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="label-input">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="label-input">
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={user.website}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
