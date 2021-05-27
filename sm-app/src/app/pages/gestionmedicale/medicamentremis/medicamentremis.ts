import { Medicament } from '../../gestionstock/medicament/medicament';
import { Consultation } from '../consultation/consultation';
import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class MedicamentRemis extends BamboAbstractObject {
    quantite: string;
    medicament: Medicament;
    consultation: Consultation;
}
