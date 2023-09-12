// EditUser.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import "./AddUser.css";

const EditUser = ({ user, onUpdateUser }: any) => {
  const [editedUser, setEditedUser] = useState({ ...user });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
        editedUser
      );
      onUpdateUser(response.data);
      setIsLoading(true);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <h3>Users</h3>
      {isLoading ? (
        <div>Loading...</div> // Show loader when isLoading is true
      ) : (
        <div className="add-user">
          <form onSubmit={handleSubmit}>
            <div className="label-input">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="label-input">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="label-input">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="label-input">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="label-input">
              <label>Website:</label>
              <input
                type="text"
                name="website"
                value={editedUser.website}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Update User</button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditUser;
