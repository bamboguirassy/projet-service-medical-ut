import { RendezVous } from './../rendezvous/rendezvous';
import { Medicament } from "../../gestionstock/medicament/medicament";
import { Symptome } from "../symptome/symptome";
import {BamboAbstractObject} from "./../../../shared/classes/bambo-abstract-object";

export class Mesure extends BamboAbstractObject {
  rendezVous: RendezVous;
  tensionArterielle: string;
  temperature: string;
  pouls: string;
  frequenceRespiratoire: string;
  poids: string;
  glycemie: string;
  examenParacliniques: string;
  examenCliniques: string;
  symptomes: Array<Symptome>;
  medicaments: Array<Medicament>;
}
