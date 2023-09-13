import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import { format, parse, isAfter } from "date-fns";

const MyTableComponent: React.FC = () => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date("9999-12-31"));
  const [updatedStartDate, setUpdatedStartDate] = useState<Date | null>(null);
  const [updatedEndDate, setUpdatedEndDate] = useState<Date | null>(null);

  useEffect(() => {
    // Simulate API response
    const apiResponse = [
      {
        name: "John Doe",
        email: "johndoe123@gmail.com",
        post: "developer",
        band: "29",
        startDate: "2023-09-23",
        endDate: "2023-09-28",
      },
      {
        name: "Jason Smith",
        email: "jasonsmith456@gmail.com",
        post: "tester",
        band: "28",
        startDate: "2023-09-30",
        endDate: "2023-10-28",
      },
    ];

    // Format dates and update the data
    const formattedData = apiResponse.map((item) => ({
      ...item,
      startDate: format(
        parse(item.startDate, "yyyy-MM-dd", new Date()),
        "MM/dd/yyyy"
      ),
      endDate: format(
        parse(item.endDate, "yyyy-MM-dd", new Date()),
        "MM/dd/yyyy"
      ),
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
    // Parse the selected row's dates using date-fns
    const parsedStartDate = parse(row.startDate, "MM/dd/yyyy", new Date());
    const parsedEndDate = parse(row.endDate, "MM/dd/yyyy", new Date());
    setStartDate(parsedStartDate);
    setEndDate(parsedEndDate);
    setUpdatedStartDate(parsedStartDate); // Initialize the updated dates
    setUpdatedEndDate(parsedEndDate);
  };

  function handleSave() {
    // Update the selected row's dates here and save the changes to your API
    // For demonstration purposes, we'll just log the selected row.
    console.log(selectedRow);
    setSelectedRow(null); // Close the modal after saving
    setUpdatedStartDate(startDate);
    setUpdatedEndDate(endDate);
  }

  function handleCancel() {
    setSelectedRow(null); // Close the modal without saving
  }

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
              dateFormat="MM/dd/yyyy"
              onChange={(date: Date) => setStartDate(date)}
              minDate={new Date()} // Rule 1: StartDate cannot be in the past
              // maxDate={endDate} // Rule 3: EndDate cannot be less than StartDate
            />
            <DatePicker
              className="endDate"
              selected={endDate}
              dateFormat="MM/dd/yyyy"
              onChange={(date: Date) => setEndDate(date)}
              minDate={startDate} // Rule 3: EndDate cannot be less than StartDate
              maxDate={parse("9999-12-31", "yyyy-MM-dd", new Date())} // Rule 4: Calendar starts from MINIMUM DATE
            />
          </div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
      {updatedStartDate && updatedEndDate && (
        <div className="updated-dates">
          <h3>Updated Dates:</h3>
          <p>Start Date: {format(updatedStartDate, "MM/dd/yyyy")}</p>
          <p>End Date: {format(updatedEndDate, "MM/dd/yyyy")}</p>
        </div>
      )}
    </div>
  );
};

export default MyTableComponent;
