using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GeneratePasswordController : ControllerBase
    {
        private const string Charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

        [HttpGet]
        public ActionResult<PasswordResponse> GeneratePassword([FromQuery] int length = 8)
        {
            if (!length.ToString().All(char.IsDigit))
            {
                return BadRequest("Password length must be a number.");
            }

            string generatedPassword = GenerateRandomPassword(length);
            return Ok(new PasswordResponse { Password = generatedPassword });
        }

        private string GenerateRandomPassword(int length)
        {
            var random = new Random();
            var password = new StringBuilder(length);

            for (int i = 0; i < length; i++)
            {
                int randomIndex = random.Next(Charset.Length);
                password.Append(Charset[randomIndex]);
            }

            return password.ToString();
        }
    }

    public class PasswordResponse
    {
        public string Password { get; set; }
    }
}
