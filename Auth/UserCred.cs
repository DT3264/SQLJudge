using System.ComponentModel;

namespace SQL_Judge.Controllers
{
    public class UserCred
    {
        [DefaultValue("S18120")]
        public string Usuario { get; set; }

        [DefaultValue("testPassword")]
        public string Clave { get; set; }
    }
}