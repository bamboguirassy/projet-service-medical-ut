import { Symptome } from './../symptome/symptome';
import { Dossier } from './../dossier/dossier';
import { Docteur } from '../../parametrage/docteur/docteur';
import { Pathologie } from '../../parametrage/pathologie/pathologie';
import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class Consultation extends BamboAbstractObject {
    date: string;
    userEmail: string;
    docteur: Docteur;
    pathologieDiagnostiquee?: Pathologie;
    dossier: Dossier;
    symptomes?: Symptome[];
}
