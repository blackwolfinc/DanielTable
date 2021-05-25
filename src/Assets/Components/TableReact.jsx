import React, { useEffect, useState } from "react";
import ReactFlexyTable from "react-flexy-table";
import moment from "moment";
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import "../Css/TableReact.scss";
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
  


  const history = useHistory();
  const [Data, setData] = useState();
  const [TokenLogin, setTokenLogin] = useState("");
  const [FilterTable, SetFilterTable] = useState(false);
  const [FilterTable2, SetFilterTable2] = useState(false);
  const [FilterTable0, SetFilterTable0] = useState("hide");
  const [FilterButton, SetFilterButton] = useState(true);
  const [Date1, SetDate1] = useState("2021-04-01");
  const [Date2, SetDate2] = useState(moment().format("YYYY-MM-DD"));
  const [PageSize, SetPageSize] = useState(500);

  const [GlobalSearch, setGlobalSearch] = useState("");
  const [PageNation, setPageNation] = useState(1);
  const [SortColumn, setSortColumn] = useState("");
  const [SortDir, setSortDir] = useState("");

  const [TotalData, setTotalData] = useState(0);
  const [TotalDraw, setTotalDraw] = useState(0);


  let TotalPenjualan  = TotalData / TotalDraw; 
  let HasilPenjumlahan  = Math.ceil(TotalPenjualan);


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
    setTokenLogin(Cookies.get('Token'))
  });



  const ValidateLogin  = () => {
    if (  Cookies.get('Token') === undefined)
    alert("hayo bypas ya ")
    history.push("/");
  
    }

  useEffect(() => {
    const axios = require("axios");
    let config2 = {
      method: "get",
      url: `https://test-api.logisfleet.com/job?FromDate=${Date1}&ToDate=${Date2}&CurrentPage=${PageNation}&PageSize=${PageSize}&SearchQuery=${GlobalSearch}&SortColumn=${SortColumn}&SortDir=${SortDir}&IsIncludeInactive=true`,
      headers: {
        Authorization:  Cookies.get('Token'),
      },
    };

    axios(config2)
      .then((response) => {
      
        setData(response.data.data);
        setTotalData(response.data.total)
        setTotalDraw(response.data.draw)
       
        
      })
      .catch((error) => {
        console.log(error);
        ValidateLogin()
      });
  }, [TokenLogin,  FilterButton , PageNation]);

  // Function  =====================d

 const ChangeChek =(e)=> {
setPageNation(e)
// console.log(e)
 }


  const ApiPagnation =(e)=>{
    
    if(PageNation <= 1 ){
      setPageNation(1)
   
    }
    if(PageNation >= 0){
      
    if (PageNation > 1 && e.target.id === "prev") {
      setPageNation(PageNation-1 )
        console.log(PageNation)
    }
    if (e.target.id === "next") {
      setPageNation(PageNation+1 )
      console.log(PageNation)
    }}
    if(PageNation === HasilPenjumlahan){
      setPageNation(PageNation)
    }
    if(PageNation === HasilPenjumlahan && e.target.id === "prev"){
      setPageNation(PageNation-1 )
    }

  
  }


  const TableFilter = (e) => {
    setSortColumn(e.target.value)
  };

  const TableFilter2 = (e) => {
    setSortDir(e.target.value)
  };
  const TableFilter3 = (e) => {
    SetPageSize(e.target.value);
  };

  const DateChange = (e) => {
    if (e.target.id === "globalSearch") {
      setGlobalSearch(e.target.value)
    }
    if (e.target.id === "dateAwal") {
      SetDate1(e.target.value);
    }
    if (e.target.id === "dateDua") {
      SetDate2(e.target.value);
    }
  };


  const filterStart = () => {
    if (FilterButton === true) {
      SetFilterButton(false);
      setPageNation(1)
    } else {
      SetFilterButton(true);
      setPageNation(1)
    }
  };
  const filterToggle = () => {
    if (FilterTable === false) {
      SetFilterTable(true);
    } else {
      SetFilterTable(false);
    }
  };
  const filterToggle2 = () => {
    Cookies.remove('Token')
    history.push("/");
  };
  const filterToggle0 = () => {
    if (FilterTable0 === "hide") {
      SetFilterTable0("show");
    } else {
      SetFilterTable0("hide");
    }
  };
  
  return (
    <div>

      <div className=" btn-Group">
      
        <ButtonGroup color="secondary">
          <Button
            type="date"
            name="filterToggle"
            id="filterToggle"
            color="primary"
            onClick={filterToggle0}
          >
            Open APi Filter
          </Button>
          <Button
            type="date"
            name="filterToggle"
            id="filterToggle"
            color="primary"
            onClick={filterToggle}
          >
            Open Client Multi Filter
          </Button>
          <Button
            type="date"
            name="filterToggle"
            id="filterToggle"
            color="primary"
            onClick={filterToggle2}
          >
            Log Out
          </Button>
        
        </ButtonGroup>
      </div>
      <br />
      <br />
      <div className={FilterTable0 + " " + "FilteApi"}>
      
        <ButtonGroup color="primary">
        <TextField
            label="Global Search"
            type="text"
            name="globalSearch"
            id="globalSearch"
            onChange={DateChange}
            value={GlobalSearch}
          ></TextField>

        </ButtonGroup>
        <br /> <br></br> <br></br> <br></br>
        <div className="SearchInput">
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

          <FormControl  className="formControl">
            <InputLabel id="demo-simple-select-autowidth-label">
              Page size
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-outlined"
              // value={age}
              onChange={TableFilter3}
              label="Age"
              value={PageSize}
            >
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={300}>300</MenuItem>
              <MenuItem value={500}>500</MenuItem>
              
            </Select>
          </FormControl>
          <FormControl className="formControl">
            <InputLabel id="demo-simple-select-autowidth-label">
            Sort Column
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-outlined"
              value={SortColumn}
              onChange={TableFilter}
              label="Sort Column"
        
            >
              <MenuItem value={"jobNumber"}>Job Number</MenuItem>
              <MenuItem value={"customerName"}>Customer Name	</MenuItem>
              <MenuItem value={"billingName"}>Billing Name	</MenuItem>
              <MenuItem value={"billingName"}>Job Date	</MenuItem>
              <MenuItem value={"jobTimeSpecific"}>Job Time Specific	</MenuItem>
              <MenuItem value={"jobTimeFrom"}>Job Time From	</MenuItem>
              <MenuItem value={'actualJobTimeSpecific'}>Actual Job Time Specific	</MenuItem>
              <MenuItem value={"inProgressTime"}>In Progress Time	</MenuItem>
              <MenuItem value={"jobAttemptCompletedDate"}>Job Attempt Completed Date	</MenuItem>
              <MenuItem value={"jobTemplateName"}>Job Template Name	</MenuItem>
              <MenuItem value={"driverName"}>Driver Name	</MenuItem>
              <MenuItem value={"vehicleName"}>Vehicle Name</MenuItem>
            </Select>
          </FormControl>
          <FormControl  className="formControl">
            <InputLabel id="demo-simple-select-autowidth-label">
            Sort By
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
               id="demo-simple-select-helper"
              value={SortDir}
              onChange={TableFilter2}
              label="Sort By"
       
            >
              <MenuItem value={"asc"}>ASC</MenuItem>
              <MenuItem value={"desc"}>DSC</MenuItem>

            </Select>
          </FormControl>
          
        </div>

        
        <ButtonGroup color="primary">
          <Button color="primary" type="submit" onClick={filterStart}>
            Start Filter
          </Button>
        </ButtonGroup>

      </div>
      
      <br />
    <div className="PagnationApi">
    <ButtonGroup color="primary">
      <button
      id="prev"
      name="prev"
       color="primary" onClick={ApiPagnation}>
           Prev
          </button>
          </ButtonGroup>
    
          <ButtonGroup color="primary">
            <h5> Total Data  : {TotalData}</h5>
          </ButtonGroup>
           <ButtonGroup color="primary">
            <h5> Row Load  : {TotalDraw}</h5>
          </ButtonGroup>
          <ButtonGroup color="primary">
            <h5>PageNation   : {PageNation} /{HasilPenjumlahan} </h5>
          </ButtonGroup>

          <ButtonGroup color="primary">
          <button 
           id="next"
      name="next"
      color="primary" variant="text" label="Next" onClick={ApiPagnation}>
          Next
          </button></ButtonGroup>
         
          </div>
      <ReactFlexyTable
        data={Data}
        globalSearch={false}
        pageSize={ PageSize}
        columns={COLUMNS}
        sortable={true}
        totalDataText={TotalData}
        downloadExcelText="Download data"
        showExcelButton={true}
        pageSizeOptions={[50, 100, 300, 500]}
        filterable={FilterTable}
        onPageChange={ChangeChek}
      />
    </div>
  );
};
