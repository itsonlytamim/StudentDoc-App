import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ManageDocumentsComponent } from './manage-documents/manage-documents.component';
import { VoterIdCardComponent } from './voter-id-card/voter-id-card.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { CvComponent } from './cv/cv.component';
import { OtherEssentialsComponent } from './other-essentials/other-essentials.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'manage-documents', component: ManageDocumentsComponent, canActivate: [AuthGuard] },
  { path: 'voter-id-card', component: VoterIdCardComponent, canActivate: [AuthGuard] },
  { path: 'certificates', component: CertificatesComponent, canActivate: [AuthGuard] },
  { path: 'cv', component: CvComponent, canActivate: [AuthGuard] },
  { path: 'other-essentials', component: OtherEssentialsComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
