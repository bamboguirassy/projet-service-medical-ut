const consultationColumns = [
            { header: 'Date', field: 'date', dataKey: 'date' },
            { header: 'UserEmail', field: 'userEmail', dataKey: 'userEmail' },
        ];

const allowedConsultationFieldsForFilter = [
    'date',
    'userEmail',
];

export { consultationColumns,allowedConsultationFieldsForFilter };
