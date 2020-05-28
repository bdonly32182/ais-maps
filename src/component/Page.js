import React, { useEffect, useState} from 'react';
import  {useDispatch,useSelector} from 'react-redux'
import {coperate,coordinate,coorOfcop} from '../reducer/action/CoordinateAction'

import Googlemaps from '../component/GoogleMaps'
import { GoogleMap } from '@react-google-maps/api';

export default Page=> {
    const dispatch = useDispatch()
    const coperates = useSelector(state=>state.coperate) //ข้อมูลทั้งหน้า ดูฟอแมท db.json 
    useEffect( ()=>{

        dispatch(coperate())
      },[coperate])

     function mapList (coperates){
    
    return Array.isArray(coperates)&& coperates.map(coperate =>(
        <div key={coperate.Cob_ID}>
            <button onClick={()=> dispatch(coorOfcop(coperate.Cob_ID))}>{coperate.cobid_title}</button>
            {coperate.subdetail.map(sub=>(
                
                    <li key={sub.sub_ID}>
                        <button onClick={()=>dispatch(coordinate(sub.sub_ID))}>{sub.sub_title}</button>
                    </li>
                
            ))}
        </div>
    ))
  }
  
        return (
            <div className="container-fluid">
                
                <div className="row">
                    {/* <MapsExample /> */}
                    <div className="col-md-3">
                            {mapList(coperates)}
                    </div>
                    <div className="col-md-9">
                      
                         <Googlemaps  />
                         
                       
                    </div>
                    
                </div>
                
            </div>
        );
    
}

