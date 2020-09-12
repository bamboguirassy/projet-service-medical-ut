import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { <?= $entity_class_name ?>Service } from '../<?= strtolower($entity_class_name) ?>.service';
import { <?= $entity_class_name ?> } from '../<?= strtolower($entity_class_name) ?>';

@Component({
  selector: 'app-<?= strtolower($entity_class_name) ?>-list',
  templateUrl: './<?= strtolower($entity_class_name) ?>-list.component.html',
  styleUrls: ['./<?= strtolower($entity_class_name) ?>-list.component.scss']
})
export class <?= $entity_class_name ?>ListComponent extends BasePageComponent<<?= $entity_class_name ?>> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public <?= $entity_var_singular ?>Srv: <?= $entity_class_name ?>Service) {
    super(store, <?= $entity_var_singular ?>Srv);

    this.pageData = {
      title: '<?= $entity_class_name ?>',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des <?= strtolower($entity_class_name) ?>s'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findAll();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostDelete() {
    this.findAll();
  }

  handlePostLoad(){}

}
