export type Score = {
  score: number,
  rollIndex: number
}

interface ScoreCalculator {
  calculate(score: number, rollIndex: number): Score;
}

class NormalCalculator implements ScoreCalculator {
  constructor(private readonly rolls: number[]) { }

  calculate(score: number, rollIndex: number): Score {
    return {
      score: score + this.rolls[rollIndex] + this.rolls[rollIndex + 1],
      rollIndex: rollIndex + 2
    }
  }
}

class SpareCalculator implements ScoreCalculator {
  constructor(private readonly rolls: number[]) { }

  calculate(score: number, rollIndex: number): Score {
    return {
      score: score + 10 + this.bonus(rollIndex),
      rollIndex: rollIndex + 2
    }
  }

  private bonus(rollIndex: number) {
    return this.rolls[rollIndex + 2];
  }
}

class StrikeCalculator implements ScoreCalculator {
  constructor(private readonly rolls: number[]) { }

  calculate(score: number, rollIndex: number): Score {
    return {
      score: score + 10 + this.bonus(rollIndex),
      rollIndex: rollIndex + 1
    }
  }

  private bonus(rollIndex: number) {
    return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
  }
}

export class BowlingGame {
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

  private getCalculator(rollIndex: number) {
    if (this.isStrike(rollIndex)) {
      return new StrikeCalculator(this.rolls);
    }
    if (this.isSpare(rollIndex)) {
      return new SpareCalculator(this.rolls);
    }
    return new NormalCalculator(this.rolls);
  }

  private calculateFrameScore({ score, rollIndex }: Score): Score {
    const calculator = this.getCalculator(rollIndex);

    return calculator.calculate(score, rollIndex);
  }

  private isStrike(frameIndex: number) {
    return this.rolls[frameIndex] === 10;
  }

  private isSpare(frameIndex: number) {
    return this.rolls[frameIndex] + this.rolls[frameIndex + 1] === 10;
  }
}
