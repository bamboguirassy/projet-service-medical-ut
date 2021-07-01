import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';
import { BonReception } from './../bonreception/bonreception';
import { Medicament } from './../medicament/medicament';
export class MedicamentReception extends BamboAbstractObject {
    quantite: number;
    bonReception:BonReception;
    medicament:Medicament;

    //champs temporaire
    medicamentSelectionne:Medicament;
    actevedModifQuantite:boolean;

}
