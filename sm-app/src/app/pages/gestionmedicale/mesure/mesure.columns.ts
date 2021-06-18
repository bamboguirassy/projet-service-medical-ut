const mesureColumns = [
            { header: 'TensionArterielle', field: 'tensionArterielle', dataKey: 'tensionArterielle' },
            { header: 'Temperature', field: 'temperature', dataKey: 'temperature' },
            { header: 'Pouls', field: 'pouls', dataKey: 'pouls' },
            { header: 'FrequenceRespiratoire', field: 'frequenceRespiratoire', dataKey: 'frequenceRespiratoire' },
            { header: 'Poids', field: 'poids', dataKey: 'poids' },
            { header: 'Glycemie', field: 'glycemie', dataKey: 'glycemie' },
            { header: 'ExamenParacliniques', field: 'examenParacliniques', dataKey: 'examenParacliniques' },
            { header: 'ExamenCliniques', field: 'examenCliniques', dataKey: 'examenCliniques' },
        ];

const allowedMesureFieldsForFilter = [
    'tensionArterielle',
    'temperature',
    'pouls',
    'frequenceRespiratoire',
    'poids',
    'glycemie',
    'examenParacliniques',
    'examenCliniques',
];

export { mesureColumns,allowedMesureFieldsForFilter };
