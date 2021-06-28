import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';
import { BonReception } from './../bonreception/bonreception';
export class MedicamentReception extends BamboAbstractObject {
    quantite: string;
    bonReception:BonReception;
}
