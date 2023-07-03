import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { data, sum } from '../data/piegraphdata';

const PieGraph = () => {
    return (
        <div className="App2">
            <div className="wrapper2">
                <div className="graphContainer2">
                    <ResponsivePie
                        data={data}
                        margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{
                            from: 'color',
                            modifiers: [['darker', 0.2]],
                        }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: 'color' }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: 'color',
                            modifiers: [['darker', 2]],
                        }}
                        defs={[
                            {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                            },
                        ]}
                        fill={[
                            {
                                match: {
                                    id: '농업',
                                },
                                id: 'dots',
                            },
                            {
                                match: {
                                    id: '산업공정',
                                },
                                id: 'dots',
                            },
                            {
                                match: {
                                    id: '에너지',
                                },
                                id: 'dots',
                            },
                            {
                                match: {
                                    id: '축산업',
                                },
                                id: 'dots',
                            },
                            {
                                match: {
                                    id: '폐기물',
                                },
                                id: 'lines',
                            },
                            {
                                match: {
                                    id: 'LULUCF',
                                },
                                id: 'lines',
                            },
                        ]}
                        legends={[]}
                    />
                </div>
            </div>
        </div>
    );
};

export default PieGraph;
