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
import {InterestGroupServiceProvider} from "../../providers/interestGroupService";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})
export class EventsPage {

  database: AngularFireDatabase;
  events: any[];
  search: FormControl;
  pins: pin[];
  searchControl: FormControl;
  zoom: number = 0;

  latitude: number;
  longitude: number;

  errorMessage: string;
  results: any[];

  creatingEventForGroup: boolean = false;
  groupId: string;
  interestGroupName: string;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  newEventName: string;
  eventTime: string;
  eventDate: string;
  todaysDate: Date;
  endDate: Date;
  eventLocation: string;

  constructor(private navCtrl: NavController, private navParams: NavParams,
              private af: AngularFireDatabase, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, public interestGroupService: InterestGroupServiceProvider) {
        this.database = af;
        this.pins = [];

      this.groupId = navParams.get('groupId');

      this.todaysDate = new Date(Date.now());
      this.endDate = new Date(Date.now());
      this.endDate.setFullYear(this.endDate.getFullYear() + 5);

      if (this.groupId !=  null) {
        this.creatingEventForGroup = true;
        interestGroupService.getGroup(this.groupId).subscribe(g => {
          this.interestGroupName = g.payload.val().groupName;
          });
      }
  }

  createEvent() {
    if (this.newEventName == null || this.newEventName == '') {
      this.errorMessage = 'Please enter an event name.';
      return;
    }
    if (this.eventDate == null) {
      this.errorMessage = 'Please enter an event date.';
      return;
    }
    if (this.eventTime == null) {
      this.errorMessage = 'Please enter an event time.';
      return;
    }
    if (this.eventLocation == null) {
      this.errorMessage = 'Please choose an event location.';
      return;
    }

    this.interestGroupService.createNewEvent(this.groupId, this.newEventName, this.eventLocation,
      this.eventDate, this.eventTime).then(res => {
      this.errorMessage = "Event '" + this.newEventName + "' has been successfully created!";
      this.newEventName = null;
      this.eventLocation = null;
      this.eventTime = null;
      this.eventDate = null;
    });
  }

  ngOnInit() {
    this.latitude = 38.9072;
    this.longitude = -77.0369;
    this.zoom = 5;

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
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
    this.eventLocation = pin.name;
    console.log(pin.name + " was clicked!");
  }
}

interface pin {
  latitude: number;
  longitude: number;
  name: string;
}
