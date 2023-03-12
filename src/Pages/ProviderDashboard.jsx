import { Container, Box, Card, CardContent, Grid, Typography, Paper } from '@mui/material';
import { BigNumber, ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { SmartContractContext } from '../Context/SmartContract';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ProviderCard = (props) => {
  const { providerInfo, rate } = props;
  return (
    providerInfo && (
      <Card
        sx={{
          height: 'auto',
          margin: '0 auto',
          width: '100%',
          backgroundColor: 'transparent',
          color: 'white'
        }}
        elevation={0}
      >
        <CardContent>
          <Typography variant="body2">
            <strong>Rate: </strong>₹ {rate}
            {/* (ethers.utils.formatEther(providerInfo.rate) * 1000000000000000000).toFixed(2) */}
          </Typography>
          <Typography variant="body2">
            <strong>Location: </strong>
            {providerInfo.location}
          </Typography>
          <Typography variant="body2">
            <strong>Port Type: </strong>
            {ethers.utils.formatEther(providerInfo.availableChargingPorts) * 1000000000000000000}
          </Typography>
          <Typography variant="body2">
            <strong>Total Power Supplied: </strong>
            {(ethers.utils.formatEther(providerInfo.supplied) * 1000000000000000000).toFixed(4)} U
          </Typography>
        </CardContent>
      </Card>
    )
  );
};

export default function ProviderDashboard() {
  const { currentAccount, getProviderData } = React.useContext(SmartContractContext);

  const [providerInfo, setProviderInfo] = useState(null);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Disco Rate',
        data: [10]
      },
      {
        name: 'Charging Rate',
        data: [11.5]
      }
    ],
    options: {
      chart: {
        height: 300,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      legend: {
        show: true,
        labels: {
          useSeriesColors: true
        }
      },
      xaxis: {
        title: {
          text: 'Time',
          style: {
            color: 'white'
          }
        },
        type: 'datetime',
        categories: [],
        labels: {
          show: true,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          style: {
            colors: 'white',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label'
          }
        },
        axisBorder: {
          show: true,
          color: 'white',
          height: 1,
          width: '100%',
          offsetX: 0,
          offsetY: 0
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: 'white',
          height: 6,
          offsetX: 0,
          offsetY: 0
        },
        crosshairs: {
          show: false
        }
      },
      yaxis: {
        title: {
          text: 'Rates',
          style: {
            color: 'white'
          }
        },
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: 'white',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label'
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0
        },
        axisBorder: {
          show: true,
          color: 'white',
          offsetX: 0,
          offsetY: 0
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: 'white',
          width: 6,
          offsetX: 0,
          offsetY: 0
        },
        crosshairs: {
          show: true,
          position: 'back',
          stroke: {
            color: '#b6b6b6',
            width: 1,
            dashArray: 0
          }
        }
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
        y: {
          formatter(val) {
            return `₹ ${val.toFixed(2)} / KWh`;
          }
        }
      }
    }
  });
  const [pieChartData, setPieData] = useState({
    series: [67],
    colors: ['#20E647'],
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
  const [comptChart, setComptChart] = useState({
    series: [
      {
        name: 'Charging Rate',
        data: []
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 300
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      legend: {
        show: true,
        labels: {
          useSeriesColors: true
        }
      },
      xaxis: {
        title: {
          text: 'Charging Station Name',
          style: {
            color: 'white'
          }
        },
        categories: [],
        labels: {
          show: true,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: false,
          style: {
            colors: 'white',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label'
          }
        },
        axisBorder: {
          show: true,
          color: 'white',
          height: 1,
          width: '100%',
          offsetX: 0,
          offsetY: 0
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: 'white',
          height: 6,
          offsetX: 0,
          offsetY: 0
        },
        crosshairs: {
          show: false
        }
      },
      yaxis: {
        title: {
          text: 'Rates',
          style: {
            color: 'white'
          }
        },
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: 'white',
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label'
          },
          offsetX: 0,
          offsetY: 0,
          rotate: 0
        },
        axisBorder: {
          show: true,
          color: 'white',
          offsetX: 0,
          offsetY: 0
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: 'white',
          width: 6,
          offsetX: 0,
          offsetY: 0
        },
        crosshairs: {
          show: true,
          position: 'back',
          stroke: {
            color: '#b6b6b6',
            width: 1,
            dashArray: 0
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter(val) {
            return `₹ ${val.toFixed(2)} / KWh`;
          }
        }
      }
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
      const comptSeries = [
        {
          name: 'Charging Rate',
          data: nearbyData.map((item) =>
            ((1 + item.margin / 100.0) * chartData.series[0].data[chartData.series[0].data.length - 1]).toFixed(2)
          )
        }
      ];
      const comptCategory = nearbyData.map((item) => item.name);

      setComptChart({
        ...comptChart,
        series: comptSeries,
        options: {
          ...comptChart.options,
          xaxis: {
            ...comptChart.options.xaxis,
            categories: comptCategory
          }
        }
      });
    };
    if (currentAccount) fun();
  }, [currentAccount]);

  let oldSeries = [
    {
      name: 'Disco Rate',
      data: [10]
    },
    {
      name: 'Charging Rate',
      data: [11.5]
    }
  ];
  let oldCategory = [Date.now()];
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
      setChartData({
        ...chartData,
        series: newSeries,
        options: {
          ...chartData.options,
          xaxis: {
            ...chartData.options.xaxis,
            categories: newCategory
          }
        }
      });
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
            <ReactApexChart options={chartData.options} series={chartData.series} type="area" height={300} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="body2" fontWeight={600} pb={1}>
            My Charging Outlets
          </Typography>
          <Box component={Paper} bgcolor="#242443" elevation={0} mb={1}>
            <ProviderCard providerInfo={providerInfo} rate={chartData.series[1].data[chartData.series[1].data.length - 1]} />
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
            <ReactApexChart options={comptChart.options} series={comptChart.series} type="bar" height={300} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
