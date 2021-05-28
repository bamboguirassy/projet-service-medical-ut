import { ConsultationService } from './../consultation.service';
import { Consultation } from './../consultation';
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultation-dossier',
  templateUrl: './consultation-dossier.component.html',
  styleUrls: ['./consultation-dossier.component.scss']
})
export class ConsultationDossierComponent implements OnInit {

  secondViewBorder = 'success';
  @Input() consultations: Consultation[];

  constructor(public consultationSrv: ConsultationService) { }

  ngOnInit(): void {
  }

  remove(entity: Consultation) {
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
        this.consultationSrv.remove(entity)
          .subscribe(() => {
            Swal.close();
            this.consultationSrv.toastr.success("Suppression reussie");
          });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
        this.consultationSrv.toastr.warning("Suppression annulée !");
      }
    });
  }

}
