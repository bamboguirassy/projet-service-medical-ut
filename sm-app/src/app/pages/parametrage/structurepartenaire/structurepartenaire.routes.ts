import { Route } from '@angular/router';
import { StructurePartenaireListComponent } from './structurepartenaire-list/structurepartenaire-list.component';
import { StructurePartenaireShowComponent } from './structurepartenaire-show/structurepartenaire-show.component';
import { StructurePartenaireEditComponent } from './structurepartenaire-edit/structurepartenaire-edit.component';
import { StructurePartenaireCloneComponent } from './structurepartenaire-clone/structurepartenaire-clone.component';

const structurePartenaireRoutes: Route = {
    path: 'structurepartenaire', children: [
        { path: '', component: StructurePartenaireListComponent },
        { path: ':id/edit', component: StructurePartenaireEditComponent },
        { path: ':id/clone', component: StructurePartenaireCloneComponent },
        { path: ':id', component: StructurePartenaireShowComponent }
    ]
};

export { structurePartenaireRoutes };

