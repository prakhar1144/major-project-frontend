import ReactApexChart from 'react-apexcharts';

const Chart = ({ categories, series, height, type, xTitle, yTitle, xType, tooltip, dataLabels, plotOption, fills }) => {
  const options = {
    chart: {
      height,
      type
    },
    plotOptions: { ...plotOption },
    fill: { ...fills },
    dataLabels: {
      enabled: dataLabels
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
        text: xTitle,
        style: {
          color: 'white'
        }
      },
      type: xType || null,
      categories,
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
        text: yTitle,
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
    tooltip: { ...tooltip }
  };
  return <ReactApexChart options={options} series={series} type={type} height={height} />;
};

export default Chart;
