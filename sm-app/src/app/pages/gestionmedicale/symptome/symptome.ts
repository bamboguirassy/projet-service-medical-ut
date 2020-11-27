import { Consultation } from './../consultation/consultation';
import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class Symptome extends BamboAbstractObject {
    nom: any;
    consultation: Consultation;
}
