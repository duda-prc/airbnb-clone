import React, {Component} from 'react';
import './App.css';
import Flat from './components/Flat';
import Marker from './components/marker';
// import Map from './components/Map';
import GoogleMapReact from 'google-map-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      allFlats: [],
      selectedFlat: null,
      search: ""
    };
  }

  componentDidMount() {
    const url = 'https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json';
    fetch(url) // AJAX
      .then(response => response.json())
      .then((data) => {
        this.setState({
          flats: data,
          allFlats: data
        });
      })
  }

  selectFlat = (flat) => {
    this.setState({
      selectedFlat: flat
    })
  }

  handleSearch = (event) => {
    console.log(event.target.value);
    this.setState({
      search: event.target.value,
      selectedFlat: null,
      flats: this.state.allFlats.filter((flat) => new RegExp(event.target.value, "i").exec(flat.name))
    });
  }

  render() {
    let defaultProps = {
      center: {
        lat: 48.856614,
        lng: 2.352222
      },
      zoom: 11
    };

    if (this.state.selectedFlat) {
      defaultProps = {
        center: {
          lat: this.state.selectedFlat.lat,
          lng: this.state.selectedFlat.lng
        },
        zoom: 15
      };
    }


    return (
      <div className='app'>
        <div className='main'>
          <div className='search'>
            <input type='text'
              placeholder='Search...'
              className='search-input'
              value={this.state.search}
              onChange={this.handleSearch}
            />
          </div>
          <div className='flats'>
            {this.state.flats.map((flat) => {
              return <Flat key=
                                {flat.name}
                                flat={flat}
                                selectFlat={this.selectFlat}/>
            })}
          </div>
        </div>
        <div className='map'>
          {/* <Map /> */}
          <GoogleMapReact
            center={defaultProps.center}
            zoom={defaultProps.zoom}
          >
            {this.state.flats.map((flat) => {

              return <Marker
                        key={flat.name}
                        lat={flat.lat}
                        lng={flat.lng}
                        text={flat.price}
                        selected={flat === this.state.selectedFlat} />
            })}
          </GoogleMapReact>

        </div>
      </div>
    );
  }
}

export default App;
