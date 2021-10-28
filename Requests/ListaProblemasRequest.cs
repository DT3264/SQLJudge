using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Requests
{
    public class ListaProblemasRequest
    {
        [DefaultValue(new int[] { 0 })]
        public List<int> categorias { get; set; }
        [DefaultValue("resueltos")]
        public string ordenaPor { get; set; }
        [DefaultValue(false)]
        public bool ascendente { get; set;  }
    }
}
