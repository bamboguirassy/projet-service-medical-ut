import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class BonReception extends BamboAbstractObject {
    date: string;
    userEmail: string;
    nom: string;
    numero: string;

    //champs temporaires
    medocs:any;
}
