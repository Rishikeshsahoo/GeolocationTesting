import {React,useEffect,useState} from "react";
import Navbar from "./Components/Navbar";
import Filters from "./Components/Filters";
import axios from "axios";
import MapComponent from "./Components/MapComponent";
function App() {
  const [data, setData] = useState([]);
  const [OLTData, setOLTData] = useState([]);
  const [TransEQData, setTransEQData] = useState([]);
  const [tabularData,setTabularData]=useState({})
  useEffect( ()=>{
    try {

       axios
        .get("https://geolocationtestingserver.onrender.com/")
        .then((response) => {
          setData(response.data.mainData)
          setOLTData(response.data.OLTData)
          setTransEQData(response.data.Trans_EQData)
          console.log(OLTData)
          let newdata={};
          response.data.forEach((it)=>{

            let str=it.state.toLowerCase()

            // console.log(str+" "+str.length)
            if(!newdata[str]) newdata[str]=[0,0,0,0];
           newdata[str][it.leadType]+=1;
          })
          setTabularData({...tabularData,...newdata})
        });
    } catch (e) {
      console.log("error 1");
    }
  }
,[])
  return (
    <div className="App">
      <Navbar/>
      <Filters data={data} setData={setData}/>
      <MapComponent tabularData={tabularData} dataframe={data} OLTData={OLTData} Trans_EQData={TransEQData} />
     </div>
  );
}

export default App;
