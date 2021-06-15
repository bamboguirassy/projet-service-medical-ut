import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Dossier } from '../../dossier/dossier';
import { ReposMedical } from '../reposmedical';
import { ReposMedicalService } from '../reposmedical.service';

@Component({
  selector: 'app-repos-medical-dossier',
  templateUrl: './repos-medical-dossier.component.html',
  styleUrls: ['./repos-medical-dossier.component.scss']
})
export class ReposMedicalDossierComponent implements OnInit {

  lightGradient = ['#fff', '#f79992'];
  deepGradient = ['#fff', '#d3e5d8'];
  secondViewBorder = 'error';
  isEditModalVisible = false;
  selectedItem: ReposMedical;
  items: ReposMedical[];
  _dossier: Dossier;

  @Input() set dossier(val) {
    this._dossier = val;
    this.findByDossier();
  }

  constructor(public reposMedicalSrv: ReposMedicalService) { }

  ngOnInit(): void {
  }

  remove(entity: ReposMedical) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette opération est irreversible !',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Non, annuler',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        this.reposMedicalSrv.remove(entity)
          .subscribe(() => {
            Swal.close();
            this.findByDossier();
            this.reposMedicalSrv.toastr.success("Suppression reussie");
          });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
        this.reposMedicalSrv.toastr.warning("Suppression annulée !");
      }
    });
  }

  setEditItem(item: ReposMedical) {
    this.selectedItem = item;
    this.isEditModalVisible = true;
  }

  findByDossier() {
    this.closeEditModal();
    this.reposMedicalSrv.findByDossier(this._dossier)
      .subscribe((data: any) => {
        this.items = data;
      }, err => this.reposMedicalSrv.httpSrv.catchError(err));
  }

  closeEditModal() {
    this.isEditModalVisible = false;
  }


}
