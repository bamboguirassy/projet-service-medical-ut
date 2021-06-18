import { Route } from '@angular/router';
import { MesureShowComponent } from './mesure-show/mesure-show.component';
import { MesureEditComponent } from './mesure-edit/mesure-edit.component';

export const mesureRoutes: Route = {
    path: 'mesure', children: [
        { path: ':id/edit', component: MesureEditComponent },
        { path: ':id', component: MesureShowComponent }
    ]
};
