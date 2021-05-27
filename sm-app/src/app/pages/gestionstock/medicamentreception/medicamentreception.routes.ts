import { Route } from '@angular/router';
import { MedicamentReceptionListComponent } from './medicamentreception-list/medicamentreception-list.component';
import { MedicamentReceptionShowComponent } from './medicamentreception-show/medicamentreception-show.component';
import { MedicamentReceptionEditComponent } from './medicamentreception-edit/medicamentreception-edit.component';
import { MedicamentReceptionCloneComponent } from './medicamentreception-clone/medicamentreception-clone.component';

export const medicamentReceptionRoutes: Route = {
    path: 'medicamentreception', children: [
        { path: '', component: MedicamentReceptionListComponent },
        { path: ':id/edit', component: MedicamentReceptionEditComponent },
        { path: ':id/clone', component: MedicamentReceptionCloneComponent },
        { path: ':id', component: MedicamentReceptionShowComponent }
    ]
};
