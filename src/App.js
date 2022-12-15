import {React,useEffect,useState} from "react";
import Navbar from "./Components/Navbar";
import Filters from "./Components/Filters";
import axios from "axios";
import MapComponent from "./Components/MapComponent";
import NoDataModal from "./Components/NoDataModal";


function App() {
  const [data, setData] = useState([]);
  const [OLTData, setOLTData] = useState([]);
  const [TransEQData, setTransEQData] = useState([]);
  const [tabularData,setTabularData]=useState({})
  const [modal,setModal]=useState(false)
  const [width, setWidth]=useState(window.innerWidth)
   
 

  useEffect( ()=>{
    try {

       axios
        .get("https://acu1stchoice.injobs.careers/addItem/getAllData")
        .then((response) => {
          setData(response.data.mainData)
          setOLTData(response.data.OLTData)
          setTransEQData(response.data.Trans_EQData)

         
        });
    } catch (e) {
      console.log({message:e.message});
    }
  }
,[])

  return (
    <div className="App">
      <NoDataModal open={modal} setOpen={setModal}/>
      <Navbar windowSize={width}/>
      <Filters mainData={data} OLTData={OLTData} TransEQData={TransEQData} setOLTData={setOLTData} setTransEQData={setTransEQData} setData={setData} windowSize={width} setModal={setModal}/>
      <MapComponent tabularData={tabularData} dataframe={data} OLTData={OLTData} Trans_EQData={TransEQData} />
     </div>
  );
}

export default App;
