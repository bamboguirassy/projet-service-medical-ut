const pathologieColumns = [
            { header: 'Nom', field: 'nom', dataKey: 'nom' },
            { header: 'Description', field: 'description', dataKey: 'description' },
        ];

const allowedPathologieFieldsForFilter = [
    'nom',
    'description',
];

export { pathologieColumns,allowedPathologieFieldsForFilter };
