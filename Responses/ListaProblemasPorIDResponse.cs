using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Responses
{
    public class ListaProblemasPorIDResponse
    {
        [DefaultValue(typeof(ProblemaPorID))]
        List<ProblemaPorID> problemas { get; set; }
        List<int> idsNoExistentes { get; set; }
    }

    public class ProblemaPorID
    {
        [DefaultValue(1)]
        public int id { get; set; }
        [DefaultValue("Selecciona ciudades")]
        public string nombre { get; set; }
        [DefaultValue("Select")]
        public string categoria { get; set; }
        [DefaultValue(10)]
        public int dificultad { get; set; }
        [DefaultValue(150)]
        public int noResueltos { get; set; }
    }
}
