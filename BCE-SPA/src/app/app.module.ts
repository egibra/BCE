import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataService } from './_services/data.service';
import { AlertifyService } from './_services/alertify.service';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { appRoutes } from './routes';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { RecordListComponent } from './record-list/record-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RecordCardComponent } from './record-card/record-card.component';
import { RecordListResolver } from './_resolvers/record-list.resolver';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    CommentListComponent,
    RecordListComponent,
    RecordCardComponent
],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    PaginationModule.forRoot()
  ],
  providers: [ DataService,
               AlertifyService,
               RecordListResolver
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
