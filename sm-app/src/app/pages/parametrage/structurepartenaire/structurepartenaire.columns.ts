const structurePartenaireColumns = [
            { header: 'Nom', field: 'nom', dataKey: 'nom' },
            { header: 'Adresse', field: 'adresse', dataKey: 'adresse' },
            { header: 'Telephone', field: 'telephone', dataKey: 'telephone' },
        ];

const allowedStructurePartenaireFieldsForFilter = [
    'nom',
    'adresse',
    'telephone',
];

export { structurePartenaireColumns,allowedStructurePartenaireFieldsForFilter };
