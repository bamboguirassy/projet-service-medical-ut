import { Component, OnInit, OnDestroy } from '@angular/core';
import { <?= $entity_class_name ?> } from '../<?= strtolower($entity_class_name) ?>';
import { <?= $entity_class_name ?>Service } from '../<?= strtolower($entity_class_name) ?>.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-<?= strtolower($entity_class_name) ?>-edit',
  templateUrl: './<?= strtolower($entity_class_name) ?>-edit.component.html',
  styleUrls: ['./<?= strtolower($entity_class_name) ?>-edit.component.scss']
})
export class <?= $entity_class_name ?>EditComponent extends BasePageComponent<<?= $entity_class_name ?>> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public <?= $entity_var_singular ?>Srv: <?= $entity_class_name ?>Service,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, <?= $entity_var_singular ?>Srv);
    this.pageData = {
      title: 'Modification - <?= $entity_class_name ?>',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: '<?= $entity_class_name ?>s',
          route: '/'+this.orientation+'/<?= strtolower($entity_class_name) ?>'
        },
        {
          title: 'Modification'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findEntity(this.activatedRoute.snapshot.params.id);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
  }

  prepareUpdate() {
  }

  handlePostUpdate() {
    this.location.back();
  }

}
