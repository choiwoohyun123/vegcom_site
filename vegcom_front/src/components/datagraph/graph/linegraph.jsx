import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import './linegraph.css';
import { data1, data2, years, livestockEmissions, totalEmissions} from '../data/linegraphdata';


for (let i = 0; i < years.length; i++) {
    data1[0].data.push({
        x: years[i],
        y: livestockEmissions[i],
    });
    data2[0].data.push({ x: years[i], y: totalEmissions[i] });
}

const SecondGraph = () => {
    return (
        <ResponsiveLine
            data={data2}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 26500,
                max: 32500,
                stacked: true,
                reverse: false,
            }}
            axisTop={null}
            axisLeft={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'year',
                legendOffset: 36,
                legendPosition: 'middle',
            }}
            axisRight={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'emissions',
                legendOffset: -40,
                legendPosition: 'middle',
            }}
            colors={{ scheme: 'accent' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    justify: false,
                    translateX: 130,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

function LineGraph() {
    return (
        <div className="App">
            <div className="wrapper flex">
                <div className="graphContainer">
                    <ResponsiveLine
                        data={data1}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{
                            type: 'linear',
                            min: 3600,
                            max: 6000,
                            stacked: true,
                            reverse: false,
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={null}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: '배출량',
                            legendOffset: -40,
                            legendPosition: 'middle',
                        }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        colors={{ scheme: 'set1' }}
                        legends={[
                            {
                                anchor: 'top-left',
                                direction: 'column',
                                justify: false,
                                translateX: 5,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: 'rgba(0, 0, 0, .03)',
                                            itemOpacity: 1,
                                        },
                                    },
                                ],
                            },
                        ]}
                    />
                </div>
                <div className="secondGraph">
                    <SecondGraph />
                </div>
            </div>
        </div>
    );
}

export default LineGraph;
