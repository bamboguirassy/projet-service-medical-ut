import { Route } from '@angular/router';
import { DocteurListComponent } from './docteur-list/docteur-list.component';
import { DocteurShowComponent } from './docteur-show/docteur-show.component';
import { DocteurEditComponent } from './docteur-edit/docteur-edit.component';
import { DocteurCloneComponent } from './docteur-clone/docteur-clone.component';

const docteurRoutes: Route = {
    path: 'docteur', children: [
        { path: '', component: DocteurListComponent },
        { path: ':id/edit', component: DocteurEditComponent },
        { path: ':id/clone', component: DocteurCloneComponent },
        { path: ':id', component: DocteurShowComponent }
    ]
};

export { docteurRoutes };

