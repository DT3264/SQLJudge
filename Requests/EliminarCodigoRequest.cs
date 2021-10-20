using System.ComponentModel;

namespace SQL_Judge.Controllers
{
    public class EliminarCodigoRequest
    {
        [DefaultValue(1)]
        public int id { get; set; }
    }
}