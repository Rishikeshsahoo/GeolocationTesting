import { React, useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Filters from "./Components/Filters";
import axios from "axios";
import MapComponent from "./Components/MapComponent";
import NoDataModal from "./Components/NoDataModal";
import { Grid } from "@mui/material";

function App() {
  const [data, setData] = useState([]);
  const [OLTData, setOLTData] = useState([]);
  const [TransEQData, setTransEQData] = useState([]);
  const [tabularData, setTabularData] = useState({});
  const [modal, setModal] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    try {
      axios
        .get("https://acu1stchoice.injobs.careers/addItem/getAllData")
        .then((response) => {
          setData(response.data.mainData);
          setOLTData(response.data.OLTData);
          setTransEQData(response.data.Trans_EQData);
        });
    } catch (e) {
      console.log({ message: e.message });
    }
  }, []);

  return (
    <div className="App">
      <NoDataModal open={modal} setOpen={setModal} />
      <Navbar windowSize={width} />
      <Grid style={{display:"flex",flexDirection:"row", justifyContent:"center"}} container >
        <Grid item md={3} xs={12}>
        <Filters
        mainData={data}
        OLTData={OLTData}
        TransEQData={TransEQData}
        setOLTData={setOLTData}
        setTransEQData={setTransEQData}
        setData={setData}
        windowSize={width}
        setModal={setModal}
      />

        </Grid>
        <Grid item display={"flex"} justifyContent={"center"}  md={9} xs={12} >
        <MapComponent
        tabularData={tabularData}
        dataframe={data}
        OLTData={OLTData}
        Trans_EQData={TransEQData}
      />
        </Grid>
       
      </Grid>
     
     
    </div>
  );
}

export default App;
