import React from 'react'

import {Form,FormGroup, FormControl,option,Col} from 'react-bootstrap'

const PROVIDERS =(props)=>{
	return(
		<Form horizontal >
	          <FormGroup controlId="formHorizontalSelect" onChange={props.providerFilter} >
		        <Col xs='12' sm='8' lg='3'>
		             <FormControl componentClass="select" placeholder="select">
			              <option value="All" selected hidden >PROVIDERS</option>
		              {props.cloudsRegion
		                .filter((each,i,arr)=>{return arr.indexOf(each) === i})
		                .map(each=>{return (<option key={each} value={each}>{each.toUpperCase()}</option>)
		              })}
		            </FormControl>
		        </Col> 
	          </FormGroup>

	           <FormGroup controlId="formHorizontalSelect" onChange={props.distanceFilter}>
		        <Col xs='12' sm='8' lg='3'>
		             <FormControl componentClass="select" placeholder="select">
		              <option value="PROVIDER FILTER" selected hidden >DISTANCE</option>
		              <option value="INCREASE">INCREASE</option>
		              <option value="DECREASE">DECREASE</option>
		            </FormControl>
		        </Col> 
	          </FormGroup>
	      </Form>
     )
}
export default PROVIDERS