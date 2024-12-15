import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DataView } from './data-view';
import { formatPopulation } from '@/lib/utils/formatters';

vi.mock('@/lib/utils/formatters', () => ({
  formatPopulation: vi.fn(population => `${population.toLocaleString()}`)
}));

describe('DataView', () => {
  const mockData = [
    { name: 'Europe', totalPopulation: 750000000 },
    { name: 'Asia', totalPopulation: 4500000000 },
    { name: 'Africa', totalPopulation: 1200000000 }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders table headers correctly', () => {
    render(<DataView data={mockData} />);
    
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('Population')).toBeInTheDocument();
  });

  it('displays total population row with correct value', () => {
    render(<DataView data={mockData} />);
    
    expect(screen.getByText('Total (All Regions)')).toBeInTheDocument();
    const totalPopulation = mockData.reduce((sum, item) => sum + item.totalPopulation, 0);
    expect(formatPopulation).toHaveBeenCalledWith(totalPopulation);
  });

  it('renders all data rows correctly', () => {
    render(<DataView data={mockData} />);
    
    mockData.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(formatPopulation).toHaveBeenCalledWith(item.totalPopulation);
    });
  });

  it('handles empty data array', () => {
    render(<DataView data={[]} />);
    
    expect(screen.getByText('Total (All Regions)')).toBeInTheDocument();
    expect(formatPopulation).toHaveBeenCalledWith(0);
    expect(screen.queryAllByRole('row')).toHaveLength(2); 
  });

  it('calculates total population correctly', () => {
    const { rerender } = render(<DataView data={mockData} />);
    
    const expectedTotal = 6450000000; 
    expect(formatPopulation).toHaveBeenCalledWith(expectedTotal);

    const newData = [{ name: 'Test', totalPopulation: 1000000 }];
    rerender(<DataView data={newData} />);
    expect(formatPopulation).toHaveBeenCalledWith(1000000);
  });

  it('renders with null data without crashing', () => {
    render(<DataView data={null as any} />);
    
    expect(screen.getByText('Total (All Regions)')).toBeInTheDocument();
    expect(formatPopulation).toHaveBeenCalledWith(0);
    expect(screen.queryAllByRole('row')).toHaveLength(2);
  });

  it('maintains table structure with large datasets', () => {
    const largeData = Array.from({ length: 100 }, (_, index) => ({
      name: `Region ${index}`,
      totalPopulation: 1000000 * (index + 1)
    }));
    
    render(<DataView data={largeData} />);
    
    expect(screen.getAllByRole('row')).toHaveLength(largeData.length + 2);
  });

  it('formats population values correctly', () => {
    vi.clearAllMocks(); 
    render(<DataView data={mockData} />);
    
    expect(formatPopulation).toHaveBeenCalledTimes(mockData.length + 1);
    
    expect(formatPopulation).toHaveBeenCalledWith(mockData.reduce((sum, item) => sum + item.totalPopulation, 0));
    mockData.forEach(item => {
      expect(formatPopulation).toHaveBeenCalledWith(item.totalPopulation);
    });
  });
});