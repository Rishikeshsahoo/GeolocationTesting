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
  const [width, setWidth]=useState(window.innerWidth)
   
 
  useEffect( ()=>{
    try {

       axios
        .get("https://acu1stchoice.injobs.careers/addItem/getAllData")
        .then((response) => {
          console.log("Data Response",response.data)
          setData(response.data.mainData)
          setOLTData(response.data.OLTData)
          setTransEQData(response.data.Trans_EQData)
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
      <Navbar windowSize={width}/>
      <Filters setOLTData={setOLTData} setTransEQData={setTransEQData} setData={setData} windowSize={width}/>
      <MapComponent tabularData={tabularData} dataframe={data} OLTData={OLTData} Trans_EQData={TransEQData} />
     </div>
  );
}

export default App;
