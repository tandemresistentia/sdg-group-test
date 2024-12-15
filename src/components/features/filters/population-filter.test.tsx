import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PopulationFilter } from './population-filter';
import { usePopulationStore } from '@/store/population';
import { MILLION, STEP, MIN_VALUE, MAX_VALUE } from '@/constants/constants';

vi.mock('@/store/population', () => ({
  usePopulationStore: vi.fn()
}));

describe('PopulationFilter', () => {
  const mockSetPopulationFilter = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    (usePopulationStore as any).mockReturnValue({
      populationFilter: null,
      setPopulationFilter: mockSetPopulationFilter
    });
  });

  it('renders with initial empty state', () => {
    render(<PopulationFilter />);
    
    expect(screen.getByLabelText(/minimum population/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0')).toHaveValue(null);
    expect(screen.getByText(/million/i)).toBeInTheDocument();
  });
  
  it('increments value when up button is clicked', () => {
    render(<PopulationFilter />);
    const incrementButton = screen.getByLabelText('Increase value');
    
    fireEvent.click(incrementButton);
    
    expect(mockSetPopulationFilter).toHaveBeenCalledWith(STEP * MILLION);
  });

  it('decrements value when down button is clicked', () => {
    (usePopulationStore as any).mockReturnValue({
      populationFilter: 20 * MILLION,
      setPopulationFilter: mockSetPopulationFilter
    });
    
    render(<PopulationFilter />);
    const decrementButton = screen.getByLabelText('Decrease value');
    
    fireEvent.click(decrementButton);
    
    expect(mockSetPopulationFilter).toHaveBeenCalledWith(10 * MILLION);
  });

  it('prevents decrementing below minimum value', () => {
    (usePopulationStore as any).mockReturnValue({
      populationFilter: MIN_VALUE,
      setPopulationFilter: mockSetPopulationFilter
    });
    
    render(<PopulationFilter />);
    const decrementButton = screen.getByLabelText('Decrease value');
    
    expect(decrementButton).toBeDisabled();
  });

  it('caps input at maximum value', () => {
    render(<PopulationFilter />);
    const input = screen.getByRole('spinbutton');
    
    fireEvent.change(input, { target: { value: String(MAX_VALUE + 100) } });
    
    expect(mockSetPopulationFilter).toHaveBeenCalledWith(MAX_VALUE * MILLION);
  });

  it('displays formatted population value', async () => {
    (usePopulationStore as any).mockReturnValue({
      populationFilter: 50 * MILLION,
      setPopulationFilter: mockSetPopulationFilter
    });
    
    render(<PopulationFilter />);
    
    await waitFor(() => {
      expect(screen.getByText('50.0M people')).toBeInTheDocument();
    });
  });

  it('clears input when empty string is entered', async () => {
    (usePopulationStore as any).mockReturnValue({
      populationFilter: 50 * MILLION,
      setPopulationFilter: mockSetPopulationFilter
    });
    
    render(<PopulationFilter />);
    const input = screen.getByRole('spinbutton');
    
    await fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => {
      expect(mockSetPopulationFilter).toHaveBeenCalledWith(null);
    });
  });

  it('handles focus and blur events correctly', () => {
    render(<PopulationFilter />);
    const input = screen.getByRole('spinbutton');
    const container = input.closest('.relative.flex.items-center.rounded-lg');
    
    fireEvent.focus(input);
    expect(container).toHaveClass('ring-2');
    
    fireEvent.blur(input);
    expect(container).not.toHaveClass('ring-2');
  });

  it('updates when store population filter changes', () => {
    const { rerender } = render(<PopulationFilter />);
    
    (usePopulationStore as any).mockReturnValue({
      populationFilter: 30 * MILLION,
      setPopulationFilter: mockSetPopulationFilter
    });
    
    rerender(<PopulationFilter />);
    
    expect(screen.getByRole('spinbutton')).toHaveValue(30);
  });
});