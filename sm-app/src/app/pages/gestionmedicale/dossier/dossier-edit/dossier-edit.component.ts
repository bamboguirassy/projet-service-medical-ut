import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dossier } from '../dossier';
import { DossierService } from '../dossier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dossier-edit',
  templateUrl: './dossier-edit.component.html',
  styleUrls: ['./dossier-edit.component.scss']
})
export class DossierEditComponent extends BasePageComponent<Dossier> implements OnInit, OnDestroy {

  structures: string[] = [];
  situationMatrimoniales = [
    { value: 'mariee', label: 'Mariée' },
    { value: 'celibataire', label: 'Célibataire' },
    { value: 'veuve', label: 'Veuve' },
    { value: 'divorcee', label: 'Divorcée' },
    { value: 'separee', label: 'Séparée' },
  ];
  genreVies = [
    { value: 'tabac', label: 'Tabac' },
    { value: 'alcool', label: 'Alcool' },
    { value: 'autres', label: 'Autres' },
  ];
  niveauInstructions = [
    { value: 'non scolarisee', label: 'Non Scolarisée' },
    { value: 'primaire', label: 'Primaire' },
    { value: 'secondaire', label: 'Secondaire' },
    { value: 'superieur', label: 'Supérieur' },
  ];
  professionMaris = [
    { value: 'sans', label: 'Sans' },
    { value: 'cultivateur', label: 'Cultivateur' },
    { value: 'salarie', label: 'Salarié' },
    { value: 'compte propre', label: 'Travail à son compte propre' },
    { value: 'autres', label: 'Autres' },
  ];

  constructor(store: Store<IAppState>,
              public dossierSrv: DossierService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location, public datePipe: DatePipe) {
    super(store, dossierSrv);
    this.pageData = {
      title: 'Modification - Dossier',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des dossiers',
          route: '/' + this.orientation + '/dossier'
        },
        {
          title: 'Modification'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getStructures();
    this.findEntity(this.activatedRoute.snapshot.params.id);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
  }

  prepareUpdate() {
    this.entity.dateNaissance = this.datePipe.transform(this.entity.dateNaissance, 'yyyy-MM-dd');
  }

  handlePostUpdate() {
    this.location.back();
  }

  getStructures() {
    this.dossierSrv.httpSrv.http.get('assets/data/structures.json')
    .pipe(first())
    .subscribe((data: any) => {
      this.structures = data;
    });
  }

}
