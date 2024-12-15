export interface ChartData {
    name: string;
    totalPopulation: number;
  }
  
  export interface RegionChartProps {
    data: ChartData[];
    title: string;
    height?: number;
  }