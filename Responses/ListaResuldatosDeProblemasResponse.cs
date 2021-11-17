using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Responses
{
    public class ListaResuldatosDeProblemasResponse
    {
        [DefaultValue(typeof(ResultadoResponse))]
        List<ResultadoResponse> resultados { get; set; }
    }
    public class ResultadoResponse
    {
        [DefaultValue("Andros_")]
        public string usuario { get; set; }
        [DefaultValue("Luis Andres Gutierrez Calderon")]
        public string nombreCompleto { get; set; }
        [DefaultValue(typeof(List<string>))]
        public List<string> veredictos { get; set; }

    }
}
