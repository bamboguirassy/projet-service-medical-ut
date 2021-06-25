import { Mesure } from './../mesure/mesure';
import { Consultation } from '../consultation/consultation';
import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class RendezVous extends BamboAbstractObject {
    dateCreation: string;
    userEmail: string;
    dateRendezVous: string;
    presence: string;
    description: string;
    consultation: Consultation;
    mesure: Mesure;

    // champs tmp
    expand: boolean;
}
