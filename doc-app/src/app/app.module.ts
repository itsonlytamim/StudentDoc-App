import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ManageDocumentsComponent } from './manage-documents/manage-documents.component';
import { VoterIdCardComponent } from './voter-id-card/voter-id-card.component'; 
import { DocumentService } from './document.service';
import { CertificatesComponent } from './certificates/certificates.component';
import { CvComponent } from './cv/cv.component';
import { OtherEssentialsComponent } from './other-essentials/other-essentials.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ManageDocumentsComponent,
    VoterIdCardComponent,
    CertificatesComponent,
    CvComponent,
    OtherEssentialsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
