const dossierColumns = [
            { header: 'Numero', field: 'numero', dataKey: 'numero' },
            { header: 'Prenoms', field: 'prenoms', dataKey: 'prenoms' },
            { header: 'Nom', field: 'nom', dataKey: 'nom' },
            { header: 'DateNaissance', field: 'dateNaissance', dataKey: 'dateNaissance' },
            { header: 'Cni', field: 'cni', dataKey: 'cni' },
            { header: 'Telephone', field: 'telephone', dataKey: 'telephone' },
            { header: 'TypePatient', field: 'typePatient', dataKey: 'typePatient' },
            { header: 'LienParente', field: 'lienParente', dataKey: 'lienParente' },
            { header: 'Matricule', field: 'matricule', dataKey: 'matricule' },
            { header: 'PrenomTravailleur', field: 'prenomTravailleur', dataKey: 'prenomTravailleur' },
            { header: 'NomTravailleur', field: 'nomTravailleur', dataKey: 'nomTravailleur' },
            { header: 'Genre', field: 'genre', dataKey: 'genre' },
            { header: 'DateCreation', field: 'dateCreation', dataKey: 'dateCreation' },
            { header: 'UserEmail', field: 'userEmail', dataKey: 'userEmail' },
        ];

const allowedDossierFieldsForFilter = [
    'numero',
    'prenoms',
    'nom',
    'dateNaissance',
    'cni',
    'telephone',
    'typePatient',
    'lienParente',
    'matricule',
    'prenomTravailleur',
    'nomTravailleur',
    'genre',
    'dateCreation',
    'userEmail',
];

export { dossierColumns,allowedDossierFieldsForFilter };
