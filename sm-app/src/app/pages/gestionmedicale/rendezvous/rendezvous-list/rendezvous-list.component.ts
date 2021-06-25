import {Symptome} from "./../../symptome/symptome";
import {MedicamentService} from "./../../../gestionstock/medicament/medicament.service";
import {Medicament} from "./../../../gestionstock/medicament/medicament";
import {MesureService} from "./../../mesure/mesure.service";
import {BasePageComponent} from "../../../base-page/base-page.component";
import {IAppState} from "./../../../../interfaces/app-state";
import {Component, OnInit, OnDestroy} from "@angular/core";
import {Store} from "@ngrx/store";
import {RendezVousService} from "../rendezvous.service";
import {RendezVous} from "../rendezvous";
import {DatePipe} from "@angular/common";
import {Consultation} from "../../consultation/consultation";
import {Mesure} from "../../mesure/mesure";
import {MedicamentRemisService} from "../../medicamentremis/medicamentremis.service";
import { SymptomeService } from "../../symptome/symptome.service";

@Component({selector: "app-rendezvous-list", templateUrl: "./rendezvous-list.component.html", styleUrls: ["./rendezvous-list.component.scss"]})
export class RendezVousListComponent extends BasePageComponent<RendezVous>
implements OnInit,
OnDestroy {
  dates: any;
  isEditModalVisible = false;
  isEditMesureModal: boolean = false;
  selectedItem: RendezVous;
  _consultation: Consultation;
  uncommitItem: RendezVous;
  uncommitMesure: Mesure;
  selectedMesure: Mesure;
  medicaments: Medicament[];
  symptomes: Symptome[];
  listOfSelectedMedicaments: any[] = [];
  listOfSelectedSymptomes: any[] = [];
  activateMedicamentSelectList: boolean = false;
  activateSymptomeSelectList: boolean = false;
  isLoad: boolean = false;
  newMesure: Mesure;
  isNewMesureVisible: boolean = false;
  selectedRV: RendezVous;

  constructor(store : Store<IAppState>, public medicamentSrv : MedicamentService, public symptomeSrv : SymptomeService, public rendezVousSrv : RendezVousService, public mesureSrv : MesureService, public datePipe : DatePipe) {
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
    this.findAllMedicament();
    this.findAllSymptomes();
  }
  findAllSymptomes() {
    this.symptomeSrv.findAll().subscribe((data : any) => {
      this.symptomes = data;
    }, (err) => this.medicamentSrv.httpSrv.catchError(err));
  }

  findAllMedicament() {
    this.medicamentSrv.findAll().subscribe((data : any) => {
      this.medicaments = data;
    }, (err) => this.medicamentSrv.httpSrv.catchError(err));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostDelete() {
    this.findAll();
  }

  handlePostLoad() {
    this.dates = null;
    this.items.forEach((item) => (item.expand = false));
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

  //***** RV *****

  setEditItem(item : RendezVous) {
    this.selectedItem = this.cloneItem(item);
    this.isEditModalVisible = true;
  }

  cloneItem(item : RendezVous): RendezVous {
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

  commitEditChange() {
    this.uncommitItem.dateRendezVous = this.selectedItem.dateRendezVous;
    this.uncommitItem.presence = this.selectedItem.presence;
    this.uncommitItem.description = this.selectedItem.description;
    this.rendezVousSrv.toastr.success("Modifications sont enrégistrées", "Modification");
  }

  closeEditModal() {
    this.isEditModalVisible = false;
  }

  toArray(mesure : any) {
    return [mesure];
  }

  removeMesure() {}

  //***** MESURE *****

  opendEditMesureModal(mesure : Mesure, rendezVous : RendezVous) {
    this.selectedMesure = this.cloneSelectedMesure(mesure, rendezVous);
    this.isEditMesureModal = true;
  }

  closeEditMesureModal() {
    this.isEditMesureModal = false;
  }

  cloneSelectedMesure(mesure : Mesure, rendezVous : RendezVous): Mesure {
    this.uncommitMesure = mesure;
    this.uncommitMesure.rendezVous = rendezVous;
    let clone = new Mesure();
    clone.id = mesure.id;
    clone.rendezVous = rendezVous;
    clone.examenCliniques = mesure.examenCliniques;
    clone.examenParacliniques = mesure.examenParacliniques;
    clone.frequenceRespiratoire = mesure.frequenceRespiratoire;
    clone.glycemie = mesure.glycemie;
    clone.medicaments = mesure.medicaments;
    clone.poids = mesure.poids;
    clone.pouls = mesure.pouls;
    clone.symptomes = mesure.symptomes;
    clone.temperature = mesure.temperature;
    clone.tensionArterielle = mesure.tensionArterielle;
    return clone;
  }

  commitEditMesureChange() {
    this.uncommitMesure.examenCliniques = this.selectedMesure.examenCliniques;
    this.uncommitMesure.examenParacliniques = this.selectedMesure.examenParacliniques;
    this.uncommitMesure.frequenceRespiratoire = this.selectedMesure.frequenceRespiratoire;
    this.uncommitMesure.glycemie = this.selectedMesure.glycemie;
    this.uncommitMesure.medicaments = this.selectedMesure.medicaments;
    this.uncommitMesure.poids = this.selectedMesure.poids;
    this.uncommitMesure.id = this.selectedMesure.id;
    this.uncommitMesure.pouls = this.selectedMesure.pouls;
    this.uncommitMesure.symptomes = this.selectedMesure.symptomes;
    this.uncommitMesure.temperature = this.selectedMesure.temperature;
    this.uncommitMesure.tensionArterielle = this.selectedMesure.tensionArterielle;
    this.mesureSrv.toastr.success("Modification succès.", "Success");
  }

  editMedicaments(rendezVous : RendezVous) {
    this.listOfSelectedMedicaments = [];
    rendezVous.mesure.medicaments.forEach((e : Medicament) => {
      this.listOfSelectedMedicaments.push(e.id);
    });
    this.activateMedicamentSelectList = true;
  }

  updateMedicaments(mesure : Mesure) {
    this.isLoad = true;
    this.mesureSrv.updateMedicamentsOfOnMesure(mesure, this.listOfSelectedMedicaments).subscribe((data) => {
      mesure.medicaments = [];
      Object.keys(data).map(function (key) {
        mesure.medicaments.push(data[key]);
      });
      this.isLoad = false;
      this.activateMedicamentSelectList = false;
      this.mesureSrv.toastr.success("Modification succès.", "Success");
    }, (error) => {
      console.error(error);
    });
  }

  //***** SYMPTOMES *****/

  editSymptomes(rendezVous : RendezVous) {
    this.listOfSelectedSymptomes = [];
    rendezVous.mesure.symptomes.forEach((e : Symptome) => {
      this.listOfSelectedSymptomes.push(e.id);
    });
    this.activateSymptomeSelectList = true;
  }

  updateSymptome(mesure : Mesure) {
    this.isLoad = true;
    this.mesureSrv.updateSymptomesOfOnMesure(mesure, this.listOfSelectedSymptomes).subscribe((data) => {
      mesure.symptomes = [];
      Object.keys(data).map(function (key) {
        mesure.symptomes.push(data[key]);
      });
      this.isLoad = false;
      this.activateSymptomeSelectList = false;
      this.mesureSrv.toastr.success("Modification succès.", "Success");
    }, (error) => {
      console.error(error);
    });
  }

  //****** CREATE A NEW MESURE *******/

  closeNewMesureModal(){
    this.isNewMesureVisible = false;
  }

  openNewMesureModale(rendezVous: RendezVous){
    this.selectedRV = rendezVous;
    this.newMesure = new Mesure();
    this.newMesure.rendezVous = rendezVous.id;
    this.isNewMesureVisible = true;
  }

  createMesure(mesure: Mesure){
    this.selectedRV.mesure = mesure;
  }
}
