import {Component, ElementRef, ViewChild, NgZone} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase,
  AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {} from '@types/googlemaps';

import { MapsAPILoader, AgmMap, AgmMarker } from '@agm/core';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

    database: AngularFireDatabase;
    events: any[];
    groupId: string;
    search: FormControl;
    pins: pin[];
    searchControl: FormControl;
    zoom: number = 0;

    latitude: number;
    longitude: number;

    errorMessage: string;
    results: any[];

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private navCtrl: NavController, private navParams: NavParams,
              private af: AngularFireDatabase, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
        this.database = af;
        this.pins = [];
  }

  ngOnInit() {
    this.latitude = 38.9072;
    this.longitude = -77.0369;
    this.zoom = 5;

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          console.log("found new place " + place.name);

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.dropPin(place);
        });
      });
    });
  }

  public findLocation(location: string) {


    let googleMap = new google.maps.Map(document.getElementById('map'),
      { zoom: 15
      });
    let service = new google.maps.places.PlacesService(googleMap);

    service.textSearch({
      location: new google.maps.LatLng(38.9072, -77.0369),
      radius: 100,
      query: location
    }, (results, status) => {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        this.errorMessage = status.toString();
      } else {
        results.forEach(result => {
          console.log(result);
        //  this.dropPin(result, googleMap);
        })
      }
    });
  }

  dropPin(result) {
    this.latitude = result.geometry.location.lat();
    this.longitude = result.geometry.location.lng();
    this.zoom = 12;

    this.pins.push({
      latitude: this.latitude,
      longitude: this.longitude,
      name: result.name
    });
  }

  markerClick(pin: pin) {
    //do something?
    console.log(pin.name + " was clicked!");
  }
}

interface pin {
  latitude: number;
  longitude: number;
  name: string;
}
