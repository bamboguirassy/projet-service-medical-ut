import { Component, OnInit, OnDestroy } from '@angular/core';
import { StructurePartenaire } from '../structurepartenaire';
import { StructurePartenaireService } from '../structurepartenaire.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-structurepartenaire-edit',
  templateUrl: './structurepartenaire-edit.component.html',
  styleUrls: ['./structurepartenaire-edit.component.scss']
})
export class StructurePartenaireEditComponent extends BasePageComponent<StructurePartenaire> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
    public structurePartenaireSrv: StructurePartenaireService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, structurePartenaireSrv);
    this.pageData = {
      title: 'Modification - Structure partenaire',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des structures partenaires',
          route: '/' + this.orientation + '/structurepartenaire'
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
