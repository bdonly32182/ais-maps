import React,{useState} from 'react'
import { GoogleMap, withScriptjs ,withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
let data = [
  {lat:13.663788,lng:100.4370129,Shopname:'best',ShopId:'xxxx',ShopPhone:'xxxxxxxxx',image:'/image/earn.jpg'},
  {lat:13.6637855,lng:100.404182,Shopname:'noty',ShopId:'sss',ShopPhone:'sssssssss',image:'/image/picProfile.jpg'},
  {lat:13.6475758,lng:100.4169132,Shopname:'time',ShopId:'ttt',ShopPhone:'ttttttttt',image:'/image/mai.jpg'}
]
function Map(){
  const [marker,setMarker] = useState(null)
  return (
    <GoogleMap 
    defaultZoom={10} 
    defaultCenter={{ lat: 13.7245601, lng: 100.4930243}}>
      {data.map(marker =>(
        <Marker 
        key={marker.ShopId}
        position={{lat:marker.lat,lng:marker.lng}}
        onClick={()=> {setMarker(marker)}}
        icon={
          {
            url:marker.image,
            scaledSize:new window.google.maps.Size(25,25) //ทำให้ขนาดรูปเท่ากับหน้าจอ google maps

          }}
        />
      ))}
      {marker&&(
        <InfoWindow  //infowindow คือ popup โชว์ขึ้นมาเมื่อคลิ๊กmarker  
        position={{lat:marker.lat,lng:marker.lng}}
        onCloseClick={()=>{setMarker(null)}}
        >
          <div>
            <img src={marker.image} width="30" height="30"/>
           <h3>ShopName:{marker.Shopname}</h3>
           <p>ShopId:{marker.ShopId}</p>
           <p>ShopPhone:{marker.ShopPhone}</p>
           <p>Latitude:{marker.lat}</p>
           <p>Longitude:{marker.lng}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}
const WrappedMap = withScriptjs(withGoogleMap(Map))
export default function App (){
  return(
    <div style={{width:'100vw',height:'100vh'}}>
      <WrappedMap 
    googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC433MhjBdrMtN-s3VJZuhjNPUonOcQHIs"}
     loadingElement={<div style={{ height: `100%` }} />}
     containerElement={<div style={{ height: `100%` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
    </div>
  )
}