import { Route } from '@angular/router';
import { SymptomeListComponent } from './symptome-list/symptome-list.component';
import { SymptomeShowComponent } from './symptome-show/symptome-show.component';
import { SymptomeEditComponent } from './symptome-edit/symptome-edit.component';
import { SymptomeCloneComponent } from './symptome-clone/symptome-clone.component';

export const symptomeRoutes: Route = {
    path: 'symptome', children: [
        { path: '', component: SymptomeListComponent },
        { path: ':id/edit', component: SymptomeEditComponent },
        { path: ':id/clone', component: SymptomeCloneComponent },
        { path: ':id', component: SymptomeShowComponent }
    ]
};
