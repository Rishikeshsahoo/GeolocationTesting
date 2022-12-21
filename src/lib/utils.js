import red from "../imgs/circle-16.png";
import yellow from "../imgs/ycircle-16.png";
import green from "../imgs/gcircle-16.png";
import black from "../imgs/bcircle-16.png";
import tri from "../imgs/triangle-24.png";
import blue from "../imgs/square-24.png";

// _______________________________________Lead addition function_____________________________________________________

export function addLead(latLng, map, it) {
  let url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  let textColor = "";

  if (it["leadStatus"] === "Completed") {
    url = green;
    textColor="green";
  } else if (it["leadStatus"] === "Pending") {
    url = yellow;
    textColor="#8B8000";
  } else if (it["leadStatus"] === "TNF") {
    url = red;
    textColor="red";
  } else if (it["leadStatus"] === "Cancelled") {
    url = black;
    textColor="black";
  }

  let c;
  c = `<h3>${it["CustomerName"]}</h3><br>
        
      <h4>Customer Mobile: ${
        it["CustomerMobile"] ? it["CustomerMobile"] : "Not defined"
      }</h4>
      <h4>Customer Email: ${
        it["CustomerEmail"] ? it["CustomerEmail"] : "Not defined"
      }</h4>
      <h4>Plan Name: ${
        it["CustomerPlan"] ? it["CustomerPlan"] : "Not defined"
      }</h4>
      <h4>Lead Status: <span style="color:${textColor};" >${it["leadStatus"]}</span></h4>
      <h4>Lead Type: ${it["LeadType"]}</h4>
    `;
  const infowindow = new window.google.maps.InfoWindow({
    content: c,
  });

  let marker = new window.google.maps.Marker({
    map: map,
    position: latLng,
    icon: {
      url: url,
    },
  });

  marker.addListener("mouseover", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });

  marker.addListener("mouseout", () => {
    infowindow.close();
  });
  //store the marker object drawn in global array
}
// _______________________________________OLT addition function_____________________________________________________

//for TNF Leads
export function addOLT(latLng, map, it) {
  let url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  url = tri;

  let c;

  c = `<h3>OLT Owner: <span style="color:${"blue"};" >${it["OLT_OWNER"]}</span></h3><br>
      <h4>Working Count: ${it["WORKING_COUNT"]}</h4>
    `;
  const infowindow = new window.google.maps.InfoWindow({
    content: c,
  });

  let marker = new window.google.maps.Marker({
    map: map,
    position: latLng,
    icon: {
      url: url,
    },
  });

  marker.addListener("mouseover", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });

  marker.addListener("mouseout", () => {
    infowindow.close();
  });
  //store the marker object drawn in global array
}

//   ___________________________________Transition equipment addition function_________________________________

export function addTrans_eq(latLng, map, it) {
  let url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

  url = blue;

  // const str=tabularData[it.name.toLowerCase().trim()]
  let c;
  // if(str)

  c = `<h3>Vendor: ${it["TRANS_EQUIP_OWNER"]}</h3><br>
      <h4>Site Name: ${it["SITE_NAME"]}</h4>
      <h4>CPAN Ports Available: ${it["NO_OF_TRANS_EQUIP"]}</h4>
    `;
  const infowindow = new window.google.maps.InfoWindow({
    content: c,
  });

  let marker = new window.google.maps.Marker({
    map: map,
    position: latLng,
    icon: {
      url: url,
    },
  });

  marker.addListener("mouseover", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });

  marker.addListener("mouseout", () => {
    infowindow.close();
  });
  //store the marker object drawn in global array
}
