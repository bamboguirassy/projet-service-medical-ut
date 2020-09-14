import { Consultation } from './../consultation/consultation';
import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class Dossier extends BamboAbstractObject {
    numero: string;
    prenoms: string;
    nom: string;
    dateNaissance: string;
    cni: string;
    telephone: string;
    typePatient: string;
    lienParente: string;
    matricule: string;
    prenomTravailleur: string;
    nomTravailleur: string;
    genre: string;
    dateCreation: string;
    userEmail: string;
    etat: boolean;
    structure: string;
    consultations: Consultation[];
}
