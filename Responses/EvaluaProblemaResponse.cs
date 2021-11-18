using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Responses
{
    public class EvaluaProblemaResponse
    {
        [DefaultValue(1)]
        public int idEnvio { get; set; }
        [DefaultValue("")]
        public string estadoEnvio { get; set; }
        [DefaultValue("Select * from country order by 1")]
        public string  codigoFuenteEnvio { get; set; }
        [DefaultValue("29/05/2015 14:50")]
        public string fechaYhoraEnvio { get; set; }
        [DefaultValue("No. de columnas incorrecto")]
        public string respuesta { get; set; }
    }
}
