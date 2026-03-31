describe('Test in te app file', () => {
  test('should return 24', () => {
    // Arrange
    const num1  = 4;
    const num2 = 20;
    
    // Act

    const result = ( num1 + num2 );
    
    //Assert

    expect( result ).toBe( 24 );
  });
});