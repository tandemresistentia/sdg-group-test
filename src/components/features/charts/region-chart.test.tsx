import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RegionChart } from './region-chart';
import { formatPopulation } from '@/lib/utils/formatters';

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Treemap: ({ children, data }: { children: React.ReactNode; data: any[] }) => (
    <div data-testid="treemap">
      {data.map((item) => (
        <div key={item.name} data-value={item.value}>
          {item.name}
        </div>
      ))}
      {children}
    </div>
  ),
  Tooltip: ({ content }: { content: React.ReactNode }) => <div>{content}</div>,
}));

vi.mock('@/components/ui/card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
  },
}));

vi.mock('@/lib/utils/formatters', () => ({
  formatPopulation: vi.fn((value) => `${value.toLocaleString()} people`),
}));

describe('RegionChart', () => {
  const mockData = [
    { name: 'Region A', totalPopulation: 1000000 },
    { name: 'Region B', totalPopulation: 2000000 },
    { name: 'Region C', totalPopulation: 0 }, 
    { name: 'Region D', totalPopulation: 500000 },
  ];

  it('renders without crashing', () => {
    render(<RegionChart data={mockData} title="Test Chart" />);
    expect(screen.getByTestId('treemap')).toBeInTheDocument();
  });

  it('filters out regions with zero population', () => {
    render(<RegionChart data={mockData} title="Test Chart" />);
    expect(screen.queryByText('Region C')).not.toBeInTheDocument();
  });

  it('sorts regions by population in descending order', () => {
    render(<RegionChart data={mockData} title="Test Chart" />);
    const regions = screen.getAllByText(/Region [A-D]/);
    expect(regions[0].textContent).toBe('Region B'); 
    expect(regions[2].textContent).toBe('Region D'); 
  });
});
