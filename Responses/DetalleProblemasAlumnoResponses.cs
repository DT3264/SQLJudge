using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Responses
{
    public class DetalleProblemasAlumnoResponses
    {
        public string nombreAlumno { get; set;}
        public string usuario { get; set; }
        public int envios { get; set; }
        public int aceptados { get; set; }
        public int incorrectos { get; set; }
        public int error { get; set; }
        public List<ProblemasResueltasResponses> problemasResueltos { get; set; }


    }
}
