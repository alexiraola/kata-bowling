import { BowlingGame } from '../core/bowling';

describe('Bowling', () => {
  var game: BowlingGame;

  const rollMany = (times: number, pins: number) => {
    Array.from({ length: times }).forEach(() => game.roll(pins));
  }

  const rollManyCouple = (times: number, pins: [number, number]) => {
    Array.from({ length: times }).forEach(() => {
      game.roll(pins[0]);
      game.roll(pins[1]);
    });
  }

  beforeEach(() => {
    game = new BowlingGame();
  })

  it('should calculate a full fail correctly', () => {
    rollMany(20, 0);

    expect(game.calculateScore()).toBe(0);
  });

  it('should calculate points correctly', () => {
    rollMany(20, 1);

    expect(game.calculateScore()).toBe(20);
  });

  it('should calculate spare correctly', () => {
    game.roll(5);
    game.roll(5);
    game.roll(5);
    rollMany(17, 0);

    expect(game.calculateScore()).toBe(20);
  });

  it('should calculate strike correctly', () => {
    game.roll(10);
    game.roll(2);
    game.roll(3);
    rollMany(17, 0);

    expect(game.calculateScore()).toBe(20);
  });

  it('should calculate a perfect game', () => {
    rollMany(12, 10);

    expect(game.calculateScore()).toBe(300);
  });

  it('should calculate a spare in last turn', () => {
    rollMany(21, 5);

    expect(game.calculateScore()).toBe(150);
  });

  it('should calculate a spare with different score in last turn', () => {
    rollManyCouple(10, [8, 2]);
    game.roll(8);

    expect(game.calculateScore()).toBe(180);
  });

});
