const reposMedicalColumns = [
            { header: 'Date', field: 'date', dataKey: 'date' },
            { header: 'NombreJour', field: 'nombreJour', dataKey: 'nombreJour' },
            { header: 'UserEmail', field: 'userEmail', dataKey: 'userEmail' },
        ];

const allowedReposMedicalFieldsForFilter = [
    'date',
    'nombreJour',
    'userEmail',
];

export { reposMedicalColumns,allowedReposMedicalFieldsForFilter };
