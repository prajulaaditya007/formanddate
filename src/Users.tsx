// Users.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import AddUser from "./AddUsers";
import EditUser from "./EditUser"; // Import the EditUser component

const API_URL = "https://jsonplaceholder.typicode.com/users";

const Users = () => {
  const [users, setUsers]: any = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const addUserHandler = (newUser: any) => {
    setUsers((prevUsers: any) => [...prevUsers, newUser]);
  };

  const updateUserHandler = (updatedUser: any) => {
    setEditingUser(null);

    // Update the users list with the updated user
    setUsers((prevUsers: any) =>
      prevUsers.map((user: any) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const column = [
    // ... (existing columns definition)
    {
      name: "S No.",
      selector: (row: any) => row.id,
      sortable: true,
      width: "5rem",
    },
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row: any) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: any) => row.phone,
      sortable: true,
    },
    {
      name: "Website",
      selector: (row: any) => row.website,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div>
          <button onClick={() => setEditingUser(row)}>Edit</button>
        </div>
      ),
      width: "5rem",
      allowOverflow: true,
    },
  ];

  return (
    <div>
      <h1>Users</h1>
      {editingUser ? (
        <EditUser user={editingUser} onUpdateUser={updateUserHandler} />
      ) : null}
      <DataTable
        dense
        columns={column}
        data={users}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
      />
      <AddUser onUserAdded={addUserHandler} />
    </div>
  );
};

export default Users;
