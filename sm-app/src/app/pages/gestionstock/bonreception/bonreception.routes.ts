import { Route } from '@angular/router';
import { BonReceptionListComponent } from './bonreception-list/bonreception-list.component';
import { BonReceptionShowComponent } from './bonreception-show/bonreception-show.component';
import { BonReceptionEditComponent } from './bonreception-edit/bonreception-edit.component';
import { BonReceptionCloneComponent } from './bonreception-clone/bonreception-clone.component';

export const bonReceptionRoutes: Route = {
    path: 'bonreception', children: [
        { path: '', component: BonReceptionListComponent },
        { path: ':id/edit', component: BonReceptionEditComponent },
        { path: ':id/clone', component: BonReceptionCloneComponent },
        { path: ':id', component: BonReceptionShowComponent }
    ]
};

