


namespace UnitTest
{
    public class UnitTest1
    {
        [Fact]
        public void GeneratePassword_ReturnsValidPassword()
        {
            // Arrange
            var controller = new GeneratePasswordController();

            // Act
            var result = controller.GeneratePassword();

            // Assert
            Assert.NotNull(result.Value);
            Assert.IsType<PasswordResponse>(result.Value);
            Assert.True(result.Value.Password.Length >= 8); // Assuming minimum length is 8
        }

        [Fact]
        public void GeneratePassword_WithCustomLength_ReturnsValidPassword()
        {
            // Arrange
            var controller = new GeneratePasswordController();
            var customLength = 10;

            // Act
            var result = controller.GeneratePassword(customLength);

            // Assert
            Assert.NotNull(result.Value);
            Assert.IsType<PasswordResponse>(result.Value);
            Assert.Equal(customLength, result.Value.Password.Length);
        }
    }
}
