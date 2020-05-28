import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
// import mapStyles from "./mapStyles";
let data = [
    {lat:13.663788,lng:100.4370129,Shopname:'best',ShopId:'xxxx',ShopPhone:'xxxxxxxxx',image:'/image/earn.jpg'},
    {lat:13.6637855,lng:100.404182,Shopname:'noty',ShopId:'sss',ShopPhone:'sssssssss',image:'/image/picProfile.jpg'},
    {lat:13.6475758,lng:100.4169132,Shopname:'time',ShopId:'ttt',ShopPhone:'ttttttttt',image:'/image/mai.jpg'}
  ]
function Map() {
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 13.7245601, lng: 100.4930243 }}
    //   defaultOptions={{ styles: mapStyles }} // ทำสไตร์ของ googlemap
    >
      {data.map(park => (
        <Marker
          key={park.ShopId}
          position={{
            lat: park.lat,
            lng: park.lng
          }}
          onClick={() => {
            setSelectedPark(park);
          }}
          icon={{
            url: park.image,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selectedPark && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedPark(null);
          }}
          position={{
            lat: selectedPark.lat,
            lng: selectedPark.lng
          }}
        >
          <div>
            <h2>{selectedPark.Shopname}</h2>
            <p>{selectedPark.ShopPhone}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC433MhjBdrMtN-s3VJZuhjNPUonOcQHIs`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}