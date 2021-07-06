import { StructurePartenaire } from './../structurepartenaire';
import { BasePageComponent } from '../../../base-page/base-page.component';
import { IAppState } from './../../../../interfaces/app-state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StructurePartenaireService } from '../structurepartenaire.service';

@Component({
  selector: 'app-structurepartenaire-list',
  templateUrl: './structurepartenaire-list.component.html',
  styleUrls: ['./structurepartenaire-list.component.scss']
})
export class StructurePartenaireListComponent extends BasePageComponent<StructurePartenaire> implements OnInit, OnDestroy {
  isEditModalVisible = false;
  selectedItem: StructurePartenaire;
  uncommitItem: StructurePartenaire;


  constructor(store: Store<IAppState>,
    public structurePartenaireSrv: StructurePartenaireService) {
    super(store, structurePartenaireSrv);

    this.pageData = {
      title: 'Liste des structures partenaires',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des structures partenaires'
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

  handlePostLoad() { }

  setEditItem(item : StructurePartenaire) {
    this.selectedItem = this.cloneItem(item);
    this.isEditModalVisible = true;
  }

  cloneItem(item : StructurePartenaire): StructurePartenaire {
    this.uncommitItem = item;
    let structure = new StructurePartenaire();
    structure.id = item.id;
    structure.nom = item.nom;
    structure.adresse = item.adresse;
    structure.telephone = item.telephone;
   
    return structure;
  }
 
  closeEditModal() {
    this.isEditModalVisible = false;
  }


}
