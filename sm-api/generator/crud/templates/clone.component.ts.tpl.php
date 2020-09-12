import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { <?= $entity_class_name ?>Service } from '../<?= strtolower($entity_class_name) ?>.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { <?= $entity_class_name ?> } from '../<?= strtolower($entity_class_name) ?>';

@Component({
  selector: 'app-<?= strtolower($entity_class_name) ?>-clone',
  templateUrl: './<?= strtolower($entity_class_name) ?>-clone.component.html',
  styleUrls: ['./<?= strtolower($entity_class_name) ?>-clone.component.scss']
})
export class <?= $entity_class_name ?>CloneComponent extends BasePageComponent<<?= $entity_class_name ?>> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public <?= $entity_var_singular ?>Srv: <?= $entity_class_name ?>Service,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, <?= $entity_var_singular ?>Srv);
    this.pageData = {
      title: 'Clonage - <?= $entity_class_name ?>',
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
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.<?= $entity_var_singular ?>Srv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: <?= $entity_class_name ?>) {
    this.<?= $entity_var_singular ?>Srv.httpSrv.router.navigate([this.orientation,this.<?= $entity_var_singular ?>Srv.getRoutePrefixWithoutSlash(),data.id]);
  }

  prepareClone() {}

}

