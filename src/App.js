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
  const [windowSize, setWindowSize] = useState(getWindowSize());
  console.log(windowSize)
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }
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
      <Navbar windowSize={windowSize}/>
      <Filters data={data} setData={setData} windowSize={windowSize}/>
      <MapComponent tabularData={tabularData} dataframe={data} OLTData={OLTData} Trans_EQData={TransEQData} />
     </div>
  );
}

export default App;
