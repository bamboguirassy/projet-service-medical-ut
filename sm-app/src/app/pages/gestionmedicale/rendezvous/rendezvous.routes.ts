import { Route } from '@angular/router';
import { RendezVousListComponent } from './rendezvous-list/rendezvous-list.component';
import { RendezVousShowComponent } from './rendezvous-show/rendezvous-show.component';
import { RendezVousEditComponent } from './rendezvous-edit/rendezvous-edit.component';

export const rendezVousRoutes: Route = {
    path: 'rendezvous', children: [
        { path: '', component: RendezVousListComponent },
        { path: ':id/edit', component: RendezVousEditComponent },
        { path: ':id', component: RendezVousShowComponent }
    ]
};
