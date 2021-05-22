import React, { useEffect, useState } from "react";
import ReactFlexyTable from "react-flexy-table";
import moment from "moment";
import "../Css/TableReact.scss"
import {
  ButtonGroup,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import "react-flexy-table/dist/index.css";

export const TableReact = () => {
  const [Data, setData] = useState();
  const [TokenLogin, setTokenLogin] = useState("");
  const [FilterTable, SetFilterTable] = useState(false);
  const [FilterTable2, SetFilterTable2] = useState(false);
  const [FilterButton, SetFilterButton] = useState(true);
  const [Date1, SetDate1] = useState("2021-04-01");
  const [Date2, SetDate2] = useState(moment().format("YYYY-MM-DD"));
  const [PageSize, SetPageSize] = useState(500);

  //Header
  const COLUMNS = [
    {
      header: <i class="far fas fa-sort fa-s"> Job Number</i>,
      key: "jobNumber",
    },
    {
      header: <i class="fas  fa-sort fa-s"> Customer Name</i>,
      key: "customerName",
    },
    {
      header: <i class="fas  fa-sort fa-s"> Billing Name</i>,
      key: "billingName",
    },
    {
      header: <i class="fas  fa-sort fa-s"> Job Date</i>,
      key: "jobDate",
    },
    {
      header: <i class="fas  fa-sort fa-s"> Job Time Specific</i>,
      key: "jobTimeSpecific",
    },
    {
      header: <i class="fas  fa-sort fa-s"> Job Time From</i>,
      key: "jobTimeFrom",
    },
    {
      header: <i class="fas  fa-sort fa-s"> Actual Job Time Specific</i>,
      key: "actualJobTimeSpecific",
    },
    {
      header: <i class="fas  fa-sort fa-s"> in Progress Time</i>,
      key: "inProgressTime",
    },
    {
      header: <i class="fas  fa-sort fa-s"> Job Attempt Completed Date</i>,
      key: "jobAttemptCompletedDate",
    },
    {
      header: <i class="fas  fa-sort fa-s"> job Template Name</i>,
      key: "jobTemplateName",
    },
    {
      header: <i class="fas  fa-sort fa-s"> Driver Name</i>,
      key: "driverName",
    },
    {
      header: <i class="fas  fa-sort fa-s"> Vehicle Name</i>,
      key: "vehicleName",
    },
  ];

  useEffect(() => {
    //Get Token
    const axios = require("axios");
    let data = JSON.stringify({
      email: "test@logisfleet.com",
      password: "TestUser321",
    });

    let config = {
      method: "post",
      url: "https://test-api.logisfleet.com/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setTokenLogin(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(TokenLogin);
  });

  useEffect(() => {
    const axios = require("axios");

    let config2 = {
      method: "get",
      url: `https://test-api.logisfleet.com/job?currentPage=1&pageSize=${PageSize}&searchQuery&fromDate=${Date1}&toDate=${Date2}`,
      headers: {
        Authorization:TokenLogin,
      },
    };

    axios(config2)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [TokenLogin, FilterButton]);

  // Function  =====================

  const DateChange = (e) => {
    if (e.target.id === "dateAwal") {
      SetDate1(e.target.value);
    }
    if (e.target.id === "dateDua") {
      SetDate2(e.target.value);
    } else {
      SetPageSize(e.target.value);
    }
  };

  const filterStart = () => {
    if (FilterButton === true) {
      SetFilterButton(false);
    } else {
      SetFilterButton(true);
    }
    
  };
  const filterToggle =() => {
    if (FilterTable === false) {
      SetFilterTable(true)
    }
    else{
      SetFilterTable(false)
    }


  }
  const filterToggle2 =() => {
    if (FilterTable2 === false) {
      SetFilterTable2(true)
    }
    else{
      SetFilterTable2(false)
    }


  }

  return (
    <div >
      <div className="btn-Group" >
        <ButtonGroup  color="primary" aria-label="outlined primary button group">
          
            <br />
            <TextField
            label="Start Date"
              type="date"
              name="dateAwal"
              id="dateAwal"
              onChange={DateChange}
              placeholder="2021-04-01"
              value={Date1}
            ></TextField>
   

            <TextField
              type="date"
              label="End Date"
              name="dateDua"
              id="dateDua"
              value={Date2}
              onChange={DateChange}
            ></TextField>
       
         <FormControl variant="outlined" className="formControl">
            <InputLabel id="demo-simple-select-autowidth-label">
              Page size
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-outlined"
              // value={age}
              onChange={DateChange}
              label="Age"
              value={PageSize}
            >
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={300}>300</MenuItem>
              <MenuItem value={500}>500</MenuItem>
            </Select>
          </FormControl>


          <Button onClick={filterStart}>Start Filter</Button>
          
        </ButtonGroup>
        <ButtonGroup color="secondary">
        <Button type="date" name="filterToggle" id="filterToggle" onClick={filterToggle}>
            Open Table Filter
          </Button>
          <Button type="date" name="filterToggle" id="filterToggle" onClick={filterToggle2}>
            Open Global Filter
          </Button>
        </ButtonGroup>
        
        
      </div>
      <br />
      <br />
      <br />
      <ReactFlexyTable
        data={Data}
        globalSearch={FilterTable2}
        pageSize={90}
        columns={COLUMNS}
        sortable={FilterTable}
        downloadExcelText="Download data"
        showExcelButton={true}
        pageSizeOptions={[50, 100, 300, 500]}
        filterable={FilterTable}
      />
    </div>
  );
};
