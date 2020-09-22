import { Route } from '@angular/router';
import { ReposMedicalListComponent } from './reposmedical-list/reposmedical-list.component';
import { ReposMedicalShowComponent } from './reposmedical-show/reposmedical-show.component';
import { ReposMedicalEditComponent } from './reposmedical-edit/reposmedical-edit.component';
import { ReposMedicalCloneComponent } from './reposmedical-clone/reposmedical-clone.component';

export const reposMedicalRoutes: Route = {
    path: 'reposmedical', children: [
        { path: '', component: ReposMedicalListComponent },
        { path: ':id/edit', component: ReposMedicalEditComponent },
        { path: ':id/clone', component: ReposMedicalCloneComponent },
        { path: ':id', component: ReposMedicalShowComponent }
    ]
};
