import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { <?= $entity_class_name ?>Service } from '../<?= strtolower($entity_class_name) ?>.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { <?= $entity_class_name ?> } from '../<?= strtolower($entity_class_name) ?>';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-<?= strtolower($entity_class_name) ?>-show',
  templateUrl: './<?= strtolower($entity_class_name) ?>-show.component.html',
  styleUrls: ['./<?= strtolower($entity_class_name) ?>-show.component.scss']
})
export class <?= $entity_class_name ?>ShowComponent extends BasePageComponent<<?= $entity_class_name ?>> implements OnInit, OnDestroy {
  entity: <?= $entity_class_name ?>;

  constructor(store: Store<IAppState>,
    public <?= $entity_var_singular ?>Srv: <?= $entity_class_name ?>Service,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, <?= $entity_var_singular ?>Srv);
    this.pageData = {
      title: 'Détails - <?= $entity_class_name ?>',
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
          title: 'Affichage'
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
    this.title = '<?= $entity_class_name ?> - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }

}
