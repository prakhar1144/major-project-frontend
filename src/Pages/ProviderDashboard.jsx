import { Container, Box, Grid, Typography, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SmartContractContext } from '../Context/SmartContract';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import Chart from './components/Chart';
import ProviderCard from './components/ProviderCard';

export default function ProviderDashboard() {
  const { currentAccount, getProviderData } = React.useContext(SmartContractContext);

  const [providerInfo, setProviderInfo] = useState(null);
  const [realtimeSeries, setRealtimeSeries] = useState([
    {
      name: 'Disco Rate',
      data: [10]
    },
    {
      name: 'Charging Rate',
      data: [11.5]
    }
  ]);
  const [realtimeCategory, setRealtimeCategory] = useState([Date.now()]);
  const [comptSeries, setComptSeries] = useState([
    {
      name: 'Charging Rate',
      data: []
    }
  ]);
  const [comptCategory, setComptCategory] = useState([Date.now()]);
  const [pieChartData, setPieData] = useState({
    colors: ['#20E647'],
    series: [67],
    options: {
      chart: {
        height: 300,
        type: 'radialBar'
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '60%',
            background: '#293450'
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: '#fff',
              fontSize: '13px'
            },
            value: {
              color: '#fff',
              fontSize: '30px',
              show: true
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          gradientToColors: ['#87D4F9'],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Usage']
    }
  });

  const getNearbyData = async () => {
    const url =
      'https://sheets.googleapis.com/v4/spreadsheets/1Wy-y0_h53ioFGRyv_1bu87dotUOOkRenBrM5Re4MuAY/values/A:G?key=AIzaSyBWkq8DAo4pLZWIGCyGVvZFfTArgf7FbVQ';
    try {
      const result = await axios.get(url);

      const tempRows = result.data.values.map((item, index) => {
        if (index > 0) {
          return { name: item[0].split(',')[0], margin: item[6] };
        }
        return {};
      });
      // console.log(rows)
      return tempRows.slice(1);
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fun = async () => {
      const data = await getProviderData();
      setProviderInfo(data);
      // console.log(data);
      const nearbyData = await getNearbyData();
      const newComptSeries = [
        {
          name: 'Charging Rate',
          data: nearbyData.map((item) => ((1 + item.margin / 100.0) * realtimeSeries[0].data[realtimeSeries[0].data.length - 1]).toFixed(2))
        }
      ];
      const newComptCategory = nearbyData.map((item) => item.name);

      setComptSeries(newComptSeries);
      setComptCategory(newComptCategory);
    };
    if (currentAccount) fun();
  }, [currentAccount]);

  let oldSeries = realtimeSeries;
  let oldCategory = realtimeCategory;
  useEffect(() => {
    const interval = setInterval(() => {
      const val = (Math.random() * 4 + 8).toFixed(2);
      const newSeries = [
        {
          name: 'Disco Rate',
          data: [...oldSeries[0].data, val]
        },
        {
          name: 'Charging Rate',
          data: [...oldSeries[1].data, (val * 1.15).toFixed(2)]
        }
      ];
      oldSeries = newSeries;
      const newCategory = [...oldCategory, Date.now()];
      oldCategory = newCategory;
      setRealtimeSeries(newSeries);
      setRealtimeCategory(newCategory);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // console.log(chartData);
  return (
    <Container sx={{ paddingTop: 2 }} maxWidth="xxl">
      <Grid container sx={{ backgroundColor: '#121243', borderRadius: '10px', p: 2, color: 'white' }} spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ textAlign: 'left', fontWeight: 'bold', pb: 2 }} variant="h5">
            Power Management Console
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body2" fontWeight={600} pb={1}>
            Realtime Pricing
          </Typography>
          <Box py={2} component={Paper} bgcolor="#242443" elevation={0}>
            <Chart
              categories={realtimeCategory}
              series={realtimeSeries}
              height={300}
              type="area"
              yTitle="Rate"
              xTitle="Time"
              xType="datetime"
              tooltip={{
                x: {
                  format: 'dd/MM/yy HH:mm'
                },
                y: {
                  formatter(val) {
                    return `₹ ${val.toFixed(2)} / KWh`;
                  }
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" fontWeight={600} pb={1}>
            My Charging Outlets
          </Typography>
          <Box component={Paper} bgcolor="#242443" elevation={0} mb={1}>
            <ProviderCard providerInfo={providerInfo} rate={realtimeSeries[1].data[realtimeSeries[1].data.length - 1]} />
          </Box>
          <Typography variant="body2" fontWeight={600} pb={1}>
            Power Usage
          </Typography>
          <Box component={Paper} bgcolor="#242443" elevation={0} mb={1}>
            <ReactApexChart options={pieChartData.options} type="radialBar" height={212} series={pieChartData.series} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" fontWeight={600} pb={1}>
            Nearby Providers
          </Typography>
          <Box component={Paper} bgcolor="#242443" elevation={0} mb={1} py={2}>
            <Chart
              categories={comptCategory}
              series={comptSeries}
              height={300}
              type="bar"
              yTitle="Rate"
              xTitle="Charging Station Name"
              dataLabels
              tooltip={{
                y: {
                  formatter(val) {
                    return `₹ ${val.toFixed(2)} / KWh`;
                  }
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
