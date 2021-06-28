import { InputationService } from './../inputation.service';
import { Inputation } from './../inputation';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dossier } from '../../dossier/dossier';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-imputation-dossier',
  templateUrl: './imputation-dossier.component.html',
  styleUrls: ['./imputation-dossier.component.scss']
})
export class ImputationDossierComponent implements OnInit {

  lightGradient = ['#fff', '#f79992'];
  deepGradient = ['#fff', '#d3e5d8'];
  secondViewBorder = 'error';
  @Input() imputations: Inputation[];
  @Output() onDelete: EventEmitter<boolean> = new EventEmitter();

  constructor(public inputationSrv: InputationService) { }

  ngOnInit(): void {
  }

  remove(entity: Inputation) {
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
        this.inputationSrv.remove(entity)
          .subscribe(() => {
            Swal.close();
            this.onDelete.emit();
            this.inputationSrv.toastr.success("Suppression reussie");
          });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
        this.inputationSrv.toastr.warning("Suppression annulée !");
      }
    });
  }

}
