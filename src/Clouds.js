import React from 'react'

import {Table} from 'react-bootstrap'

const Clouds =(props)=>{
	return(
	<Table style={{border:'solid 1px #ff504d'}} >
        <thead style={{backgroundColor:'#ff504d', color:'white'}}>
          <tr>
            <th>#</th>
            <th >Cloud name</th>
            <th >Location</th>
            <th style={{cursor:'pointer'}} onClick={props.handleClick}>
             {`Distance to your location `}
             {props.distanceIncrease?<span>&uarr;</span>: <span>&darr;</span>}
            </th>
          </tr>
        </thead>
        <tbody>
         {props.clouds
          .filter(each => props.providerFilter==="All"?
            each:
             each.cloud_name.includes(props.providerFilter))
          .sort((a,b)=>{return props.distanceIncrease? 
            a.distance-b.distance:
            b.distance-a.distance})
          .map((each,index)=>{
            return (
              <tr style={{textAlign:'left'}} key={each.cloud_name}>
                <td>{index+1}</td>
                <td>{`${each.cloud_name.toUpperCase()}`}</td>
                <td>{each.cloud_description}</td>
                <td>{`${Math.round(each.distance/1000)} km`}</td>
              </tr>
            )
          })
         }          
        </tbody>
       </Table>
     )
}
export default Clouds