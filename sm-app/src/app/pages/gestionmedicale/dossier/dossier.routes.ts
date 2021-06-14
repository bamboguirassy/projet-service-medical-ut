import { Route } from '@angular/router';
import { DossierListComponent } from './dossier-list/dossier-list.component';
import { DossierShowComponent } from './dossier-show/dossier-show.component';
import { DossierEditComponent } from './dossier-edit/dossier-edit.component';

export const dossierRoutes: Route = {
    path: 'dossier', children: [
        { path: '', component: DossierListComponent },
        { path: ':id/edit', component: DossierEditComponent },
        { path: ':id', component: DossierShowComponent }
    ]
};

