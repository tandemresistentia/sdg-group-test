import { memo, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { formatPopulation } from '@/lib/utils/formatters';
import { RegionChartProps } from '@/types/charts';
import { motion } from 'framer-motion';

const TooltipContent = memo(({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg"
    >
      <p className="font-semibold text-gray-900 dark:text-gray-100">
        {payload[0].payload.name}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {formatPopulation(payload[0].payload.value)}
      </p>
    </motion.div>
  );
});

const TreemapContent = ({ x, y, width, height, name, value }: any) => {
  const fontSize = width < 60 || height < 60 ? 0 : width < 100 ? 11 : 13;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#3B82F6"
        fillOpacity={0.8}
        stroke="#fff"
        strokeWidth={1.5}
        rx={4}
        ry={4}
      />
      {fontSize > 0 && (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 8}
            textAnchor="middle"
            fill="#fff"
            fontSize={fontSize}
            fontWeight="500"
            className="select-none"
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 8}
            textAnchor="middle"
            fill="#fff"
            fontSize={fontSize - 1}
            fillOpacity={0.9}
            className="select-none"
          >
            {formatPopulation(value)}
          </text>
        </>
      )}
    </g>
  );
}

export const RegionChart = memo(({ data }: RegionChartProps) => {
  const chartData = useMemo(() => (
    data
      .filter(region => region.totalPopulation > 0)
      .map(region => ({
        name: region.name,
        value: region.totalPopulation
      }))
      .sort((a, b) => b.value - a.value)
  ), [data]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <Card className="p-3">
        <div className="h-[calc(60vh-4rem)] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={chartData}
              dataKey="value"
              aspectRatio={16/9}
              content={<TreemapContent />}
              animationDuration={200}
            >
              <Tooltip 
                content={<TooltipContent />}
                animationDuration={100}
              />
            </Treemap>
          </ResponsiveContainer>
        </div>
      </Card>
    </motion.div>
  );
});

RegionChart.displayName = 'RegionChart';
TooltipContent.displayName = 'TooltipContent';
TreemapContent.displayName = 'TreemapContent';