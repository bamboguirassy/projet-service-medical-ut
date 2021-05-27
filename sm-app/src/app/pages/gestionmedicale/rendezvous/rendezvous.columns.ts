const rendezVousColumns = [
            { header: 'DateCreation', field: 'dateCreation', dataKey: 'dateCreation' },
            { header: 'UserEmail', field: 'userEmail', dataKey: 'userEmail' },
            { header: 'DateRendezVous', field: 'dateRendezVous', dataKey: 'dateRendezVous' },
            { header: 'Presence', field: 'presence', dataKey: 'presence' },
            { header: 'Description', field: 'description', dataKey: 'description' },
        ];

const allowedRendezVousFieldsForFilter = [
    'dateCreation',
    'userEmail',
    'dateRendezVous',
    'presence',
    'description',
];

export { rendezVousColumns,allowedRendezVousFieldsForFilter };
