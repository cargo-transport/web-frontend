import React, { Component } from 'react';
// import DuckImage from '../assets/Duck.jpg';
import classes from './HomeView.scss';

export default class HomeView extends Component {

  constructor() {
    super(...arguments);

    let initialLocation;
    const options = { componentRestrictions: { country: 'in' } };
    const india = new google.maps.LatLng(21.7679, 78.8718);
    let map;
    let sourcePlaces;
    let destPlaces;

    this.state = {
      source: null,
      destination: null
    }

    this.onSourceChange = this.onSourceChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.geoSuccess = this.geoSuccess.bind(this);
    this.geoError = this.geoError.bind(this);
  }

  componentDidMount() {
    const source = document.getElementById('sourceSearch');
    const dest = document.getElementById('destSearch');
    this.sourcePlaces = new google.maps.places.Autocomplete(source, this.options);
    this.destPlaces = new google.maps.places.Autocomplete(dest, this.options);
    google.maps.event.addListener(this.sourcePlaces, 'place_changed', this.onSourceChange);
    google.maps.event.addListener(this.destPlaces, 'place_changed', this.onDestinationChange);
    this.initialize();
  }

  geoError(errorFlag = true) {
    if (errorFlag)
      this.initialLocation = this.newyork;

    this.map.setCenter(initialLocation);
  }

  onSourceChange() {
    const place = this.sourcePlaces.getPlace();
    this.initialLocation = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
    this.setState({
      source: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    });
    this.reloadMap(this.initialLocation);
    console.log(place.formatted_address);
    console.log(place.url);
    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());
  }

  onDestinationChange() {
    const place = this.destPlaces.getPlace();
    this.initialLocation = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());
    this.setState({
      destination: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
    });
    this.reloadMap(this.initialLocation);
    console.log(place.formatted_address);
    console.log(place.url);
    console.log(place.geometry.location.lat());
    console.log(place.geometry.location.lng());
  }

  reloadMap(location) {
    this.map.setCenter(location);
  }

  geoSuccess(position) {
    this.initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    this.reloadMap(this.initialLocation);
  }

  initialize() {

    var myOptions = {
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById("map"), myOptions);

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError);
    }
    // Browser doesn't support Geolocation
    else {
      this.geoError(false);
    }
  }

  render() {
    const { source, destination } = this.state;
    console.log(source, destination);
    return (
      <div>
        <div id="map" className={classes.map}></div>
        <div className={classes.searchBox}>
          <div id="divSource" className={classes.source}>
            <input ref="searchField" id="sourceSearch" type="text" size="50" placeholder="Source" />
            {
              source &&
              <div>
                <p>Latitude: {this.state.source.lat}</p>
                <p>Longitude: {this.state.source.lng}</p>
              </div>
            }
          </div>
          <div id="divDestination" className={classes.destination}>
            <input ref="searchField" id="destSearch" type="text" size="50" placeholder="Destination" />
            {
              destination &&
              <div>
                <p>Latitude: {this.state.destination.lat}</p>
                <p>Longitude: {this.state.destination.lng}</p>
              </div>
            }
          </div>
        </div>
        <br />
      </div>
    );
  }
}

