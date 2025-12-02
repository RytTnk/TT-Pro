import { describe, it, expect } from 'vitest';
import { AppView } from '../types';

describe('Types', () => {
  describe('AppView enum', () => {
    it('should have all expected view values', () => {
      expect(AppView.DASHBOARD).toBe('DASHBOARD');
      expect(AppView.FITNESS).toBe('FITNESS');
      expect(AppView.AERO).toBe('AERO');
      expect(AppView.STRATEGY).toBe('STRATEGY');
      expect(AppView.DOCS).toBe('DOCS');
    });

    it('should have exactly 5 views', () => {
      const viewKeys = Object.keys(AppView).filter(
        (key) => isNaN(Number(key))
      );
      expect(viewKeys.length).toBe(5);
    });

    it('enum values should be strings', () => {
      Object.values(AppView).forEach((value) => {
        expect(typeof value).toBe('string');
      });
    });
  });
});
