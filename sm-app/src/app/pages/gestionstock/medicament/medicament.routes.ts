import { Route } from '@angular/router';
import { MedicamentListComponent } from './medicament-list/medicament-list.component';
import { MedicamentShowComponent } from './medicament-show/medicament-show.component';
import { MedicamentEditComponent } from './medicament-edit/medicament-edit.component';

export const medicamentRoutes: Route = {
    path: 'medicament', children: [
        { path: '', component: MedicamentListComponent },
        { path: ':id/edit', component: MedicamentEditComponent },
        { path: ':id', component: MedicamentShowComponent }
    ]
};