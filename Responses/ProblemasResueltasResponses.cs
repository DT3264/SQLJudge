using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Responses
{
    public class ProblemasResueltasResponses
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public DateTime fechaHoraEnvio { get; set; }
        public string codigoFuente { get; set; }
        public string BaseDeDatos { get; set; }
    }
}
