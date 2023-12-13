function calculateScore(shots: string) {
  const turns = shots.split(' ').map(turn => turn.replace(/-/g, '0'));

  const isStrike = (turn: string) => turn === 'X';
  const isSpare = (turn: string) => turn.includes('/');

  const score = (turns: string[], index: number) => {
    if (index >= turns.length) {
      return 0;
    }

    const turn = turns[index];

    if (isStrike(turn)) {
      return 10;
    }
    if (isSpare(turn)) {
      return 10;
    }
    return parseInt(turn[0]) + parseInt(turn[1]);
  }

  const turnsScore = (accScore: number, turns: string[], index: number) => {
    if (index === turns.length) {
      return accScore;
    }
    if (isSpare(turns[index])) {
      const spareScore = score(turns, index) + score(turns, index + 1);

      return turnsScore(accScore + spareScore, turns, index + 1);
    }
    if (isStrike(turns[index])) {
      const strikeScore = score(turns, index) + score(turns, index + 1) + score(turns, index + 2);

      return turnsScore(accScore + strikeScore, turns, index + 1);
    }
    return turnsScore(accScore + score(turns, index), turns, index + 1);
  }

  return turnsScore(0, turns, 0);
}

describe('Bowling', () => {
  it('should calculate a full fail correctly', () => {
    const shots = '-- -- -- -- -- -- -- -- -- --';

    const score = calculateScore(shots);

    expect(score).toBe(0);
  });

  it('should calculate points correctly', () => {
    const shots = '11 11 11 11 11 11 11 11 11 11';

    const score = calculateScore(shots);

    expect(score).toBe(20);
  });

  it('should calculate spare correctly', () => {
    const shots = '5/ 5- -- -- -- -- -- -- -- --';

    const score = calculateScore(shots);

    expect(score).toBe(20);
  });

  it('should calculate strike correctly', () => {
    const shots = 'X 23 -- -- -- -- -- -- -- --';

    const score = calculateScore(shots);

    expect(score).toBe(20);
  });

});
