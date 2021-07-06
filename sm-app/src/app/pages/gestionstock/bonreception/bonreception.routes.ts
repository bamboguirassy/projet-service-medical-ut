import { Route } from '@angular/router';
import { BonReceptionListComponent } from './bonreception-list/bonreception-list.component';
import { BonReceptionShowComponent } from './bonreception-show/bonreception-show.component';

export const bonReceptionRoutes: Route = {
    path: 'bonreception', children: [
        { path: '', component: BonReceptionListComponent },
        { path: ':id', component: BonReceptionShowComponent }
    ]
};

