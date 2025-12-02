import { describe, it, expect } from 'vitest';
import {
  APP_NAME,
  MOCK_TRAINING_MENUS,
  MOCK_RACES,
  MOCK_WEIGHT_HISTORY
} from '../constants';

describe('Constants', () => {
  describe('APP_NAME', () => {
    it('should be defined and be a string', () => {
      expect(APP_NAME).toBeDefined();
      expect(typeof APP_NAME).toBe('string');
      expect(APP_NAME).toBe('TT-Pro');
    });
  });

  describe('MOCK_TRAINING_MENUS', () => {
    it('should be an array with training menus', () => {
      expect(Array.isArray(MOCK_TRAINING_MENUS)).toBe(true);
      expect(MOCK_TRAINING_MENUS.length).toBeGreaterThan(0);
    });

    it('each menu should have required properties', () => {
      MOCK_TRAINING_MENUS.forEach((menu) => {
        expect(menu).toHaveProperty('id');
        expect(menu).toHaveProperty('title');
        expect(menu).toHaveProperty('type');
        expect(menu).toHaveProperty('durationMin');
        expect(menu).toHaveProperty('tss');
        expect(menu).toHaveProperty('description');
      });
    });

    it('menu types should be valid', () => {
      const validTypes = ['FTP', 'VO2Max', 'Endurance', 'Recovery'];
      MOCK_TRAINING_MENUS.forEach((menu) => {
        expect(validTypes).toContain(menu.type);
      });
    });

    it('duration and tss should be positive numbers', () => {
      MOCK_TRAINING_MENUS.forEach((menu) => {
        expect(menu.durationMin).toBeGreaterThan(0);
        expect(menu.tss).toBeGreaterThan(0);
      });
    });
  });

  describe('MOCK_RACES', () => {
    it('should be an array with race profiles', () => {
      expect(Array.isArray(MOCK_RACES)).toBe(true);
      expect(MOCK_RACES.length).toBeGreaterThan(0);
    });

    it('each race should have required properties', () => {
      MOCK_RACES.forEach((race) => {
        expect(race).toHaveProperty('id');
        expect(race).toHaveProperty('name');
        expect(race).toHaveProperty('distanceKm');
        expect(race).toHaveProperty('elevationGainM');
        expect(race).toHaveProperty('type');
        expect(race).toHaveProperty('description');
      });
    });

    it('race types should be valid', () => {
      const validTypes = ['Flat', 'Hilly', 'Mountain', 'TT'];
      MOCK_RACES.forEach((race) => {
        expect(validTypes).toContain(race.type);
      });
    });

    it('distance and elevation should be non-negative', () => {
      MOCK_RACES.forEach((race) => {
        expect(race.distanceKm).toBeGreaterThan(0);
        expect(race.elevationGainM).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('MOCK_WEIGHT_HISTORY', () => {
    it('should be an array with weight records', () => {
      expect(Array.isArray(MOCK_WEIGHT_HISTORY)).toBe(true);
      expect(MOCK_WEIGHT_HISTORY.length).toBeGreaterThan(0);
    });

    it('each record should have date and weight', () => {
      MOCK_WEIGHT_HISTORY.forEach((record) => {
        expect(record).toHaveProperty('date');
        expect(record).toHaveProperty('weight');
        expect(typeof record.date).toBe('string');
        expect(typeof record.weight).toBe('number');
      });
    });

    it('weight values should be in realistic range (40-150 kg)', () => {
      MOCK_WEIGHT_HISTORY.forEach((record) => {
        expect(record.weight).toBeGreaterThan(40);
        expect(record.weight).toBeLessThan(150);
      });
    });

    it('dates should be in valid format (YYYY-MM-DD)', () => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      MOCK_WEIGHT_HISTORY.forEach((record) => {
        expect(record.date).toMatch(dateRegex);
      });
    });
  });
});
