using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Responses
{
    public class ObtenerBasesResponse
    {
        [DefaultValue(1)]
        public int IdBase { get; set; }
        [DefaultValue("nwind")]
        public string Nombre { get; set; }
    }
}
