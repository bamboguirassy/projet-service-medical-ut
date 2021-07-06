import { Component, OnInit, OnDestroy, Input, ViewChild, ViewChildren, Output, EventEmitter, ElementRef } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { BonReceptionService } from '../bonreception.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BonReception } from '../bonreception';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-bonreception-show',
  templateUrl: './bonreception-show.component.html',
  styleUrls: ['./bonreception-show.component.scss']
})
export class BonReceptionShowComponent extends BasePageComponent<BonReception> implements OnInit, OnDestroy {
  entity: BonReception;
  isEditModalVisible = false;
  @Input() isModalVisible = false;

  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChildren('form') form;
  constructor(store: Store<IAppState>,
    public bonReceptionSrv: BonReceptionService,
    private activatedRoute: ActivatedRoute,
    public location: Location, public datePipe: DatePipe) {
    super(store, bonReceptionSrv);
    this.pageData = {
      title: 'Détails - Bon de réception',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des bons de Réceptions',
          route: '/' + this.orientation + '/bonreception'
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
    this.title = 'Bon de réception - ' + this.entity?.numero;
  }

  handlePostDelete() {
    this.location.back();
  }

  updateItem() {
    this.entity.date = this.datePipe.transform(this.entity.date, 'yyyy-MM-dd');
    this.bonReceptionSrv.update(this.entity).subscribe((data: any) => {
      this.closeModal();
    });
  }

  // open modal window
  openModal() {
    this.isModalVisible = true;
  }

  // close modal window
  closeModal() {
    this.isModalVisible = false;
  }

}
