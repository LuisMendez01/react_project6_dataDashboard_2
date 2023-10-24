import React, { Component, useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Label
  } from "recharts";

const CharacterChart = ({ comicsNum, eventsNum, seriesNum, storiesNum }) => {

    const [histData, setHistData] = useState(null);
    console.log('comicsName: ' + comicsNum);

    useEffect(() => {
        
        setHistData([{'name': 'Comics', 'number': comicsNum}, 
        {'name': 'Events', 'number': eventsNum}, 
        {'name': 'Series', 'number': seriesNum}, 
        {'name': 'Stories', 'number': storiesNum}]);

      }, []);

      const [chartType, setChartType] = useState('line');

        const toggleChartType = () => {
            setChartType(chartType === 'line' ? 'bar' : 'line');
        };

      return (
        <div 
        id="centerChart">
          {histData ? (// rendering only if API call actually returned us data
            <div>
              <div>
                <br></br>
                <h2>-Number of Comics, Events, Series, Stories this character has been participated in-</h2>
                <button id="chartBtn" onClick={toggleChartType}>Toggle Chart Type</button>
                {chartType === 'line' ? (
        <LineChart
          width={1300}
          height={400}
          data={histData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <Line type="monotone" dataKey="number" stroke="#FFA500" />
          <CartesianGrid strokeDasharray="5 5" stroke="#00FFFF" />
          <XAxis dataKey="name" stroke="#00FFFF">
            <Label value="" position="insideBottom" />
          </XAxis>
          <YAxis stroke="#00FFFF" />
          <Tooltip />
        </LineChart>
        ) : (
            <BarChart
            width={1300}
            height={400}
            data={histData}
            margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 30,
            }}
            >
            <Bar dataKey="number" fill="#FFA500" />
            <CartesianGrid strokeDasharray="5 5" stroke="#00FFFF" />
            <XAxis dataKey="name" stroke="#00FFFF">
                <Label value="" position="insideBottom" />
            </XAxis>
            <YAxis stroke="#00FFFF" />
            <Tooltip />
            </BarChart>
        )}
                </div>
            </div>
          ) : <h1>Waiting for data</h1>
          }
        </div>
      );
    
  };

export default CharacterChart;