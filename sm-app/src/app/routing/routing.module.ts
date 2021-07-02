import { ResetPasswordComponent } from './../pages/apps/sessions/reset-password/reset-password.component';
import { mesureRoutes } from './../pages/gestionmedicale/mesure/mesure.routes';
import { ConsultationJournaliereComponent } from './../pages/dashboards/consultation-journaliere/consultation-journaliere.component';
import { SurveillancePathologiqueGeneraleComponent } from './../pages/dashboards/surveillance-pathologique-generale/surveillance-pathologique-generale.component';
import { inputationRoutes } from './../pages/gestionmedicale/inputation/inputation.routes';
import { reposMedicalRoutes } from './../pages/gestionmedicale/reposmedical/reposmedical.routes';
import { consultationRoutes } from './../pages/gestionmedicale/consultation/consultation.routes';
import { rendezVousRoutes } from './../pages/gestionmedicale/rendezvous/rendezvous.routes';
import { dossierRoutes } from './../pages/gestionmedicale/dossier/dossier.routes';
import { medicamentRoutes } from './../pages/gestionstock/medicament/medicament.routes';
import { bonReceptionRoutes } from './../pages/gestionstock/bonreception/bonreception.routes';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerticalLayoutComponent } from '../layout/vertical';
import { HorizontalLayoutComponent } from '../layout/horizontal';
import { PublicLayoutComponent } from '../layout/public';

import { PageDashboardComponent } from '../pages/dashboards/dashboard-1';
import { PageUserProfileComponent } from '../pages/apps/service-pages/user-profile';
import { PageSignInComponent } from '../pages/apps/sessions/sign-in';
import { PageSignUpComponent } from '../pages/apps/sessions/sign-up';
import { PageSettingsComponent } from '../pages/settings';
import { Page404Component } from '../pages/apps/sessions/page-404';
import { Page500Component } from '../pages/apps/sessions/page-500';
import { userRoutes } from '../pages/parametrage/user/user.routes';
import { groupRoutes } from '../pages/parametrage/group/group.routes';
import { docteurRoutes } from '../pages/parametrage/docteur/docteur.routes';
import { pathologieRoutes } from '../pages/parametrage/pathologie/pathologie.routes';
import { structurePartenaireRoutes } from '../pages/parametrage/structurepartenaire/structurepartenaire.routes';
import { PageEditAccountComponent } from '../pages/apps/service-pages/edit-account/edit-account.component';
import { SurveillancePathologiqueJournaliereComponent } from '../pages/dashboards/surveillance-pathologique-journaliere/surveillance-pathologique-journaliere.component';
import { SurveillancePathologiqueMensuelleComponent } from '../pages/dashboards/surveillance-pathologique-mensuelle/surveillance-pathologique-mensuelle.component';
import { ConsultationMensuelleComponent } from '../pages/dashboards/consultation-mensuelle/consultation-mensuelle.component';
import { ImputationMensuelleComponent } from '../pages/dashboards/imputation-mensuelle/imputation-mensuelle.component';
import { ImputationJournaliereComponent } from '../pages/dashboards/imputation-journaliere/imputation-journaliere.component';

const VERTICAL_ROUTES: Routes = [
  { path: 'default-dashboard', component: PageDashboardComponent },
  { path: 'surv-path-gen', component: SurveillancePathologiqueGeneraleComponent },
  { path: 'surv-path-journ', component: SurveillancePathologiqueJournaliereComponent },
  { path: 'surv-path-mens', component: SurveillancePathologiqueMensuelleComponent },
  { path: 'cons-mens', component: ConsultationMensuelleComponent },
  { path: 'cons-jour', component: ConsultationJournaliereComponent },
  { path: 'impu-mens', component: ImputationMensuelleComponent },
  { path: 'impu-jour', component: ImputationJournaliereComponent },

  { path: 'edit-account', component: PageEditAccountComponent },
  { path: 'user-profile', component: PageUserProfileComponent },
  { path: 'settings', component: PageSettingsComponent },
  userRoutes,
  groupRoutes,
  structurePartenaireRoutes,
  docteurRoutes,
  pathologieRoutes,
  bonReceptionRoutes,
  medicamentRoutes,
  dossierRoutes,
  consultationRoutes,
  rendezVousRoutes,
  reposMedicalRoutes,
  inputationRoutes,
  mesureRoutes

];

const PUBLIC_ROUTES: Routes = [
  { path: 'sign-in', component: PageSignInComponent },
  { path: 'sign-up', component: PageSignUpComponent },
  // { path: 'new-password/:token', component: ResetPasswordComponent },
  { path: 'new-password/:email/:token', component: ResetPasswordComponent },
  { path: 'page-404', component: Page404Component },
  { path: 'page-500', component: Page500Component },
  { path: '**', component: Page404Component }
];

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/horizontal/cons-jour',
    pathMatch: 'full'
  },
  {
    path: 'vertical',
    component: VerticalLayoutComponent,
    children: VERTICAL_ROUTES
  },
  {
    path: 'horizontal',
    component: HorizontalLayoutComponent,
    children: VERTICAL_ROUTES
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: PUBLIC_ROUTES
  },
  {
    path: '**',
    component: PublicLayoutComponent,
    children: PUBLIC_ROUTES
  }
];

@NgModule({
  imports: [

  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
