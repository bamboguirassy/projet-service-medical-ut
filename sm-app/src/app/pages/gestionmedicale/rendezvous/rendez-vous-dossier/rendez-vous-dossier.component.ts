import {Component, Input, OnInit} from "@angular/core";
import Swal from "sweetalert2";
import {RendezVous} from "../rendezvous";
import {RendezVousService} from "../rendezvous.service";
import {Consultation} from "../../consultation/consultation";
import {Medicament} from "src/app/pages/gestionstock/medicament/medicament";
import {Mesure} from "../../mesure/mesure";
import {Symptome} from "../../symptome/symptome";
import {MesureService} from "../../mesure/mesure.service";
import { SymptomeService } from "../../symptome/symptome.service";

@Component({selector: "app-rendez-vous-dossier", templateUrl: "./rendez-vous-dossier.component.html", styleUrls: ["./rendez-vous-dossier.component.scss"]})
export class RendezVousDossierComponent implements OnInit {
  lightGradient = ["#fff", "#f79992"];
  deepGradient = ["#fff", "#d3e5d8"];
  secondViewBorder = "error";
  isEditModalVisible = false;
  selectedItem: RendezVous;
  items: RendezVous[] = [];
  _consultation: Consultation;
  activateSymptomeSelectList: boolean = false;
  isLoad: boolean = false;
  selectedMesure: Mesure;
  medicaments: Medicament[];
  symptomes: Symptome[];
  listOfSelectedMedicaments: any[] = [];
  listOfSelectedSymptomes: any[] = [];
  activateMedicamentSelectList: boolean = false;
  newMesure: Mesure;
  isNewMesureVisible: boolean = false;
  selectedRV: RendezVous;
  isEditMesureModal: boolean;
  uncommitMesure: Mesure;

  @Input()set dossier(val) {
    this._consultation = val;
    this.findByConsultation();
  }

  constructor(public rendezVousSrv : RendezVousService, public symptomeSrv : SymptomeService, public mesureSrv : MesureService) {}

  ngOnInit(): void {this.findAllSymptomes();}

  findAllSymptomes() {
    this.symptomeSrv.findAll().subscribe((data : any) => {
      this.symptomes = data;
    }, (err) => this.symptomeSrv.httpSrv.catchError(err));
  }

  remove(entity : RendezVous) {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette opération est irreversible !",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Non, annuler",
      confirmButtonColor: "#d33"
    }).then((result) => {
      if (result.value) {
        this.rendezVousSrv.remove(entity).subscribe(() => {
          Swal.close();
          this.findByConsultation();
          this.rendezVousSrv.toastr.success("Suppression reussie");
        });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.close();
        this.rendezVousSrv.toastr.warning("Suppression annulée !");
      }
    });
  }

  handlePostLoad() {
    this.items.forEach((item) => (item.expand = false));
  }

  setEditItem(item : RendezVous) {
    this.selectedItem = item;
    this.isEditModalVisible = true;
  }

  findByConsultation() {
    this.rendezVousSrv.findByConsultation(this._consultation).subscribe((data : any) => {
      this.items = data;
      this.handlePostLoad();
      console.log(this.items);
    }, (err) => this.rendezVousSrv.httpSrv.catchError(err));
  }

  closeEditModal() {
    this.isEditModalVisible = false;
  }

  toArray(mesure : any) {
    let a = [];
    a.push(mesure);
    return a;
  }

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

  closeNewMesureModal() {
    this.isNewMesureVisible = false;
  }

  openNewMesureModale(rendezVous : RendezVous) {
    this.selectedRV = rendezVous;
    this.newMesure = new Mesure();
    this.newMesure.rendezVous = rendezVous.id;
    this.isNewMesureVisible = true;
  }

  createMesure(mesure : Mesure) {
    this.selectedRV.mesure = mesure;
  }
}
