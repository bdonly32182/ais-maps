import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {GoogleMap,useLoadScript,Marker,InfoWindow} from '@react-google-maps/api'
import {useSelector,useDispatch} from 'react-redux'
import {coperate} from '../reducer/action/CoordinateAction'
const libraries = ["places"];
//format data 
let data = [
    {lat:13.663788,lng:100.4370129,Shopname:'best',ShopId:'xxxx',ShopPhone:'xxxxxxxxx',image:'/image/earn.jpg'},
    {lat:13.6637855,lng:100.404182,Shopname:'noty',ShopId:'sss',ShopPhone:'sssssssss',image:'/image/picProfile.jpg'},
    {lat:13.6475758,lng:100.4169132,Shopname:'time',ShopId:'ttt',ShopPhone:'ttttttttt',image:'/image/mai.jpg'}
  ]
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
//   styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 13.7245601,
  lng: 100.4930243,
};
export default  Map=> {
  //use store in hooks
  const dispatch = useDispatch()
  const coordinates = useSelector(state=> state.coordinates)
  //use state in hooks
  // const [Coordinate,setCoordinate] = useState(null)
  useEffect(async ()=>{
    dispatch(coperate())
  },[]) //[] เพื่อให้ทำงานเฉพาะ mount or unmount only
  
    //script for loadGoogle map
    const {isLoaded,loadError} = useLoadScript({
        // googleMapsApiKey: "AIzaSyC433MhjBdrMtN-s3VJZuhjNPUonOcQHIs",
        libraries
    })
    const [markers, setMarkers] = React.useState(null);
    //check ว่า loadScript ใช้คีย์ผ่านมั้ย
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    return (
        <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        options={options}
        >
        {coordinates.map(marker=>(
            <Marker 
            key={marker.ShopId}
            position={{lat:marker.lat,lng:marker.lng}}
            onClick={()=>{setMarkers(marker)}}
            icon={
                {
                  url:marker.image,
                  scaledSize:new window.google.maps.Size(25,25) //ทำให้ขนาดรูปเท่ากับหน้าจอ google maps
      
                }}
            />
        ))}
        {markers&&(
        <InfoWindow  //infowindow คือ popup โชว์ขึ้นมาเมื่อคลิ๊กmarker  
        position={{lat:markers.lat,lng:markers.lng}}
        onCloseClick={()=>{setMarkers(null)}}
        >
          <div>
            <img src={markers.image} width="30" height="30"/>
           <h3>ShopName:{markers.Shopname}</h3>
           <p>ShopId:{markers.ShopId}</p>
           <p>ShopPhone:{markers.ShopPhone}</p>
           <p>Latitude:{markers.lat}</p>
           <p>Longitude:{markers.lng}</p>
          </div>
        </InfoWindow>
      )}
        </GoogleMap>
    )
}