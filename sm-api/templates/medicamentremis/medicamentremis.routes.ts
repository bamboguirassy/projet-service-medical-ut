import { Route } from '@angular/router';
import { MedicamentRemisListComponent } from './medicamentremis-list/medicamentremis-list.component';
import { MedicamentRemisShowComponent } from './medicamentremis-show/medicamentremis-show.component';
import { MedicamentRemisEditComponent } from './medicamentremis-edit/medicamentremis-edit.component';
import { MedicamentRemisCloneComponent } from './medicamentremis-clone/medicamentremis-clone.component';

export const medicamentRemiRoutes: Route = {
    path: 'medicamentremis', children: [
        { path: '', component: MedicamentRemisListComponent },
        { path: ':id/edit', component: MedicamentRemisEditComponent },
        { path: ':id/clone', component: MedicamentRemisCloneComponent },
        { path: ':id', component: MedicamentRemisShowComponent }
    ]
};
