using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Requests
{
    public class VistaProblemaRequest
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string categoria { get; set; }
        public string baseDatos { get; set; }
        public int resueltos { get; set; }
        public string descripcion { get; set; }
    }
}
