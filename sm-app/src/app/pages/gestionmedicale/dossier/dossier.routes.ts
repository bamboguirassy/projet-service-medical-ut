import { Route } from '@angular/router';
import { DossierListComponent } from './dossier-list/dossier-list.component';
import { DossierShowComponent } from './dossier-show/dossier-show.component';
import { DossierEditComponent } from './dossier-edit/dossier-edit.component';
import { DossierCloneComponent } from './dossier-clone/dossier-clone.component';

export const dossierRoutes: Route = {
    path: 'dossier', children: [
        { path: '', component: DossierListComponent },
        { path: ':id/edit', component: DossierEditComponent },
        { path: ':id/clone', component: DossierCloneComponent },
        { path: ':id', component: DossierShowComponent }
    ]
};

