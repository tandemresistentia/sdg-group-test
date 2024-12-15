'use client';

import { DashboardLayout } from '@/components/features/dashboard/dashboard-layout';
import { useDashboardData } from '@/hooks/use-dashboard-data';

export default function HomePage() {
  const { data, isLoading, error } = useDashboardData({ 
    groupByRegion: true
  });

  return (
    <DashboardLayout
      title="World Population Overview"
      chartData={data}
      chartTitle="Population by Region"
      isLoading={isLoading}
      error={error}
    />
  );
}