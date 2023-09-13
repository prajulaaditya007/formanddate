import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import moment from "moment";

const MyTableComponent: React.FC = () => {
  const [data, setData]: any = useState([]);
  const [selectedRow, setSelectedRow]: any = useState(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date("9999-12-31"));

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
    const formattedData = apiResponse.map((item) => {
      const formattedStartDate = moment(item.startDate, "YYYY-MM-DD").format(
        "MM/DD/YYYY"
      );
      const formattedEndDate = moment(item.endDate, "YYYY-MM-DD").format(
        "MM/DD/YYYY"
      );
      console.log("Formatted Start Date:", formattedStartDate);
      console.log("Formatted End Date:", formattedEndDate);
      return {
        ...item,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
    });
    console.log(formattedData);
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
    const parsedStartDate = moment(row.startDate, "MM/DD/YYYY").toDate();
    const parsedEndDate = moment(row.endDate, "MM/DD/YYYY").toDate();
    setStartDate(parsedStartDate);
    setEndDate(parsedEndDate);

    // Log the parsed dates to the console
    console.log("Parsed Start Date:", parsedStartDate);
    console.log("Parsed End Date:", parsedEndDate);
  };

  function handleSave() {
    // Update the selected row's dates here and save the changes to your API
    // For demonstration purposes, we'll just log the selected row.
    console.log(selectedRow);
    setSelectedRow(null); // Close the modal after saving
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
      // Inside the render function
      {selectedRow && (
        <div className="modal">
          <h2>Edit Dates for {selectedRow.name}</h2>
          <div className="datepicker">
            <DatePicker
              className="startDate"
              selected={moment(startDate, "MM/DD/YYYY").toDate()}
              dateFormat="MM/dd/yyyy"
              onChange={(date) =>
                setStartDate(moment(date, "MM/DD/YYYY").toDate())
              }
              minDate={new Date()} // Rule 1: StartDate cannot be in the past
              maxDate={endDate} // Rule 3: EndDate cannot be less than StartDate
            />
            <DatePicker
              className="endDate"
              selected={moment(endDate, "MM/DD/YYYY").toDate()}
              dateFormat="MM/dd/yyyy"
              onChange={(date) =>
                setEndDate(moment(date, "MM/DD/YYYY").toDate())
              }
              minDate={startDate} // Rule 3: EndDate cannot be less than StartDate
              maxDate={moment("9999-12-31").toDate()} // Rule 4: Calendar starts from MINIMUM DATE
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
