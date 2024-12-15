'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/features/dashboard/dashboard-layout';
import { useDashboardData } from '@/hooks/use-dashboard-data';

export default function ContinentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const region = searchParams.get('region');
  
  const { data, isLoading, error } = useDashboardData({ 
    region: region,
  });

  useEffect(() => {
    if (!region) router.push('/');
  }, [region, router]);

  return (
    <DashboardLayout
      title={`${region} Population Data`}
      chartData={data}
      chartTitle={`Population by Country in ${region}`}
      isLoading={isLoading}
      error={error}
    />
  );
}