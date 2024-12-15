import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegionSelector } from './region-selector';

const mockSetSelectedRegion = vi.fn();
let mockSelectedRegion: string | null = null;
const mockPush = vi.fn();

const mockSearchParams = new URLSearchParams();
const mockGet = vi.fn((key: string) => mockSearchParams.get(key));

vi.mock('@/store/population', () => ({
  usePopulationStore: () => ({
    selectedRegion: mockSelectedRegion,
    setSelectedRegion: mockSetSelectedRegion,
  }),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('RegionSelector', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSelectedRegion = null;
    mockSearchParams.delete('region');
  });

  describe('Initial Rendering', () => {
    it('renders all region buttons', () => {
      render(<RegionSelector />);
      
      expect(screen.getByText('All Regions')).toBeInTheDocument();
      ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].forEach(region => {
        expect(screen.getByText(region)).toBeInTheDocument();
      });
    });

    it('highlights "All Regions" when no region is selected', () => {
      render(<RegionSelector />);
      const allRegionsButton = screen.getByText('All Regions').closest('button');
      expect(allRegionsButton).toHaveClass('bg-blue-50');
    });
  });

  describe('Region Selection', () => {
    it('handles region selection correctly', async () => {
      render(<RegionSelector />);
      const user = userEvent.setup();
      
      await user.click(screen.getByText('Asia'));
      
      expect(mockSetSelectedRegion).toHaveBeenCalledWith('Asia');
      expect(mockPush).toHaveBeenCalledWith('/continents?region=Asia');
    });

    it('handles "All Regions" selection correctly', async () => {
      render(<RegionSelector />);
      const user = userEvent.setup();
      
      await user.click(screen.getByText('All Regions'));
      
      expect(mockSetSelectedRegion).toHaveBeenCalledWith('all');
      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('syncs with URL parameters on mount', () => {
      mockSearchParams.set('region', 'Americas');
      render(<RegionSelector />);
      
      expect(mockGet).toHaveBeenCalledWith('region');
      expect(mockSetSelectedRegion).toHaveBeenCalledWith('Americas');
    });
  });

  describe('Button States', () => {
    beforeEach(() => {
      mockSelectedRegion = 'Europe';
    });

    it('shows correct active and inactive states', () => {
      render(<RegionSelector />);
      
      const activeButton = screen.getByText('Europe').closest('button');
      const inactiveButton = screen.getByText('Asia').closest('button');
      
      expect(activeButton).toHaveClass('bg-blue-50');
      expect(inactiveButton).toHaveClass('bg-transparent');
    });
  });

  describe('Visual Elements', () => {
    it('renders all required icons', () => {
      render(<RegionSelector />);
      
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(6);
      
      buttons.forEach(button => {
        expect(button.querySelector('svg')).toBeInTheDocument();
      });
    });

    it('applies correct hover styles to navigation arrows', () => {
      render(<RegionSelector />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        const arrow = button.querySelector('.lucide-navigation');
        expect(arrow).toHaveClass('opacity-0 group-hover:opacity-100');
      });
    });
  });

  describe('Accessibility', () => {
    it('ensures buttons are properly configured', () => {
      render(<RegionSelector />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toBeEnabled();
      });
    });

    it('maintains text contrast in different states', () => {
      mockSelectedRegion = 'Americas';
      render(<RegionSelector />);
      
      const activeText = screen.getByText('Americas').closest('button')?.querySelector('span');
      const inactiveText = screen.getByText('Asia').closest('button')?.querySelector('span');
      
      expect(activeText).toHaveClass('text-blue-500');
      expect(inactiveText).toHaveClass('text-gray-600');
    });
  });
});