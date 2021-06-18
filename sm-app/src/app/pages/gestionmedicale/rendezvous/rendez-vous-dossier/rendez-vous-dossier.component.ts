import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RendezVous } from '../rendezvous';
import { RendezVousService } from '../rendezvous.service';
import { Consultation } from '../../consultation/consultation';

@Component({
  selector: 'app-rendez-vous-dossier',
  templateUrl: './rendez-vous-dossier.component.html',
  styleUrls: ['./rendez-vous-dossier.component.scss']
})
export class RendezVousDossierComponent implements OnInit {

  lightGradient = ['#fff', '#f79992'];
  deepGradient = ['#fff', '#d3e5d8'];
  secondViewBorder = 'error';
  isEditModalVisible = false;
  selectedItem: RendezVous;
  items: RendezVous[] = [];
  _consultation: Consultation;

  @Input() set dossier(val) {
    this._consultation = val;
    this.findByConsultation();
  }

  constructor(public rendezVousSrv: RendezVousService) { }

  ngOnInit(): void {
    this.handlePostLoad();
   }

  remove(entity: RendezVous) {
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
        this.rendezVousSrv.remove(entity)
          .subscribe(() => {
            Swal.close();
            this.findByConsultation();
            this.rendezVousSrv.toastr.success('Suppression reussie');
          });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
        this.rendezVousSrv.toastr.warning('Suppression annulée !');
      }
    });
  }

  handlePostLoad() {
    this.items.forEach(item => item.expand = false);    
  }

  setEditItem(item: RendezVous) {
    this.selectedItem = item;
    this.isEditModalVisible = true;
  }

  findByConsultation() {
    this.closeEditModal();
    this.rendezVousSrv.findByConsultation(this._consultation)
      .subscribe((data: any) => {
        this.items = data;
      }, err => this.rendezVousSrv.httpSrv.catchError(err));
  }

  closeEditModal() {
    this.isEditModalVisible = false;
  }

  toArray(mesure: any){
    let a = [];
    a.push(mesure);
    return a;
  }
}
