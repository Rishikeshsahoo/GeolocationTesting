import React, { useEffect, useState } from "react";
import axios from "axios";
import stateNames from "../data/states";
import ComboBox from "./AutoComplete";
import { Box, Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import rawZoneData from "../data/ZONE_CIRCLE_SSA_Mapping";
import red from "../imgs/circle-16.png";
import yellow from "../imgs/ycircle-16.png";
import green from "../imgs/gcircle-16.png";
import black from "../imgs/bcircle-16.png";
import tri from "../imgs/triangle-24.png";
import blue from "../imgs/square-24.png";

export default function Filters({ data, setData }) {
  const [zoneData, setZoneData] = useState(rawZoneData);

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

  useEffect(() => {
    if (zone === null || zone.length < 1 || !zone) {
      setCircle(null);
    }
    if (circle === null || circle.length < 1 || !circle) {
      setSSA(null);
    }
    const dataa = rawZoneData.map((it) => {
      let cnt = 0;
      if (
        zone === null ||
        zone === undefined ||
        zone.length < 2 ||
        zone === it["ZONE"]
      )
        cnt++;
      if (
        SSA === null ||
        SSA === undefined ||
        SSA.length < 2 ||
        SSA === it["SSA"]
      )
        cnt++;
      if (
        circle === null ||
        circle === undefined ||
        circle.length < 2 ||
        circle === it["CIRCLE"]
      )
        cnt++;
      if (cnt >= 3) return it;
    });
    dataa.forEach((it) => {
      if (it) {
        zones.add(it["ZONE"]);
        circles.add(it["CIRCLE"]);
        SSAs.add(it["SSA"]);
      }
    });
    setZoneList(Array.from(zones));
    setCircleList(Array.from(circles));
    setSSAList(Array.from(SSAs));
  }, [zone, SSA, circle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(zone, circle, SSA);
    // console.log(document.getElementById("startDate").value)
    // console.log(document.getElementById("endDate").value)
    try {
      await axios
        .post("https://acu1stchoice.injobs.careers/addItem/getFilteredData", {
          params: {
            zone: zone,
            circle: circle,
            SSA: SSA,
            leadStatus: leadStatus,
          },
        })
        .then((response) => {
          setData(response.data.mainData);
          // console.log(response.data);
        });
    } catch (e) {
      console.log("error 1");
    }
  };
  // document.querySelector(".submit");
  return (
    <div className="outerReactFrag">
      <Grid
        className="filters_outer"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        container
      >
        <Grid item xs={12} md={6}>
          <Container
            sx={{
              borderRadius: "10px",
              backgroundColor: "white",
              height: "22rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box>
              <div className="title">Filters</div>
              <br />
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <ComboBox
                      inputArray={zoneList}
                      label="Zone"
                      param={zone}
                      disabled={false}
                      setParam={setZone}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ComboBox
                      inputArray={circleList}
                      label="Circle"
                      param={circle}
                      disabled={
                        zone === undefined || zone === null || zone.length < 2
                          ? true
                          : false
                      }
                      setParam={setCircle}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ComboBox
                      inputArray={SSAList}
                      label="SSA"
                      disabled={
                        circle === undefined ||
                        circle === null ||
                        circle.length < 2
                          ? true
                          : false
                      }
                      param={SSA}
                      setParam={setSSA}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ComboBox
                      inputArray={[
                        "Any",
                        "TNF",
                        "Cancelled",
                        "Successful",
                        "Pending",
                      ]}
                      label="Lead Status"
                      param={leadStatus}
                      setParam={setLeadStatus}
                    />
                  </Grid>
                </Grid>
                <div className="button">
                  <button className="submit" type="submit">
                    submit
                  </button>
                </div>
              </form>
            </Box>
          </Container>
        </Grid>
        <Grid item md={6}>
          <Container
            sx={{
              borderRadius: "10px",
              backgroundColor: "white",
              height: "22rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box>
              <div className="title">Nomenclature</div>
              <br />
              
              <Grid container spacing={2}>
                <Grid style={{textAlign:"center"}} item md={3}>
                  <img src={red}/>
                </Grid>
                <Grid style={{fontFamily:"sans-serif"}} item  md={8}>
                  Red circle represents TNF Lead points
                </Grid>
                <Grid style={{textAlign:"center"}} item  md={3}>
                <img src={green}/>
                </Grid>
                <Grid style={{fontFamily:"sans-serif"}} item  md={8}>
                  Green circle represents Successful lead orders
                </Grid>
                <Grid style={{textAlign:"center"}} item  md={3}>
                <img src={black}/>
                </Grid>
                <Grid style={{fontFamily:"sans-serif"}} item  md={8}>
                  Black circles represent Cancelled Lead orders
                </Grid>
                <Grid style={{textAlign:"center"}} item  md={3}>
                <img src={yellow}/>
                </Grid>
                <Grid style={{fontFamily:"sans-serif"}} item  md={8}>
                Yellow circles represent Pending Lead orders
                </Grid>
                <Grid style={{textAlign:"center"}} item  md={3}>
                <img src={tri}/>
                </Grid>
                <Grid style={{fontFamily:"sans-serif"}} item  md={8}>
                  Triangle represents all the OLT points
                </Grid>
                <Grid style={{textAlign:"center"}} item  md={3}>
                <img src={blue}/>
                </Grid>
                <Grid item style={{fontFamily:"sans-serif"}} md={8}>
                  Square represents all the Transmission equipment data
                </Grid>
                
              </Grid>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
