import React, { useEffect, useState } from "react";
import axios from "axios";
import stateNames from "../data/states";
import ComboBox from "./AutoComplete";
import {Button, Grid} from "@mui/material"
import { Container } from "@mui/system";
import rawZoneData from "../data/ZONE_CIRCLE_SSA_Mapping"



export default function Filters({ data, setData }) {
  const [zoneData,setZoneData]=useState(rawZoneData);

  const zones = new Set([]);
  const SSAs = new Set([]);
  const circles = new Set([]);

  const [zoneList, setZoneList] = useState([]);
  const [SSAList, setSSAList] = useState([]);
  const [circleList, setCircleList] = useState([]);
  
  const [zone, setZone] = useState(null);
  const [SSA, setSSA] = useState(null);
  const [circle, setCircle] = useState(null);
  const [leadStatus, setLeadStatus] = useState(null);

  useEffect(()=>{
    if(zone===null || zone.length<1 || !zone)
    {
      setCircle(null)
    }
    if(circle===null || circle.length<1 || !circle)
    {
      setSSA(null)
    }
    const dataa=rawZoneData.map((it)=>{
      let cnt=0;
      if(zone===null || zone===undefined || zone.length<2 || zone===it["ZONE"] )cnt++;
      if(SSA===null || SSA===undefined || SSA.length<2 || SSA===it["SSA_NAME"] )cnt++;
      if(circle===null || circle===undefined || circle.length<2 || circle===it["CIRCLE_NAME"] )cnt++;
      if(cnt>=3)return it;
    })
    dataa.forEach((it)=>{
      if(it){
      zones.add(it["ZONE"])
      SSAs.add(it["SSA_NAME"])
      circles.add(it["CIRCLE_NAME"])
      }
    })
    setZoneList(Array.from(zones))
      setCircleList(Array.from(circles))
      setSSAList(Array.from(SSAs))
  },[zone,SSA,circle])

  
 


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(zone,circle,SSA)
    // console.log(document.getElementById("startDate").value)
    // console.log(document.getElementById("endDate").value)
    try {
      await axios
        .post("https://geolocationtestingserver.onrender.com/", {
          params: {
           zone:zone,
           circle:circle,
           SSA:SSA,
           leadStatus:leadStatus
          }
        })
        .then((response) => {
          setData(response.data.mainData)
          console.log(response.data)
        });
    } catch (e) {
      console.log("error 1");
    }
  };
  // document.querySelector(".submit");
  return (
    <div className="filter-container">
      <div className="container">
        <Container>
        <div className="title">Filters</div><br/>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <ComboBox
            inputArray={(zoneList)}
            label="Zone"
            param={zone}
            disabled={false}
            setParam={setZone}
          />
            </Grid>
            <Grid item xs={12} md={6}>
            <ComboBox
            inputArray={(circleList)}
            label="Circle"
            param={circle}
            disabled={(zone===undefined || zone===null || zone.length<2)?true:false}
            setParam={setCircle}
          />
            </Grid>
            <Grid item xs={12} md={6}>
            <ComboBox
            inputArray={(SSAList)}
            label="SSA"
            disabled={(circle===undefined || circle===null || circle.length<2)?true:false}
            param={SSA}
            setParam={setSSA}
          />
            </Grid>
            <Grid item xs={12} md={6}>
              
          <ComboBox
            inputArray={["Any","TNF", "Cancelled", "Successfull", "Pending"]}
            label="Lead Status"
            param={leadStatus}
            setParam={setLeadStatus}
          />
            </Grid>
          </Grid>
          <div className="button">
            <button className="submit"  type="submit">submit</button>
          </div>
        </form>
       
        </Container>
      </div>
      <br />
      <div style={{color:"white"}}>
      {/* {
        JSON.stringify({
          "zone":zone,
          "circle":circle,
          "SSA":SSA
        })
      } */}
      </div>
    </div>
  );
}
