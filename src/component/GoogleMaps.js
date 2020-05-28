import React,{useEffect,useState} from 'react'
import {GoogleMap,useLoadScript,Marker,InfoWindow} from '@react-google-maps/api'
import {useSelector,useDispatch} from 'react-redux'
const libraries = ["places"];
//format data 

const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
//   styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function GoogleMaps() {
    const coordinates = useSelector(state=>state.coordinates) //subtack is state from store  
   const [Center,setCenter] = useState({
                            lat: 13.7245601,
                            lng: 100.4930243
                            }) // เปลี่ยนตำแหน่ง center ตาม location

    //script for loadGoogle map
    const {isLoaded,loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyC433MhjBdrMtN-s3VJZuhjNPUonOcQHIs",
        libraries
    },[])
    const [markers, setMarkers] = React.useState(null);
    //check ว่า loadScript ใช้คีย์ผ่านมั้ย
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    
function CenterChange(coordinates) {
    if (coordinates) {
        if (Array.isArray(coordinates.thing)&&coordinates.thing) {
            console.log(coordinates.thing);
            
                    setCenter({
                        lat:coordinates.thing[0].lat,
                        lng: coordinates.thing[0].lng
                        })
        }else{
            setCenter({
                lat:coordinates.lat,
                lng:coordinates.lng
            })
        }
    }
}    
    return (
        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={Center}
        onCenterChanged={()=>CenterChange(coordinates)}
        options={options}
        >
            
        {coordinates.Ownerinformation? 
        <Marker 
        key={coordinates.Ownerinformation.ShopId}
        position={{lat:coordinates.lat,lng:coordinates.lng}}
        onClick={()=>{setMarkers(coordinates)}}
        icon={
            {
              url:coordinates.Ownerinformation.image,
              scaledSize:new window.google.maps.Size(25,25) //ทำให้ขนาดรูปเท่ากับหน้าจอ google maps
  
            }}
        />:
        Array.isArray( coordinates.thing)&&coordinates.thing.map(marker=> (
            <Marker 
            key={marker.Ownerinformation.ShopId}
            position={{lat:marker.lat,lng:marker.lng}}
            onClick={()=>{setMarkers(marker)}}
            icon={
                {
                  url:marker.Ownerinformation.image,
                  scaledSize:new window.google.maps.Size(25,25) //ทำให้ขนาดรูปเท่ากับหน้าจอ google maps
      
                }}
            />
        ))
        }
        
        {markers&&(
        <InfoWindow  //infowindow คือ popup โชว์ขึ้นมาเมื่อคลิ๊กmarker  
        position={{lat:markers.lat,lng:markers.lng}}
        onCloseClick={()=>{setMarkers(null)}}
        >
          <div>
            {/* <img src={markers.Ownerinformation.image} width="30" height="30"/> */}
           <h3>ShopName:{markers.Ownerinformation.Shopname}</h3>
           <p>ShopId:{markers.Ownerinformation.ShopId}</p>
           <p>ShopPhone:{markers.Ownerinformation.ShopPhone}</p>
           <p>Latitude:{markers.lat}</p>
           <p>Longitude:{markers.lng}</p>
          </div>
        </InfoWindow>
      )}
        </GoogleMap>
    )
}