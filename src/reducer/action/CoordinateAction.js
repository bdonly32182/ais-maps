import axios from 'axios'
import {COORDINATE,CORPERATE,COOROFCOP} from './Type'
export const coperate =() =>async dispatch=>{
    //ทำ sidebar
   const result =await axios.get('http://localhost:3001/Coperate')
   console.log(result.data);
   
    dispatch({type:CORPERATE,payload:result.data})
         
}

export const coordinate =(id)=>async dispatch=>{
    const result = await axios.get('http://localhost:3001/subCon/'+id)
    dispatch({type:COORDINATE,payload:result.data})

}

export const coorOfcop =(id)=> async dispatch =>{
        const result = await axios.get('http://localhost:3001/coorOFcop/'+id)
        console.log(result.data);
        
        dispatch({type:COOROFCOP,payload:result.data})
}