import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from '../StorageService.service';
import { Http } from '@angular/http';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';




@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  name = "Yogendra";
  item : any = {};

  //github changes

form = new FormGroup({
  firstName : new FormControl('',[Validators.minLength(3),Validators.required]),
  lastName : new FormControl(),
  email : new FormControl(),
  phno : new FormGroup({
    extensionNumber : new FormControl(),
    mainNumber : new FormControl(),
  }),
  address : new FormArray([])
});

  constructor(private route : ActivatedRoute, private router : Router , public storageService : StorageService, private http : Http) {

  //console.log(JSON.stringify(route.params["_value"]));
  this.item = this.storageService.getScope("item");
  this.form.patchValue(this.item);
  for(let i of this.item.address)
    this.address.push(new FormGroup({
      city : new FormControl(i.city),
      country : new FormControl(i.country)}));

  console.log(JSON.stringify(this.item));

  }
  setDefaultName(){
    this.form.get("firstName").setValue("Yogendra");

  }

  reset(){
    this.form.reset();
  }

  get address(){
     return this.form.get("address") as FormArray;
  }

  updateDone()
  {
  var url = "http://localhost:5555/updatingCustomer/" + this.item._id;
  this.http.post(url,this.form.value).subscribe(()=>{

  console.log("success");
  this.router.navigateByUrl("");

  },()=>{

    console.log("error");

  });

  }

  ngOnInit() {
  }

}
