import { Route } from '@angular/router';
import { MedicamentListComponent } from './medicament-list/medicament-list.component';
import { MedicamentShowComponent } from './medicament-show/medicament-show.component';
import { MedicamentEditComponent } from './medicament-edit/medicament-edit.component';
import { MedicamentCloneComponent } from './medicament-clone/medicament-clone.component';

const medicamentRoutes: Route = {
    path: 'medicament', children: [
        { path: '', component: MedicamentListComponent },
        { path: ':id/edit', component: MedicamentEditComponent },
        { path: ':id/clone', component: MedicamentCloneComponent },
        { path: ':id', component: MedicamentShowComponent }
    ]
};

export { medicamentRoutes };

