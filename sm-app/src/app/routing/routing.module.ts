import { consultationRoutes } from './../pages/gestionmedicale/consultation/consultation.routes';
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

const VERTICAL_ROUTES: Routes = [
  { path: 'default-dashboard', component: PageDashboardComponent },

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
  consultationRoutes
  
];

const PUBLIC_ROUTES: Routes = [
  { path: 'sign-in', component: PageSignInComponent },
  { path: 'sign-up', component: PageSignUpComponent },
  { path: 'page-404', component: Page404Component },
  { path: 'page-500', component: Page500Component },
  { path: '**', component: Page404Component }
];

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/horizontal/default-dashboard',
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
