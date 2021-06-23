import {MesureNewComponent} from "./gestionmedicale/mesure/mesure-new/mesure-new.component";
import {MesureShowComponent} from "./gestionmedicale/mesure/mesure-show/mesure-show.component";
import {MesureEditComponent} from "./gestionmedicale/mesure/mesure-edit/mesure-edit.component";
import {MedicamentRemisEditComponent} from "./gestionmedicale/medicamentremis/medicamentremis-edit/medicamentremis-edit.component";
import {MedicamentRemisNewComponent} from "./gestionmedicale/medicamentremis/medicamentremis-new/medicamentremis-new.component";
import {MedicamentRemisListComponent} from "./gestionmedicale/medicamentremis/medicamentremis-list/medicamentremis-list.component";
import {InputationShowComponent} from "./gestionmedicale/inputation/inputation-show/inputation-show.component";
import {InputationNewComponent} from "./gestionmedicale/inputation/inputation-new/inputation-new.component";
import {InputationListComponent} from "./gestionmedicale/inputation/inputation-list/inputation-list.component";
import {InputationEditComponent} from "./gestionmedicale/inputation/inputation-edit/inputation-edit.component";
import {SymptomeNewComponent} from "./gestionmedicale/symptome/symptome-new/symptome-new.component";
import {SymptomeListComponent} from "./gestionmedicale/symptome/symptome-list/symptome-list.component";
import {ReposMedicalNewComponent} from "./gestionmedicale/reposmedical/reposmedical-new/reposmedical-new.component";
import {ConsultationShowComponent} from "./gestionmedicale/consultation/consultation-show/consultation-show.component";
import {ConsultationNewComponent} from "./gestionmedicale/consultation/consultation-new/consultation-new.component";
import {ConsultationListComponent} from "./gestionmedicale/consultation/consultation-list/consultation-list.component";
import {ConsultationEditComponent} from "./gestionmedicale/consultation/consultation-edit/consultation-edit.component";
import {DossierShowComponent} from "./gestionmedicale/dossier/dossier-show/dossier-show.component";
import {DossierNewComponent} from "./gestionmedicale/dossier/dossier-new/dossier-new.component";
import {DossierListComponent} from "./gestionmedicale/dossier/dossier-list/dossier-list.component";
import {DossierEditComponent} from "./gestionmedicale/dossier/dossier-edit/dossier-edit.component";
import {MedicamentShowComponent} from "./gestionstock/medicament/medicament-show/medicament-show.component";
import {MedicamentNewComponent} from "./gestionstock/medicament/medicament-new/medicament-new.component";
import {MedicamentListComponent} from "./gestionstock/medicament/medicament-list/medicament-list.component";
import {MedicamentEditComponent} from "./gestionstock/medicament/medicament-edit/medicament-edit.component";
import {BonReceptionNewComponent} from "./gestionstock/bonreception/bonreception-new/bonreception-new.component";
import {BonReceptionShowComponent} from "./gestionstock/bonreception/bonreception-show/bonreception-show.component";
import {BonReceptionListComponent} from "./gestionstock/bonreception/bonreception-list/bonreception-list.component";
import {BonReceptionEditComponent} from "./gestionstock/bonreception/bonreception-edit/bonreception-edit.component";
import {StructurePartenaireShowComponent} from "./parametrage/structurepartenaire/structurepartenaire-show/structurepartenaire-show.component";
import {StructurePartenaireNewComponent} from "./parametrage/structurepartenaire/structurepartenaire-new/structurepartenaire-new.component";
import {StructurePartenaireListComponent} from "./parametrage/structurepartenaire/structurepartenaire-list/structurepartenaire-list.component";
import {StructurePartenaireEditComponent} from "./parametrage/structurepartenaire/structurepartenaire-edit/structurepartenaire-edit.component";
import {PageEditAccountComponent} from "./apps/service-pages/edit-account/edit-account.component";
import {UserShowComponent} from "./parametrage/user/user-show/user-show.component";
import {UserEditComponent} from "./parametrage/user/user-edit/user-edit.component";
import {GroupNewComponent} from "./parametrage/group/group-new/group-new.component";
import {GroupListComponent} from "./parametrage/group/group-list/group-list.component";
import {GroupEditComponent} from "./parametrage/group/group-edit/group-edit.component";
import {SharedModule} from "./../shared/shared.module";
import {NgModule} from "@angular/core";
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {NgxEchartsModule} from "ngx-echarts";
import * as echarts from "echarts";
import {AgmCoreModule} from "@agm/core";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {FullCalendarModule} from "@fullcalendar/angular";
import {
  NzDatePickerModule,
  NzDividerModule,
  NzTableModule,
  NzAvatarModule,
  NzButtonModule,
  NzCardModule,
  NzCarouselModule,
  NzCollapseModule,
  NzDescriptionsModule,
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
  NzTabsModule,
  NzTypographyModule,
  NzUploadModule
} from "ng-zorro-antd";
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {environment} from "../../environments/environment";
import {UIModule} from "../ui/ui.module";
import {LayoutModule} from "../layout/layout.module";
import {BasePageComponent} from "./base-page";

import {PageDashboardComponent} from "./dashboards/dashboard-1";

import {PageUserProfileComponent} from "./apps/service-pages/user-profile";
import {PageSignInComponent} from "./apps/sessions/sign-in";
import {PageSignUpComponent} from "./apps/sessions/sign-up";
import {PageSettingsComponent} from "./settings";
import {Page404Component} from "./apps/sessions/page-404";
import {Page500Component} from "./apps/sessions/page-500";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {UserListComponent} from "./parametrage/user/user-list/user-list.component";
import {UserNewComponent} from "./parametrage/user/user-new/user-new.component";
import {GroupShowComponent} from "./parametrage/group/group-show/group-show.component";
import {DocteurEditComponent} from "./parametrage/docteur/docteur-edit/docteur-edit.component";
import {DocteurListComponent} from "./parametrage/docteur/docteur-list/docteur-list.component";
import {DocteurShowComponent} from "./parametrage/docteur/docteur-show/docteur-show.component";
import {DocteurNewComponent} from "./parametrage/docteur/docteur-new/docteur-new.component";
import {PathologieEditComponent} from "./parametrage/pathologie/pathologie-edit/pathologie-edit.component";
import {PathologieListComponent} from "./parametrage/pathologie/pathologie-list/pathologie-list.component";
import {PathologieNewComponent} from "./parametrage/pathologie/pathologie-new/pathologie-new.component";
import {PathologieShowComponent} from "./parametrage/pathologie/pathologie-show/pathologie-show.component";
import {ConsultationDossierComponent} from "./gestionmedicale/consultation/consultation-dossier/consultation-dossier.component";
import {RendezVousEditComponent} from "./gestionmedicale/rendezvous/rendezvous-edit/rendezvous-edit.component";
import {RendezVousListComponent} from "./gestionmedicale/rendezvous/rendezvous-list/rendezvous-list.component";
import {RendezVousShowComponent} from "./gestionmedicale/rendezvous/rendezvous-show/rendezvous-show.component";
import {RendezVousNewComponent} from "./gestionmedicale/rendezvous/rendezvous-new/rendezvous-new.component";
import {ReposMedicalEditComponent} from "./gestionmedicale/reposmedical/reposmedical-edit/reposmedical-edit.component";
import {ReposMedicalListComponent} from "./gestionmedicale/reposmedical/reposmedical-list/reposmedical-list.component";
import {ReposMedicalShowComponent} from "./gestionmedicale/reposmedical/reposmedical-show/reposmedical-show.component";
import {ReposMedicalDossierComponent} from "./gestionmedicale/reposmedical/repos-medical-dossier/repos-medical-dossier.component";
import {ImputationDossierComponent} from "./gestionmedicale/inputation/imputation-dossier/imputation-dossier.component";
import {RendezVousDossierComponent} from "./gestionmedicale/rendezvous/rendez-vous-dossier/rendez-vous-dossier.component";
import {SurveillancePathologiqueGeneraleComponent} from "./dashboards/surveillance-pathologique-generale/surveillance-pathologique-generale.component";
import {SurveillancePathologiqueJournaliereComponent} from "./dashboards/surveillance-pathologique-journaliere/surveillance-pathologique-journaliere.component";
import {SurveillancePathologiqueMensuelleComponent} from "./dashboards/surveillance-pathologique-mensuelle/surveillance-pathologique-mensuelle.component";
import {ConsultationMensuelleComponent} from "./dashboards/consultation-mensuelle/consultation-mensuelle.component";
import {ConsultationJournaliereComponent} from "./dashboards/consultation-journaliere/consultation-journaliere.component";
import {NgPipesModule} from "ng-pipes";
import {ChartsModule} from "ng2-charts";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    CKEditorModule,
    NgxChartsModule,
    NgxEchartsModule.forRoot({
      echarts: {
        init: echarts.init
      }
    }),
    AgmCoreModule.forRoot({apiKey: environment.googleMapApiKey}),
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
    NzBadgeModule,
    NzInputModule,
    NzListModule,
    NzModalModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzAlertModule,
    NzSelectModule,
    NzSpinModule,
    NzStatisticModule,
    NzTableModule,
    NzTabsModule,
    NzTypographyModule,
    NzUploadModule,
    NzTagModule,
    UIModule,
    LayoutModule,
    NgPipesModule,

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
    UserNewComponent,
    GroupEditComponent,
    GroupShowComponent,
    GroupListComponent,
    GroupNewComponent,
    StructurePartenaireEditComponent,
    StructurePartenaireListComponent,
    StructurePartenaireNewComponent,
    StructurePartenaireShowComponent,
    PathologieEditComponent,
    PathologieListComponent,
    PathologieNewComponent,
    PathologieShowComponent,
    DocteurEditComponent,
    DocteurListComponent,
    DocteurNewComponent,
    DocteurShowComponent,
    BonReceptionEditComponent,
    BonReceptionListComponent,
    BonReceptionNewComponent,
    BonReceptionShowComponent,
    MedicamentEditComponent,
    MedicamentListComponent,
    MedicamentNewComponent,
    MedicamentShowComponent,
    DossierEditComponent,
    DossierListComponent,
    DossierNewComponent,
    DossierShowComponent,
    ConsultationEditComponent,
    ConsultationListComponent,
    ConsultationNewComponent,
    ConsultationShowComponent,
    ConsultationDossierComponent,
    RendezVousEditComponent,
    RendezVousListComponent,
    RendezVousShowComponent,
    RendezVousNewComponent,
    ReposMedicalEditComponent,
    ReposMedicalListComponent,
    ReposMedicalShowComponent,
    ReposMedicalNewComponent,
    ReposMedicalDossierComponent,
    SymptomeListComponent,
    SymptomeNewComponent,
    InputationEditComponent,
    InputationListComponent,
    InputationNewComponent,
    InputationShowComponent,
    ImputationDossierComponent,
    RendezVousDossierComponent,
    MedicamentRemisListComponent,
    MesureEditComponent,
    MesureShowComponent,
    MesureNewComponent,
    MedicamentRemisNewComponent,
    MedicamentRemisEditComponent,
    SurveillancePathologiqueGeneraleComponent,
    SurveillancePathologiqueJournaliereComponent,
    SurveillancePathologiqueMensuelleComponent,
    ConsultationMensuelleComponent,
    ConsultationJournaliereComponent
  ],
  exports: [],
  entryComponents: []
})
export class PagesModule {}
