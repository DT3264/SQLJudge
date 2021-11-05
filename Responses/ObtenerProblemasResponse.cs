using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Responses
{
    public class ObtenerProblemasResponse
    {
        [DefaultValue(1)]
        public string idProblema { get; set; }
        [DefaultValue("Las montañas más altas")]
        public string nombre { get; set; }
        [DefaultValue(typeof(ObtenerProblemasCategoriaResponse))]
        public ObtenerProblemasCategoriaResponse categoria { get; set; }
        [DefaultValue(10)]
        public int dificultad { get; set; }
        [DefaultValue(10)]
        public int noResueltos { get; set; }
        [DefaultValue(typeof(ObtenerProblemasBaseResponse))]
        public ObtenerProblemasBaseResponse baseDatos { get; set; }
        [DefaultValue(false)]
        public bool resuelto { get; set; }
    }

    public class ObtenerProblemasCategoriaResponse
    {
        [DefaultValue(1)]
        public int idCategoria { get; set; }
        [DefaultValue("Join")]
        public string nombre { get; set; }
    }
    public class ObtenerProblemasBaseResponse
    {
        [DefaultValue(1)]
        public int idBase { get; set; }
        [DefaultValue("nwind")]
        public string nombre { get; set; }
    }
}
