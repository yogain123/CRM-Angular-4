import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { StorageService } from './StorageService.service';
import { PostService } from './services/post.service';
import { IdFilterPipe } from './id-filter.pipe';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
//import { HeadComponent } from './header/head/head.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    UpdateComponent,
    HomeComponent,
    TestComponent,
    IdFilterPipe,
    HeaderComponent,
    NavbarComponent,
    //HeadComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      { path: "add", component: AddComponent },
      { path: "update", component: UpdateComponent },
      { path: "**", component: HomeComponent }

    ])
  ],
  providers: [StorageService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
