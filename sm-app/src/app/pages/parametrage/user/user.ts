export class User {
    id: any;
    email: string;
    username: string;
    enabled: boolean;
    password: string;
    lastLogin: string;
    confirmationToken?: string;
    passwordRequestedAt?: string;
    roles?: any;
    prenom: string;
    nom: string;
    telephone: string;
    groups: any[];
    pathImage: any;
    salt?: string;
    source: string;
    fileName?: string;
    fonction: string;
}