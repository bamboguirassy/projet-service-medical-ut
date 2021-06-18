import { Route } from '@angular/router';
import { MesureListComponent } from './mesure-list/mesure-list.component';
import { MesureShowComponent } from './mesure-show/mesure-show.component';
import { MesureEditComponent } from './mesure-edit/mesure-edit.component';
import { MesureCloneComponent } from './mesure-clone/mesure-clone.component';

export const mesureRoutes: Route = {
    path: 'mesure', children: [
        { path: '', component: MesureListComponent },
        { path: ':id/edit', component: MesureEditComponent },
        { path: ':id/clone', component: MesureCloneComponent },
        { path: ':id', component: MesureShowComponent }
    ]
};
