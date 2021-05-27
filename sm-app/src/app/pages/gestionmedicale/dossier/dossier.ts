import { ReposMedical } from './../reposmedical/reposmedical';
import { Inputation } from './../inputation/inputation';
import { RendezVous } from './../rendezvous/rendezvous';
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
    reposMedicals: ReposMedical[];
    rendezVous: RendezVous[];
    inputations: Inputation[];
    historiqueMaladies: string;
    niveauInstruction: string;
    situationMatrimoniale: string;
    genreVie: string;
    professionMari: string;
    antecedentMedicaux: string;
    antecedentChurirgicaux: string;
    antecedentFamiliaux: string;
    dateMariage: string;
}
