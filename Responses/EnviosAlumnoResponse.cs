using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Responses
{
    public class EnviosAlumnoResponse
    {
        public int IdEnvio { get; set; }
        public string estatus { get; set; }
        public DateTime horaYFecha { get; set; }
    }
}
