import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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
  @Input() reposMedicals: ReposMedical[];

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

}
