import { SymptomeNewComponent } from './gestionmedicale/symptome/symptome-new/symptome-new.component';
import { SymptomeListComponent } from './gestionmedicale/symptome/symptome-list/symptome-list.component';
import { ReposMedicalNewComponent } from './gestionmedicale/reposmedical/reposmedical-new/reposmedical-new.component';
import { ConsultationShowComponent } from './gestionmedicale/consultation/consultation-show/consultation-show.component';
import { ConsultationNewComponent } from './gestionmedicale/consultation/consultation-new/consultation-new.component';
import { ConsultationListComponent } from './gestionmedicale/consultation/consultation-list/consultation-list.component';
import { ConsultationEditComponent } from './gestionmedicale/consultation/consultation-edit/consultation-edit.component';
import { ConsultationCloneComponent } from './gestionmedicale/consultation/consultation-clone/consultation-clone.component';
import { DossierShowComponent } from './gestionmedicale/dossier/dossier-show/dossier-show.component';
import { DossierNewComponent } from './gestionmedicale/dossier/dossier-new/dossier-new.component';
import { DossierListComponent } from './gestionmedicale/dossier/dossier-list/dossier-list.component';
import { DossierEditComponent } from './gestionmedicale/dossier/dossier-edit/dossier-edit.component';
import { DossierCloneComponent } from './gestionmedicale/dossier/dossier-clone/dossier-clone.component';
import { MedicamentShowComponent } from './gestionstock/medicament/medicament-show/medicament-show.component';
import { MedicamentNewComponent } from './gestionstock/medicament/medicament-new/medicament-new.component';
import { MedicamentListComponent } from './gestionstock/medicament/medicament-list/medicament-list.component';
import { MedicamentEditComponent } from './gestionstock/medicament/medicament-edit/medicament-edit.component';
import { MedicamentCloneComponent } from './gestionstock/medicament/medicament-clone/medicament-clone.component';
import { BonReceptionNewComponent } from './gestionstock/bonreception/bonreception-new/bonreception-new.component';
import { BonReceptionShowComponent } from './gestionstock/bonreception/bonreception-show/bonreception-show.component';
import { BonReceptionListComponent } from './gestionstock/bonreception/bonreception-list/bonreception-list.component';
import { BonReceptionEditComponent } from './gestionstock/bonreception/bonreception-edit/bonreception-edit.component';
import { BonReceptionCloneComponent } from './gestionstock/bonreception/bonreception-clone/bonreception-clone.component';
import { StructurePartenaireShowComponent } from './parametrage/structurepartenaire/structurepartenaire-show/structurepartenaire-show.component';
import { StructurePartenaireNewComponent } from './parametrage/structurepartenaire/structurepartenaire-new/structurepartenaire-new.component';
import { StructurePartenaireListComponent } from './parametrage/structurepartenaire/structurepartenaire-list/structurepartenaire-list.component';
import { StructurePartenaireEditComponent } from './parametrage/structurepartenaire/structurepartenaire-edit/structurepartenaire-edit.component';
import { StructurePartenaireCloneComponent } from './parametrage/structurepartenaire/structurepartenaire-clone/structurepartenaire-clone.component';
import { PageEditAccountComponent } from './apps/service-pages/edit-account/edit-account.component';
import { UserCloneComponent } from './parametrage/user/user-clone/user-clone.component';
import { UserShowComponent } from './parametrage/user/user-show/user-show.component';
import { UserEditComponent } from './parametrage/user/user-edit/user-edit.component';
import { GroupNewComponent } from './parametrage/group/group-new/group-new.component';
import { GroupListComponent } from './parametrage/group/group-list/group-list.component';
import { GroupEditComponent } from './parametrage/group/group-edit/group-edit.component';
import { GroupCloneComponent } from './parametrage/group/group-clone/group-clone.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { AgmCoreModule } from '@agm/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NzDatePickerModule, NzDividerModule, NzTableModule, NzAvatarModule, NzButtonModule, NzCardModule, NzCarouselModule, NzCollapseModule, NzDescriptionsModule, NzDropDownModule, NzEmptyModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzListModule, NzModalModule, NzPopconfirmModule, NzSelectModule, NzSpinModule, NzStatisticModule, NzTabsModule, NzTypographyModule, NzUploadModule } from 'ng-zorro-antd';

import { environment } from '../../environments/environment';
import { UIModule } from '../ui/ui.module';
import { LayoutModule } from '../layout/layout.module';
import { BasePageComponent } from './base-page';

import { PageDashboardComponent } from './dashboards/dashboard-1';

import { PageUserProfileComponent } from './apps/service-pages/user-profile';
import { PageSignInComponent } from './apps/sessions/sign-in';
import { PageSignUpComponent } from './apps/sessions/sign-up';
import { PageSettingsComponent } from './settings';
import { Page404Component } from './apps/sessions/page-404';
import { Page500Component } from './apps/sessions/page-500';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserListComponent } from './parametrage/user/user-list/user-list.component';
import { UserNewComponent } from './parametrage/user/user-new/user-new.component';
import { GroupShowComponent } from './parametrage/group/group-show/group-show.component';
import { DocteurCloneComponent } from './parametrage/docteur/docteur-clone/docteur-clone.component';
import { DocteurEditComponent } from './parametrage/docteur/docteur-edit/docteur-edit.component';
import { DocteurListComponent } from './parametrage/docteur/docteur-list/docteur-list.component';
import { DocteurShowComponent } from './parametrage/docteur/docteur-show/docteur-show.component';
import { DocteurNewComponent } from './parametrage/docteur/docteur-new/docteur-new.component';
import { PathologieCloneComponent } from './parametrage/pathologie/pathologie-clone/pathologie-clone.component';
import { PathologieEditComponent } from './parametrage/pathologie/pathologie-edit/pathologie-edit.component';
import { PathologieListComponent } from './parametrage/pathologie/pathologie-list/pathologie-list.component';
import { PathologieNewComponent } from './parametrage/pathologie/pathologie-new/pathologie-new.component';
import { PathologieShowComponent } from './parametrage/pathologie/pathologie-show/pathologie-show.component';
import { ConsultationDossierComponent } from './gestionmedicale/consultation/consultation-dossier/consultation-dossier.component';
import { RendezVousCloneComponent } from './gestionmedicale/rendezvous/rendezvous-clone/rendezvous-clone.component';
import { RendezVousEditComponent } from './gestionmedicale/rendezvous/rendezvous-edit/rendezvous-edit.component';
import { RendezVousListComponent } from './gestionmedicale/rendezvous/rendezvous-list/rendezvous-list.component';
import { RendezVousShowComponent } from './gestionmedicale/rendezvous/rendezvous-show/rendezvous-show.component';
import { RendezVousNewComponent } from './gestionmedicale/rendezvous/rendezvous-new/rendezvous-new.component';
import { ReposMedicalEditComponent } from './gestionmedicale/reposmedical/reposmedical-edit/reposmedical-edit.component';
import { ReposMedicalListComponent } from './gestionmedicale/reposmedical/reposmedical-list/reposmedical-list.component';
import { ReposMedicalShowComponent } from './gestionmedicale/reposmedical/reposmedical-show/reposmedical-show.component';
import { ReposMedicalCloneComponent } from './gestionmedicale/reposmedical/reposmedical-clone/reposmedical-clone.component';
import { ReposMedicalDossierComponent } from './gestionmedicale/reposmedical/repos-medical-dossier/repos-medical-dossier.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    ChartsModule,
    NgxChartsModule,
    NgxEchartsModule.forRoot({
      echarts: { init: echarts.init }
    }),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey
    }),
    LeafletModule,
    FullCalendarModule,
    NzDatePickerModule,
    NzDividerModule,
    NzTableModule,
    DragDropModule,
    NzAvatarModule,
    NzButtonModule,
    NzCardModule,
    NzCarouselModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzListModule,
    NzModalModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzSpinModule,
    NzStatisticModule,
    NzTableModule,
    NzTabsModule,
    NzTypographyModule,
    NzUploadModule,
    UIModule,
    LayoutModule,
    
    SharedModule
  ],
  declarations: [
    BasePageComponent,
    PageDashboardComponent,
    PageUserProfileComponent,
    PageEditAccountComponent,
    PageSignInComponent,
    PageSignUpComponent,
    PageSettingsComponent,
    Page404Component,
    Page500Component,
    UserListComponent,
    UserEditComponent,
    UserShowComponent,
    UserCloneComponent,
    UserNewComponent,
    GroupCloneComponent,
    GroupEditComponent,
    GroupShowComponent,
    GroupListComponent,
    GroupNewComponent,
    StructurePartenaireCloneComponent,
    StructurePartenaireEditComponent,
    StructurePartenaireListComponent,
    StructurePartenaireNewComponent,
    StructurePartenaireShowComponent,
    PathologieCloneComponent,
    PathologieEditComponent,
    PathologieListComponent,
    PathologieNewComponent,
    PathologieShowComponent,
    DocteurCloneComponent,
    DocteurEditComponent,
    DocteurListComponent,
    DocteurNewComponent,
    DocteurShowComponent,
    BonReceptionCloneComponent,
    BonReceptionEditComponent,
    BonReceptionListComponent,
    BonReceptionNewComponent,
    BonReceptionShowComponent,
    MedicamentCloneComponent,
    MedicamentEditComponent,
    MedicamentListComponent,
    MedicamentNewComponent,
    MedicamentShowComponent,
    DossierCloneComponent,
    DossierEditComponent,
    DossierListComponent,
    DossierNewComponent,
    DossierShowComponent,
    ConsultationCloneComponent,
    ConsultationEditComponent,
    ConsultationListComponent,
    ConsultationNewComponent,
    ConsultationShowComponent,
    ConsultationDossierComponent,
    RendezVousCloneComponent,
    RendezVousEditComponent,
    RendezVousListComponent,
    RendezVousShowComponent,
    RendezVousNewComponent,
    ReposMedicalEditComponent,
    ReposMedicalListComponent,
    ReposMedicalShowComponent,
    ReposMedicalCloneComponent,
    ReposMedicalNewComponent,
    ReposMedicalDossierComponent,
    SymptomeListComponent,
    SymptomeNewComponent
  ],
  exports: [ ],
  entryComponents: [ ],
})
export class PagesModule {}
