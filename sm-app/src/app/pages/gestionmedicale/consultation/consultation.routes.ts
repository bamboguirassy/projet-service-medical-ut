import { Route } from '@angular/router';
import { ConsultationListComponent } from './consultation-list/consultation-list.component';
import { ConsultationShowComponent } from './consultation-show/consultation-show.component';
import { ConsultationEditComponent } from './consultation-edit/consultation-edit.component';
import { ConsultationCloneComponent } from './consultation-clone/consultation-clone.component';

export const consultationRoutes: Route = {
    path: 'consultation', children: [
        { path: '', component: ConsultationListComponent },
        { path: ':id/edit', component: ConsultationEditComponent },
        { path: ':id/clone', component: ConsultationCloneComponent },
        { path: ':id', component: ConsultationShowComponent }
    ]
};
