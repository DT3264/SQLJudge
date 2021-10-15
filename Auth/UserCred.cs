using System.ComponentModel;

namespace SQL_Judge.Controllers
{
    public class UserCred
    {
        [DefaultValue("test@mail.com")]
        public string Correo { get; set; }

        [DefaultValue("testPassword")]
        public string Clave { get; set; }
    }
}