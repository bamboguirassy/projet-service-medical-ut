import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { DossierService } from 'src/app/pages/gestionmedicale/dossier/dossier.service';

@Component({
  selector: 'app-dossier-search',
  templateUrl: './dossier-search.component.html',
  styleUrls: ['./dossier-search.component.scss']
})
export class DossierSearchComponent implements OnInit {
  searchTerm: any;
  datas: any;
  @Input() layout = 'horizontal';
  constructor(public router: Router,
    public dossierSrv: DossierService) { }

  ngOnInit(): void {
  }

  selectEvent(item) {
    this.router.navigate(['/'+this.layout+'/' + this.dossierSrv.getRoutePrefix() + item.id]);
    item = null;
  }

  getDossiers() {
    if(this.searchTerm.length>0 && this.searchTerm.length >= 3){
      this.dossierSrv.getDossierSearch(this.searchTerm)
        .subscribe((data: any) => {
          this.datas = data;          
        }, err => this.dossierSrv.httpSrv.catchError(err));
    }
  }

}
