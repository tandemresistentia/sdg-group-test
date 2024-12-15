export const formatPopulation = (value: number | undefined | null): string => {
  if (value === undefined || value === null) return '0';

  const numValue = Number(value);
  if (isNaN(numValue)) return '0';

  if (numValue >= 1_000_000_000) {
    return `${(numValue / 1_000_000_000).toFixed(1)}B`;
  }
  if (numValue >= 1_000_000) {
    return `${(numValue / 1_000_000).toFixed(1)}M`;
  }
  if (numValue >= 1_000) {
    return `${(numValue / 1_000).toFixed(1)}K`;
  }
  return numValue.toString();
};