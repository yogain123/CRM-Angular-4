import { Component , ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import {StorageService} from '../StorageService.service';
import * as _ from "lodash";
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation : ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {


  @ViewChild('fileInput') fileInput;
  title = 'app';
  fakeData : any[]= [];
  searchedData :any[] = [];
  item : any = {};
  customerId : number
  customerFirstName : string;
  customerImage : string;
  imageData : any = {};
  check : boolean;
  constructor(private router : Router, public storageService : StorageService, public postService : PostService)
  {
  }

  ngOnInit() {
    console.log("inside");
    console.log("inside gettingAllCustomer");
    this.postService.getPost("http://localhost:5555/gettingAllCustomer").toPromise().then(posts=>{
    this.fakeData = posts;
    console.log("fdgdf "+JSON.stringify(this.fakeData));
    for(let z of this.fakeData)
      console.log(z._id);

      return 11

    },()=>{
      console.log("error");
    }).then((a)=>{

      console.log("2nd parameter "+a);
      return 22;

    }).then((b)=>{
      console.log("3rd parameter "+b);


    });

  }

  searchWithName = () => {

      console.log("inside searchWithName");
      let url = "http://localhost:5555/gettingSearchedCustomerWithName/" + this.customerFirstName;
      this.postService.getPost(url).subscribe(posts => {
        this.searchedData = posts;
        console.log("success");
      }, () => {
        console.log("Error");
      });

    };


    searchWithId = () => {


        console.log("inside gettingSearchedCustomer with id " + this.customerId);

        let url = "http://localhost:5555/gettingSearchedCustomer/" + this.customerId;
        this.postService.getPost(url).subscribe(data => {

          console.log("gettingSearchedCustomer " + data);
          this.item = data;
          console.log("success");
        }, () => {
          console.log("Error");
        });

      };

      add(){

        this.router.navigateByUrl("add");

        this.storageService.setScope("userMap",{name:"yogendra",age:23});

        this.storageService.setScope("userMapKomila",{name:"Komila",age:19});


      }

      delete(item)
      {
        this.item = item;
        console.log(item._id);
        var url = "http://localhost:5555/deletingCustomer/" + item._id;
        this.postService.deletePost(url).subscribe(() => {
          console.log("successDelete");
          this.ngOnInit();
        }, () => {
          console.log("Error");
        });

      }

      update(item)
      {
        this.router.navigateByUrl("update");
        this.storageService.setScope("item",item);
      }

  upload() {
   let fileBrowser = this.fileInput.nativeElement;
   var obj = {};
    console.log("type of ");
    let file = fileBrowser.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = ()=> {
      obj["name"] = file.name;
      obj["content"] = reader.result;
      console.log("onload complete");
      this.postService.createPost("http://localhost:5555/file",obj).subscribe(()=>{
        console.log("success");

      },()=>{

        console.log("failed");

      });
  }
}

searchCustomerImage()
{
  let url = "http://localhost:5555/searchImageWithName/" + this.customerImage;
  this.postService.getPost(url).subscribe(data => {

      this.imageData = data;
      console.log("success");
      if (this.imageData == "" || this.imageData == undefined || this.imageData == null)
        this.check = false;
      else {
        this.check = true;
      }
    }, () => {
      this.check = false;
      console.log("Error");
    });
}
}
