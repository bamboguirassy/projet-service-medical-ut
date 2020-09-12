import { Route } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCloneComponent } from './user-clone/user-clone.component';
import { UserShowComponent } from './user-show/user-show.component';

const userRoutes: Route = {
    path: 'user', children: [
        { path: '', component: UserListComponent },
        { path: ':id/edit', component: UserEditComponent },
        { path: ':id/clone', component: UserCloneComponent },
        { path: ':id', component: UserShowComponent }
    ]

};

export { userRoutes }