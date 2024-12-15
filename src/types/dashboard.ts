import { Country } from "./api";

export interface DashboardLayoutProps {
  title: string;
  chartData: RegionSummary[];
  chartTitle: string;
  isLoading?: boolean;  
  error?: string | null;  
}

export interface UseDashboardDataProps {
  region?: string | null;
  groupByRegion?: boolean;
}

export interface RegionSummary {
  name: string;
  totalPopulation: number;
  countries: Country[];
}

export interface RegionButtonProps {
  region: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

export interface DataViewProps {
    data: Array<{
        name: string;
        totalPopulation: number;
      }>;
}