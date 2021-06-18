import {BasePageComponent} from "../../../base-page/base-page.component";
import {IAppState} from "./../../../../interfaces/app-state";
import {Component, OnInit, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {RendezVousService} from "../rendezvous.service";
import {RendezVous} from "../rendezvous";
import {DatePipe} from "@angular/common";
import {Consultation} from "../../consultation/consultation";

@Component({selector: "app-rendezvous-list", templateUrl: "./rendezvous-list.component.html", styleUrls: ["./rendezvous-list.component.scss"]})
export class RendezVousListComponent extends BasePageComponent<RendezVous> implements OnInit,
OnDestroy {
  dates: any;
  isEditModalVisible = false;
  selectedItem: RendezVous;
  _consultation: Consultation;
  uncommitItem: RendezVous;

  constructor(store : Store<IAppState>, public rendezVousSrv : RendezVousService, public datePipe : DatePipe) {
    super(store, rendezVousSrv);

    this.pageData = {
      title: "Liste des rendez-vous",
      breadcrumbs: [
        {
          title: "Accueil",
          route: ""
        }, {
          title: "Liste des rendez-vous"
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

  handlePostLoad() {
    this.dates = null;
    this.items.forEach(item => item.expand = false);
    console.log("RV;;;;;;", this.items);
    
  }

  filter() {
    let formattedDate = {
      startDate: null,
      endDate: null
    };
    formattedDate.startDate = this.datePipe.transform(this.dates[0], "yyyy-MM-dd");
    formattedDate.endDate = this.datePipe.transform(this.dates[1], "yyyy-MM-dd");
    this.rendezVousSrv.findByDate(formattedDate).subscribe((data : any) => {
      this.items = data;
    }, (err) => this.rendezVousSrv.httpSrv.catchError(err));
  }

  setEditItem(item : RendezVous) {
    this.selectedItem = this.cloneItem(item);
    this.isEditModalVisible = true;
  }

  cloneItem(item: RendezVous): RendezVous {
    this.uncommitItem = item;
    let clone = new RendezVous();
    clone.consultation = item.consultation;
    clone.dateCreation = item.dateCreation;
    clone.dateRendezVous = item.dateRendezVous;
    clone.id = item.id;
    clone.presence = item.presence;
    clone.userEmail = item.userEmail;
    clone.description = item.description;
    return clone;
  }

  commitEditChange(){
    this.uncommitItem.dateRendezVous = this.selectedItem.dateRendezVous;
    this.uncommitItem.presence = this.selectedItem.presence;
    this.uncommitItem.description = this.selectedItem.description;
    this.rendezVousSrv.toastr.success("Modifications sont enrégistrées", "Modification" )
  }
  
  closeEditModal() {
    this.isEditModalVisible = false;
  }

  toArray(mesure: any){
    console.log("MESURE::::", mesure);
    
    let a = [];
    a.push(mesure);
    return a;
  }
}
