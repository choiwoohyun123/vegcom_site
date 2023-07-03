export const sum = 5709.07 + 548.63 + 5944.84 + 6141.64 + 8800.82 + 297.57;

export const data = [
    {
        id: '농업',
        label: '농업',
        value: ((5709.07 / sum) * 100).toFixed(2),
        color: 'hsl(122, 70%, 50%)',
    },
    {
        id: '산업공정',
        label: '산업공정',
        value: ((548.63 / sum) * 100).toFixed(2),
        color: 'hsl(124, 70%, 50%)',
    },
    {
        id: '에너지',
        label: '에너지',
        value: ((5944.84 / sum) * 100).toFixed(2),
        color: 'hsl(122, 70%, 50%)',
    },
    {
        id: '축산업',
        label: '축산업',
        value: ((6141.64 / sum) * 100).toFixed(2),
        color: 'hsl(126, 70%, 50%)',
    },
    {
        id: '폐기물',
        label: '폐기물',
        value: ((8800.82 / sum) * 100).toFixed(2),
        color: 'hsl(123, 70%, 50%)',
    },
    {
        id: 'LULUCF',
        label: 'LULUCF',
        value: ((297.57 / sum) * 100).toFixed(2),
        color: 'hsl(122, 70%, 50%)',
    },
];
