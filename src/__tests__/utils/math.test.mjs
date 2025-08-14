import { add, subtract } from '../../utils/math.mjs';

describe('Math Utilities', () => {
    test('add function adds two numbers correctly', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-1, 1)).toBe(0);
    });

    test('subtract function subtracts two numbers correctly', () => {
        expect(subtract(5, 3)).toBe(2);
        expect(subtract(2, 4)).toBe(-2);
    });
});