import { MedicamentRemis } from './../medicamentremis/medicamentremis';
import { Symptome } from './../symptome/symptome';
import { Dossier } from './../dossier/dossier';
import { Docteur } from '../../parametrage/docteur/docteur';
import { Pathologie } from '../../parametrage/pathologie/pathologie';
import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class Consultation extends BamboAbstractObject {
    date: any;
    userEmail: string;
    docteur: Docteur;
    dossier: Dossier;
    symptomes?: Symptome[];
    medicamentRemis?: MedicamentRemis[];
    medicamentPrescrits?: string;
    motifConsultations?: string;
    examenCliniques?: string;
    examenParacliniques?: string;
    tensionArterielle: string;
    temperature: string;
    pouls: string;
    frequenceRespiratoire: string;
    poids: string;
    glycemie: string;
    pathologies: any[];
}
