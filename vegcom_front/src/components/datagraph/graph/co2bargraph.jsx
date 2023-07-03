import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { data } from '../data/co2bargarphdata';

const colorByType = {
    vegi: '#32CD32',
    meat: '#8B0000',
    others: '#FFA500',
    fish: '#00CED1'
};

const CO2BarGraph = () => {
    return (
        <div className="App3">
            <div className="wrapper3">
                <div className="graphContainer3">
                    <ResponsiveBar
                        data={data}
                        keys={['value']}
                        indexBy="type"
                        margin={{ top: 50, right: 40, bottom: 50, left: 60 }}
                        padding={0.3}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
                        colors={({ indexValue }) => colorByType[indexValue]}
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
                            legendPosition: 'middle',
                            legendOffset: 32,
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Kg CO2',
                            legendPosition: 'middle',
                            legendOffset: -40,
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{
                            from: 'color',
                            modifiers: [['darker', 1.6]],
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CO2BarGraph;
