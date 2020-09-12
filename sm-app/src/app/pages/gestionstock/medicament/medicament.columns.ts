const medicamentColumns = [
            { header: 'Nom', field: 'nom', dataKey: 'nom' },
            { header: 'Filename', field: 'filename', dataKey: 'filename' },
            { header: 'Filepath', field: 'filepath', dataKey: 'filepath' },
            { header: 'QuantiteStock', field: 'quantiteStock', dataKey: 'quantiteStock' },
        ];

const allowedMedicamentFieldsForFilter = [
    'nom',
    'filename',
    'filepath',
    'quantiteStock',
];

export { medicamentColumns,allowedMedicamentFieldsForFilter };
