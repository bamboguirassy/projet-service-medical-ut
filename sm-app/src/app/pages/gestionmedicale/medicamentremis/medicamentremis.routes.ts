import { Route } from '@angular/router';
import { MedicamentRemisListComponent } from './medicamentremis-list/medicamentremis-list.component';
import { MedicamentRemisShowComponent } from './medicamentremis-show/medicamentremis-show.component';
import { MedicamentRemisEditComponent } from './medicamentremis-edit/medicamentremis-edit.component';

export const medicamentRemiRoutes: Route = {
    path: 'medicamentremis', children: [
        { path: '', component: MedicamentRemisListComponent },
        { path: ':id/edit', component: MedicamentRemisEditComponent },
        { path: ':id', component: MedicamentRemisShowComponent }
    ]
};
