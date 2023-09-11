import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

const MyTableComponent: React.FC = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow]: any = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date("9999-12-31"));

  useEffect(() => {
    // Simulate API response
    const apiResponse = [
      {
        name: "John Doe",
        email: "johndoe123@gmail.com",
        post: "developer",
        band: "29",
        startDate: "2023-09-23 00:00:00.0",
        endDate: "2023-09-28 00:00:00.0",
      },
      {
        name: "Jason Smith",
        email: "jasonsmith456@gmail.com",
        post: "tester",
        band: "28",
        startDate: "2023-09-30 00:00:00.0",
        endDate: "2023-10-28 00:00:00.0",
      },
    ];

    // Format dates and update the data
    const formattedData: any = apiResponse.map((item) => ({
      ...item,
      startDate: new Date(item.startDate).toLocaleDateString("en-US"),
      endDate: new Date(item.endDate).toLocaleDateString("en-US"),
    }));

    setData(formattedData);
  }, []);

  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "Post",
      selector: (row: any) => row.post,
      sortable: true,
    },
    {
      name: "Band",
      selector: (row: any) => row.band,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row: any) => row.startDate,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row: any) => row.endDate,
      sortable: true,
    },
  ];

  const handleRowClick = (row: any) => {
    setSelectedRow(row);
    setStartDate(new Date(row.startDate));
    setEndDate(new Date(row.endDate));
    // Open your modal here or show a date picker within your modal
  };

  function handleSave() {
    console.log(selectedRow);
  }

  function handleCancel() {
    setSelectedRow(null);
  }

  console.log("selected row", selectedRow);

  return (
    <div>
      <DataTable
        title="Employee Data"
        columns={columns}
        data={data}
        pagination
        onRowClicked={handleRowClick}
      />

      {/* Render your modal here or include date pickers */}
      {selectedRow && (
        <div className="modal">
          <h2>Edit Dates for {selectedRow.name}</h2>
          <div className="datepicker">
            <DatePicker
              className="startDate"
              selected={startDate}
              dateFormat={"MM/dd/yyyy"}
              onChange={(date: any) => setStartDate(date)}
              minDate={new Date()} // Rule 1: StartDate cannot be in the past
              maxDate={endDate} // Rule 3: EndDate cannot be less than StartDate
            />
            <DatePicker
              className="endDate"
              selected={endDate}
              dateFormat={"MM/dd/yyyy"}
              onChange={(date: any) => setEndDate(date)}
              minDate={startDate} // Rule 3: EndDate cannot be less than StartDate
              maxDate={new Date("9999-12-31")} // Rule 4: Calendar starts from MINIMUM DATE
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MyTableComponent;
