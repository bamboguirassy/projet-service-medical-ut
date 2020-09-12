import { Route } from '@angular/router';
import { <?= $entity_class_name ?>ListComponent } from './<?= strtolower($entity_class_name) ?>-list/<?= strtolower($entity_class_name) ?>-list.component';
import { <?= $entity_class_name ?>ShowComponent } from './<?= strtolower($entity_class_name) ?>-show/<?= strtolower($entity_class_name) ?>-show.component';
import { <?= $entity_class_name ?>EditComponent } from './<?= strtolower($entity_class_name) ?>-edit/<?= strtolower($entity_class_name) ?>-edit.component';
import { <?= $entity_class_name ?>CloneComponent } from './<?= strtolower($entity_class_name) ?>-clone/<?= strtolower($entity_class_name) ?>-clone.component';

export const <?= $entity_var_singular ?>Routes: Route = {
    path: '<?= strtolower($entity_class_name) ?>', children: [
        { path: '', component: <?= $entity_class_name ?>ListComponent },
        { path: ':id/edit', component: <?= $entity_class_name ?>EditComponent },
        { path: ':id/clone', component: <?= $entity_class_name ?>CloneComponent },
        { path: ':id', component: <?= $entity_class_name ?>ShowComponent }
    ]
};
