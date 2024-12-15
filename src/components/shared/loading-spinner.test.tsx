import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from './loading-spinner';

let motionProps = {};

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, ...props }: any) => {
      motionProps = { initial, animate };
      return <div data-testid="animation-container" {...props}>{children}</div>;
    }
  }
}));

describe('LoadingSpinner', () => {
  describe('Rendering', () => {
    it('renders the loading container with correct height', () => {
      render(<LoadingSpinner />);
      
      const container = screen.getByTestId('loading-container');
      expect(container).toHaveClass('min-h-[400px]');
    });
    
    it('renders the loading text correctly', () => {
      render(<LoadingSpinner />);
      
      expect(screen.getByText('Loading population data...')).toBeInTheDocument();
    });
  });

  describe('Spinner Elements', () => {
    it('renders the base spinner circle', () => {
      render(<LoadingSpinner />);
      
      const baseCircle = screen.getByTestId('spinner-base');
      expect(baseCircle).toHaveClass('border-4', 'border-gray-200', 'rounded-full');
    });

    it('renders the animated spinner element', () => {
      render(<LoadingSpinner />);
      
      const animatedSpinner = screen.getByTestId('spinner-animated');
      expect(animatedSpinner).toHaveClass('border-t-4', 'border-blue-500', 'animate-spin');
    });
  });

  describe('Animation Setup', () => {
    it('has correct initial animation properties', () => {
      render(<LoadingSpinner />);
      
      expect(motionProps).toMatchObject({
        initial: { opacity: 0 }
      });
    });
    
    it('has correct animate properties', () => {
      render(<LoadingSpinner />);
      
      expect(motionProps).toMatchObject({
        animate: { opacity: 1 }
      });
    });
  });

  describe('Accessibility', () => {
    it('indicates loading state to screen readers', () => {
      render(<LoadingSpinner />);
      
      const loadingText = screen.getByText('Loading population data...');
      expect(loadingText).toHaveAttribute('aria-live', 'polite');
    });
  });
});