using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge
{
    public interface IJWTAuthManager
    {
        LoginResponse Authenticate(string user, string password);
    }
}
