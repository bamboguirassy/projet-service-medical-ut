import { Route } from '@angular/router';
import { InputationListComponent } from './inputation-list/inputation-list.component';
import { InputationShowComponent } from './inputation-show/inputation-show.component';
import { InputationEditComponent } from './inputation-edit/inputation-edit.component';
import { InputationCloneComponent } from './inputation-clone/inputation-clone.component';

export const inputationRoutes: Route = {
    path: 'inputation', children: [
        { path: '', component: InputationListComponent },
        { path: ':id/edit', component: InputationEditComponent },
        { path: ':id/clone', component: InputationCloneComponent },
        { path: ':id', component: InputationShowComponent }
    ]
};
