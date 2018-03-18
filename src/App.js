import React, { Component } from 'react';
import geolib from 'geolib'
import './App.css';
import { Grid, Col,Image} from 'react-bootstrap'
import CloudProviers from './provider.js'
import Clouds from './Clouds.js'
import LOGO from './aiven-logo.jpg'
class App extends Component {
  constructor(props) {
    super(props)
    this.state={userPosition:{},clouds:[],getCloudsInfo:false,getDistance:false,providerFilter:'All',distanceIncrease:true};
    this.getUserPosition=this.getUserPosition.bind(this);
    this.getDistance=this.getDistance.bind(this);
    this.distanceFilter=this.distanceFilter.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.providerFilter=this.providerFilter.bind(this);
  }

  componentDidMount(){
    this.getUserPosition();
  }

  componentDidUpdate(){
    if(!this.state.getCloudsInfo){
      fetch('https://api.aiven.io/v1beta/clouds')
      .then(res=>res.json())
      .then(data=>{
        this.setState({clouds:data.clouds,getCloudsInfo:true})
      })
    }
    if(this.state.getCloudsInfo&&!this.state.getDistance){
      this.getDistance();
    }
  }

  getUserPosition(){
    const options = {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0
    };
    const success=(position)=>{
      this.setState({userPosition:
        {
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        }
      })
    } 
    const error=(err)=> {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  getDistance(){
    const clouds=this.state.clouds.slice();
    clouds.forEach((cloud,i)=>{
      let distance = geolib.getDistance(
        this.state.userPosition,
        {latitude:cloud.geo_latitude , longitude:cloud.geo_longitude});
      cloud.distance=distance;
    });
    this.setState({clouds:clouds,getDistance:true})
  }

  providerFilter(e){
   this.setState({providerFilter:e.target.value})
  }
  distanceFilter(e){
    if(e.target.value==="INCREASE"){
      this.setState({distanceIncrease:true})
    }else if(e.target.value==="DECREASE"){
      this.setState({distanceIncrease:false})
    }
    
  }

  handleClick(){
    this.setState({distanceIncrease:!this.state.distanceIncrease})
  }

  render() {
    if(!this.state.getCloudsInfo){
      return (
        <div style={{textAlign:'center', margin:'100px auto'}}>
            <Image responsive src={LOGO} />
            <div className="loader" style={{margin:'20px auto'}}></div>
        </div>
      )
    }
    return (
      <Grid className="App" container style={{margin:'20px auto'}}>
        <Col xs="4" sm='2'>
          <Image responsive src={LOGO} />
        </Col>
        <Col xs='8'>
          <CloudProviers cloudsRegion={this.state.clouds.map(each=>
                                        each.cloud_name.slice(0,each.cloud_name.indexOf('-'))
                                      )} 
                  providerFilter={this.providerFilter}
                  distanceFilter={this.distanceFilter}
          />          
        </Col>
 
       <Clouds handleClick={this.handleClick} 
          clouds={this.state.clouds}
          distanceIncrease={this.state.distanceIncrease}
          providerFilter={this.state.providerFilter} 
      />
      </Grid>
    );
  }
}

export default App;
