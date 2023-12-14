type Score = {
  score: number,
  rollIndex: number
}

class BowlingGame {
  private rolls: number[] = [];
  private frames = Array.from({ length: 10 }).map((_, i) => i);

  roll(roll: number) {
    this.rolls.push(roll);
  }

  calculateScore() {
    return this.frames.reduce<Score>((score) => {
      return this.calculateFrameScore(score);
    }, { score: 0, rollIndex: 0 }).score;
  }

  private calculateFrameScore({ score, rollIndex }: Score): Score {
    if (this.isStrike(rollIndex)) {
      return this.calculateStrikeScore({ score, rollIndex });
    }
    if (this.isSpare(rollIndex)) {
      return this.calculateSpareScore({ score, rollIndex });
    }
    return this.calculateNormalScore({ score, rollIndex });
  }

  private calculateNormalScore({ score, rollIndex }: Score) {
    return {
      score: score + this.rolls[rollIndex] + this.rolls[rollIndex + 1],
      rollIndex: rollIndex + 2
    }
  }

  private calculateStrikeScore({ score, rollIndex }: Score) {
    return {
      score: score + 10 + this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2],
      rollIndex: rollIndex + 1
    }
  }

  private calculateSpareScore({ score, rollIndex }: Score) {
    return {
      score: score + 10 + this.rolls[rollIndex + 2],
      rollIndex: rollIndex + 2
    }
  }

  private isStrike(frameIndex: number) {
    return this.rolls[frameIndex] === 10;
  }

  private isSpare(frameIndex: number) {
    return this.rolls[frameIndex] + this.rolls[frameIndex + 1] === 10;
  }
}

describe('Bowling', () => {
  var game: BowlingGame;

  const rollMany = (times: number, pins: number) => {
    Array.from({ length: times }).forEach(() => game.roll(pins));
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

});
