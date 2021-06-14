import { Route } from '@angular/router';
import { PathologieListComponent } from './pathologie-list/pathologie-list.component';
import { PathologieShowComponent } from './pathologie-show/pathologie-show.component';
import { PathologieEditComponent } from './pathologie-edit/pathologie-edit.component';

const pathologieRoutes: Route = {
    path: 'pathologie', children: [
        { path: '', component: PathologieListComponent },
        { path: ':id/edit', component: PathologieEditComponent },
        { path: ':id', component: PathologieShowComponent }
    ]
};

export { pathologieRoutes };

