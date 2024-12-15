import { describe, expect, test } from 'vitest';
import { formatPopulation } from './formatters';

describe('formatPopulation', () => {
 test('formats billions correctly', () => {
   expect(formatPopulation(1_500_000_000)).toBe('1.5B');
   expect(formatPopulation(2_900_000_000)).toBe('2.9B');
 });

 test('formats millions correctly', () => {
   expect(formatPopulation(1_500_000)).toBe('1.5M');
   expect(formatPopulation(999_999_999)).toBe('1000.0M');
   expect(formatPopulation(2_900_000)).toBe('2.9M');
 });

 test('formats thousands correctly', () => {
   expect(formatPopulation(1_500)).toBe('1.5K');
   expect(formatPopulation(999_999)).toBe('1000.0K');
   expect(formatPopulation(2_900)).toBe('2.9K');
 });

 test('formats numbers below 1000 correctly', () => {
   expect(formatPopulation(999)).toBe('999');
   expect(formatPopulation(0)).toBe('0');
   expect(formatPopulation(100)).toBe('100');
 });
});