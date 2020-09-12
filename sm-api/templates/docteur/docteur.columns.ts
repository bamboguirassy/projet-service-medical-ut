const docteurColumns = [
            { header: 'Prenoms', field: 'prenoms', dataKey: 'prenoms' },
            { header: 'Nom', field: 'nom', dataKey: 'nom' },
            { header: 'Specialite', field: 'specialite', dataKey: 'specialite' },
            { header: 'Filename', field: 'filename', dataKey: 'filename' },
            { header: 'Filepath', field: 'filepath', dataKey: 'filepath' },
        ];

const allowedDocteurFieldsForFilter = [
    'prenoms',
    'nom',
    'specialite',
    'filename',
    'filepath',
];

export { docteurColumns,allowedDocteurFieldsForFilter };
