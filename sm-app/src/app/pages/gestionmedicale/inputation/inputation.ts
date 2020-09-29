import { Dossier } from './../dossier/dossier';
import { StructurePartenaire } from '../../parametrage/structurepartenaire/structurepartenaire';
import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class Inputation extends BamboAbstractObject {
    date: any;
    userEmail: string;
    dossier: Dossier;
    structureHospitaliere: StructurePartenaire;
}
