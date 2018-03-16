import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from '../StorageService.service';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

class Phone {
  constructor(){}
    extensionNumber : number;
    mainNumber : number;

}

class Address{
  constructor(){}
    city : string;
    country : string;

}

class Person{
  constructor(){}
  firstName:string;
  lastName:string;
  email:string;
  phno:Phone=new Phone();
  address:Address[]=[
  {city:"",country:""},
  {city:"",country:""}];

}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
//-------------------------------------------------------------------------------
//personDetails: any = {firstName:"",lastName:"",email:"",phno:{mainNumber:"",extensionNumber:""},address:[{city:"",country:""},{city:"",country:""}]};
name : string = "Yogendra";
form = new FormGroup({
    firstName : new FormControl('',[Validators.minLength(3),Validators.required]),
    lastName : new FormControl(),
    email : new FormControl(),
    phno : new FormGroup({
      extensionNumber : new FormControl(),
      mainNumber : new FormControl(),
    }),
    address : new FormArray([
      new FormGroup({
        city : new FormControl(),
        country : new FormControl()
      }),new FormGroup({
        city : new FormControl(),
        country : new FormControl()
      })
    ])
});
 //ORRRRRR
//personDetails : Person = new Person();

 //-------------------------------------------------------------------------------
  constructor(private route : ActivatedRoute, private router : Router , public storageService : StorageService, private http : Http) {

  //console.log(JSON.stringify(route.params["_value"]));

  console.log("HOLAAAAAA "+JSON.stringify(storageService.getScope("userMap")));
  console.log("HOLAAAAAA "+JSON.stringify(storageService.getScope("userMapKomila")));
  //console.log("thisssssss"+JSON.stringify(this));
  }

  setDefaultName(){
    this.form.get("firstName").setValue("Yogendra");

  }

  reset(){
    this.form.reset();
  }
  addDone()
  {
    let personDetails = this.form.value;
    console.log("main number is "+this.form.get("phno.mainNumber"));
    
    console.log("sending to server "+JSON.stringify(personDetails));
    this.http.post("http://localhost:5555/addingCustomer/",(personDetails)).subscribe(()=>{
      console.log("success");
      this.router.navigateByUrl("");

    },()=>{
    console.log("error");
    })
  }

  ngOnInit() {
  }
}
