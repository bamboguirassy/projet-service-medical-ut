import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { MedicamentReceptionService } from '../medicamentreception.service';
import { MedicamentReception } from '../medicamentreception';
import { BonReception } from '../../bonreception/bonreception';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-medicamentreception-list',
  templateUrl: './medicamentreception-list.component.html',
  styleUrls: ['./medicamentreception-list.component.scss']
})
export class MedicamentReceptionListComponent extends BasePageComponent<MedicamentReception> implements OnInit, OnDestroy {
  @Input() bonReception: BonReception;
  @Input() orientation = '';
  medicamentReceptions: MedicamentReception[] = [];
  quantiteRecu: any;
  constructor(store: Store<IAppState>,
    public medicamentReceptionSrv: MedicamentReceptionService) {
    super(store, medicamentReceptionSrv);

    this.pageData = {
      title: 'Liste des médicaments réceptionnés',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des médicaments réceptionnés'
        }
      ]
    };
  }

  ngOnInit(): void {
    this.findByBonReception();
  }

  ngOnDestroy() {
  }

  handlePostDelete() {
    this.findByBonReception();
  }


  findByBonReception() {
    this.medicamentReceptionSrv.findByBonReception(this.bonReception).pipe(first())
      .subscribe((data: any) => {
        this.medicamentReceptions = data;
        this.medicamentReceptions.forEach(medicamentReception => {
          medicamentReception.actevedModifQuantite = true;
        });
      },
        error => this.medicamentReceptionSrv.httpSrv.catchError(error));
  }

  edit(medicamentReception) {
    this.medicamentReceptionSrv.update(medicamentReception).subscribe
      (() => {
        medicamentReception.actevedModifQuantite = true;
      }, err => this.medicamentReceptionSrv.httpSrv.catchError(err));
  }

  active(row) {
    row.actevedModifQuantite = false;
  }

  desactive(row) {
    row.actevedModifQuantite = true;
  }

  onCreate(item: MedicamentReception) {
    item.bonReception = this.bonReception;
    this.findByBonReception();
  }

}
