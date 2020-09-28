import { Docteur } from './../../parametrage/docteur/docteur';
import { Dossier } from './../dossier/dossier';
import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class ReposMedical extends BamboAbstractObject {
    date: string;
    nombreJour: number;
    userEmail: string;
    dossier: Dossier;
    docteur: Docteur;
}
