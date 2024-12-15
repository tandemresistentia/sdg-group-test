import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PopulationFilter } from '@/components/features/filters/population-filter';
import { RegionSelector } from '@/components/features/navigation/region-selector';
import { RegionChart } from '@/components/features/charts/region-chart';
import { DataView } from '@/components/features/charts/data-view';
import { Globe, Users, TrendingUp } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { DashboardLayoutProps } from '@/types/dashboard';
import { BackgroundPattern } from '@/components/shared/background-pattern';
import { itemVariants } from '@/constants/constants';

export const DashboardLayout = ({ 
  title, 
  chartData, 
  chartTitle,
  isLoading = false,
  error = null 
}: DashboardLayoutProps) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-red-500">Error: {error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative">
      <BackgroundPattern />
      <motion.div 
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1
          }
        }}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-8 space-y-6 relative z-1"
      >
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-blue-500" />
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-gray-500 dark:text-gray-400">Global population statistics and trends</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <PopulationFilter />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <RegionSelector />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/30">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{chartTitle}</h3>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chart" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="chart" className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Chart View
                    </TabsTrigger>
                    <TabsTrigger value="data" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Data View
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="chart" className="p-4">
                    <RegionChart 
                      data={chartData}
                      title={chartTitle}
                    />
                  </TabsContent>
                  <TabsContent value="data" className="p-4">
                    <DataView data={chartData} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};