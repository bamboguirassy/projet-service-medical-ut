const bonReceptionColumns = [
            { header: 'Date', field: 'date', dataKey: 'date' },
            { header: 'UserEmail', field: 'userEmail', dataKey: 'userEmail' },
            { header: 'Nom', field: 'nom', dataKey: 'nom' },
            { header: 'Numero', field: 'numero', dataKey: 'numero' },
        ];

const allowedBonReceptionFieldsForFilter = [
    'date',
    'userEmail',
    'nom',
    'numero',
];

export { bonReceptionColumns,allowedBonReceptionFieldsForFilter };
