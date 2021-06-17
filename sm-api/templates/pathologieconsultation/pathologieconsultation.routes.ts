import { Route } from '@angular/router';
import { PathologieConsultationListComponent } from './pathologieconsultation-list/pathologieconsultation-list.component';
import { PathologieConsultationShowComponent } from './pathologieconsultation-show/pathologieconsultation-show.component';
import { PathologieConsultationEditComponent } from './pathologieconsultation-edit/pathologieconsultation-edit.component';
import { PathologieConsultationCloneComponent } from './pathologieconsultation-clone/pathologieconsultation-clone.component';

export const pathologieConsultationRoutes: Route = {
    path: 'pathologieconsultation', children: [
        { path: '', component: PathologieConsultationListComponent },
        { path: ':id/edit', component: PathologieConsultationEditComponent },
        { path: ':id/clone', component: PathologieConsultationCloneComponent },
        { path: ':id', component: PathologieConsultationShowComponent }
    ]
};
