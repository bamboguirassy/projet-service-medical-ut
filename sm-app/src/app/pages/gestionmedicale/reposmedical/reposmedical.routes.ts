import { Route } from '@angular/router';
import { ReposMedicalListComponent } from './reposmedical-list/reposmedical-list.component';
import { ReposMedicalShowComponent } from './reposmedical-show/reposmedical-show.component';
import { ReposMedicalEditComponent } from './reposmedical-edit/reposmedical-edit.component';

export const reposMedicalRoutes: Route = {
    path: 'reposmedical', children: [
        { path: '', component: ReposMedicalListComponent },
        { path: ':id/edit', component: ReposMedicalEditComponent },
        { path: ':id', component: ReposMedicalShowComponent }
    ]
};
