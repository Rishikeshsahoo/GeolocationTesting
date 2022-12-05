import React, { useState } from "react";
import {addLead, addOLT, addTrans_eq} from "../lib/utils"


import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  HeatmapLayer,
} from "@react-google-maps/api";


const center = { lat: 23.512, lng: 80.328 };

export default function MapComponent({ dataframe, tabularData,OLTData,Trans_EQData }) {


  const [libraries, setLibraries] = useState(["visualization", "drawing"]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });


  if (!isLoaded) return "Loading...";

  return (
    <>
      <div className="map_outer_container">
        <div className="map_container">
          <Map tabularData={tabularData} dataframe={dataframe} />
        </div>
      </div>
    </>
  );

  function Map({ dataframe, tabularData }) {
    const [currentZoom, setCurrentZoom] = useState(5.5); //default
    console.log("rendered")
    console.log(dataframe)
    
    return (
      <GoogleMap
        center={center}
        zoom={currentZoom}
        mapContainerClassName="map_container2"
        // This onload function is very important
        // All the markers are being loaded here
        onLoad={(map) => {
          console.log("ran")

          map.addListener("zoom_changed", () => {
            setCurrentZoom(map.getZoom());
          });

          //adding Leads data on the map
          dataframe.map((it)=>{
            if(it['Latitude'] && it['longitude'])
            {
              addLead({lat:(Number)(it["Latitude"]),lng:(Number)(it['longitude'])},map,it)
            }
          })


          OLTData.map((it)=>{
            if(it['LATITUDE'] && it['LONGITUDE'])
            {
              addOLT({lat:(Number)(it["LATITUDE"]),lng:(Number)(it['LONGITUDE'])},map,it)
            }
          })


          Trans_EQData.map((it)=>{
            if(it['LATITUDE'] && it['LONGITUDE'])
            {
              addTrans_eq({lat:(Number)(it["LATITUDE"]),lng:(Number)(it['LONGITUDE'])},map,it)
            }
          })
          
        }}
      >
        {currentZoom < 7 && (
          <HeatmapLayer
            options={{ radius: 25 }}
            data={dataframe.map((it) => {
              if (it["Latitude"])
                return new window.google.maps.LatLng(
                  Number(it["Latitude"]),
                  Number(it["longitude"])
                );
            })}
          />
        )}

      </GoogleMap>
    );
  }
}
