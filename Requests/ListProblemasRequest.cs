using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Requests
{
    public class ListProblemasRequest
    {
        public ListProblemasRequest(int id, string nombre, string categoria, int dif, int noRes, bool res)
        {
            this.id = id;
            this.nombre = nombre;
            this.categoria = categoria;
            this.dificultad = dif;
            this.noResueltos = noRes;
            this.resuelto = res;
        }
        public int id { get; set; }
        public string nombre { get; set; }
        public string categoria { get; set; }
        public int dificultad { get; set; }
        public int noResueltos { get; set; }
        public bool resuelto { get; set; }
    }
}
