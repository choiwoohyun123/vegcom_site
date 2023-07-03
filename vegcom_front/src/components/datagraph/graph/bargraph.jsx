import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

function BarGraph() {
    const data = [];

    const years = [
        '1990',
        '1991',
        '1992',
        '1993',
        '1994',
        '1995',
        '1996',
        '1997',
        '1998',
        '1999',
        '2000',
        '2001',
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
    ];
    const livestockEmissions = [
        3764.03, 3969.86, 4248.63, 4677.2699999999995, 4940.88, 5125.01, 5466.650000000001, 5519.110000000001, 5393.03,
        4809.469999999999, 4515.45, 4305.82, 4298.97, 4286.96, 4381.68, 4490.43, 4665.53, 4851.04, 5010.27, 5227.88, 5540.44,
        5337.530000000001, 5633.99, 5645.370000000001, 5784.5, 5662.78, 5647.599999999999, 5759.73, 5863.24, 5991.69,
        6141.639999999999,
    ];
    const totalEmissions = [
        30242.05, 30196.96, 29653.23, 29119.93, 29179.85, 28855.35, 29147.13, 29386.03, 28183.31, 27901.33, 27901.53, 28261.88,
        28450.51, 28447.17, 27515.22, 27523.01, 27369.15, 27204.05, 27144.6, 27173.59, 27784.33, 27860.0, 27728.88, 27537.08,
        27360.11, 27323.41, 27389.97, 27839.97, 28009.11, 27248.79, 27145.0,
    ];

    for (let i = 0; i < years.length; i++) {
        data.push({
            year: years[i],
            livestockemission: livestockEmissions[i],
            totalemission: totalEmissions[i] - livestockEmissions[i],
        });
    }

    return (
        <div style={{ width: '80vw', height: '600px' }}>
            <ResponsiveBar
                data={data}
                keys={['livestockemission', 'totalemission']}
                indexBy="year"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                valueFormat=">-~d"
                colors={{ scheme: 'pastel1' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: 'fries',
                        },
                        id: 'dots',
                    },
                    {
                        match: {
                            id: 'sandwich',
                        },
                        id: 'lines',
                    },
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Year',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Carbon Emissions',
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                labelSkipWidth={16}
                labelSkipHeight={5}
                labelTextColor={{
                    from: 'color',
                    modifiers: [['darker', 1.6]],
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={({ id, formattedValue, indexValue }) => `${id}: ${formattedValue} in year: ${indexValue}`}
            />
        </div>
    );
}

export default BarGraph;
