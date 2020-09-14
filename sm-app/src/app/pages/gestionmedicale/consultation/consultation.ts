import { Dossier } from './../dossier/dossier';
import { Docteur } from '../../parametrage/docteur/docteur';
import { Pathologie } from '../../parametrage/pathologie/pathologie';
import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class Consultation extends BamboAbstractObject {
    date: string;
    userEmail: string;
    docteur: Docteur;
    pathologie?: Pathologie;
    dossier: Dossier;
}
