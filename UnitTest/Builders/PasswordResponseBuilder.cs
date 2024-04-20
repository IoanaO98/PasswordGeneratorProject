using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTest.Builders
{
    public class PasswordResponseBuilder
    {
            private PasswordResponse passwordResponse;

            public PasswordResponseBuilder()
            {
                Reset();
            }

            public PasswordResponse Build()
            {
                var result = passwordResponse;

                Reset();

                return result;
            }

            private void Reset()
            {
                passwordResponse = new PasswordResponse();
            }

            public PasswordResponseBuilder WithPassword(string password)
            {
                passwordResponse.Password = password;

                return this;
            }
    }
}
