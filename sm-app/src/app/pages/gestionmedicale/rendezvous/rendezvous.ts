import { Dossier } from '../dossier/dossier';
import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class RendezVous extends BamboAbstractObject {
                                dateCreation: string;
                                userEmail: string;
                                dateRendezVous: string;
                                presence: string;
                                description: string;
                                dossier:Dossier;
            }
