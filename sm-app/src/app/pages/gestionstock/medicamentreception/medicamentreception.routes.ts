import { Route } from '@angular/router';
import { MedicamentReceptionListComponent } from './medicamentreception-list/medicamentreception-list.component';
import { MedicamentReceptionShowComponent } from './medicamentreception-show/medicamentreception-show.component';
import { MedicamentReceptionEditComponent } from './medicamentreception-edit/medicamentreception-edit.component';

export const medicamentReceptionRoutes: Route = {
    path: 'medicamentreception', children: [
        { path: '', component: MedicamentReceptionListComponent },
        { path: ':id/edit', component: MedicamentReceptionEditComponent },
        { path: ':id', component: MedicamentReceptionShowComponent }
    ]
};
