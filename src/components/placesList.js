import React from 'react';

class PlacesList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      list: [],
      isVisible: false,
      error: ''
    }
  }

  componentWillMount() {
    this.getPlaces();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.getPlaces();
    }
  }

  getPlaces(){
    console.log(this.props);
    let key = 'AIzaSyBnOC2cYnLyaaYXtnd_IEQWZLkqvg0tqoE';
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.latitude},${this.props.longitude}&radius=1000&types=${this.props.value}&key=${key}`;
    console.log(url);
    
    fetch(url)
    .then(res => {
      return  res.json();
    })
    .then(data => {
      console.log(data.results);
      this.setState({isVisible: data.results.length ? true : false})
      if(this.state.isVisible){
        this.setState({list: data.results});
      }else if(data.results.length == 0){
        this.setState({error: data.status});
      }else{
        this.setState({error: 'Something went wrong!!'})
      }
    })
    .catch(() => console.log("Error"));
  }

  render() {
      return (
        <div className="places_wrapper">
              {
                this.state.isVisible ?
                <div className="places_ul">
                {
                  this.state.list.map((item, index) => (
                    <div className="li_box" key={index}>
                      <div className="inner_box">
                        <h4 className="place_title">{item.name}</h4>
                        <p className="txt">{item.vicinity}</p>
                      </div>
                    </div>
                  ))
                }
                </div>
                :
                ( this.state.error !== '' &&  !(this.state.isVisible) ?
      
                  <div className="error_div">
                    <h4>{this.state.error}</h4>
                  </div>
                  :

                  <div className="error_div">
                     <h4>Something went wrong</h4>
                  </div>
                )
              }
        </div>        
      );
  }
}

export default PlacesList