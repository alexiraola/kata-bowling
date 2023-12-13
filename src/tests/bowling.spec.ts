function calculateResult(shots: string) {
  return 0;
}

describe('Bowling', () => {
  it('should calculate a full fail correctly', () => {
    const shots = '-- -- -- -- -- -- -- -- -- --';

    const result = calculateResult(shots);

    expect(result).toBe(0);
  });

});
