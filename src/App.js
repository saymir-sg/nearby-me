import React from 'react';
import PlacesList from './components/placesList';
import './App.css';
import {getLocation} from './components/location';

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      value: 'atm',
      latitude: 0,
      longitude: 0
    }
  }

  componentDidMount() {
    getLocation().then( res =>{
      console.log(res);
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      this.setState({latitude: latitude, longitude: longitude});
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.render();
    }
  }

  
  
  filterList = [
    { name: 'ATM', type: 'atm' },
    { name: 'Airport', type: 'airport' },
    { name: 'Bank', type: 'bank' },
    { name: 'Bus station', type: 'bus_station' },
    { name: 'Hospital', type: 'hospital' },
    { name: 'Local Government Office', type: 'local_government_office' },
    { name: 'Pharmacy', type: 'pharmacy' },
    { name: 'Train Station', type: 'train_station' }
  ];

  eventHandler = filterType => {
    console.log('clicked = ', filterType);
    this.setState({value: filterType});
  }

  render() {

    let placeComponent;

    if(this.state.latitude > 0 && this.state.longitude > 0){
      placeComponent = <PlacesList value={this.state.value} latitude={this.state.latitude} longitude={this.state.longitude} />
    }

    return (
      <div className="App">
          <header className="header">
            <h4 className="title text_center">Nearby Me</h4>
            <p className="text_center"><strong>Latitude:</strong>{this.state.latitude} <strong>Longitude:</strong> {this.state.longitude}</p> 
            <div className="btns_wrapper text_center">
              {
                this.filterList.map((item) => (
                  <button
                    key={item.type}
                    className={"btn " + (this.state.value == item.type ? 'active' : '')}
                    onClick={() => this.eventHandler(item.type)}>
                      {item.name}
                  </button>
                ))
              }
            </div>
            {/* <PlacesList
              value={this.state.value}
              latitude={this.state.latitude}
              longitude={this.state.longitude}
            /> */}
            {placeComponent}
          </header>
      </div>
    )
  }
}

export default App;

