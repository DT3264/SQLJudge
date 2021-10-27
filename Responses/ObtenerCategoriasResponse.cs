using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Responses
{
    public class ObtenerCategoriasResponse
    {
        [DefaultValue(1)]
        public int IdCategoria { get; set; }
        [DefaultValue("Join")]
        public string Nombre { get; set; }
    }
}