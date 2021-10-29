using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Requests
{
    public class ListProblemasResponse
    {
        public ListProblemasResponse(int id, string nombre, string categoria, int dif, int noRes, int res)
        {
            this.id = id;
            this.nombre = nombre;
            this.categoria = categoria;
            this.dificultad = dif;
            this.noResueltos = noRes;
            this.resuelto = res;
        }
        [DefaultValue(1)]
        public int id { get; set; }
        [DefaultValue("Las montañas más altas")]
        public string nombre { get; set; }
        [DefaultValue("Join")]
        public string categoria { get; set; }
        [DefaultValue(500)]
        public int dificultad { get; set; }
        [DefaultValue(25)]
        public int noResueltos { get; set; }
        [DefaultValue(-1)]
        public int resuelto { get; set; }
    }
}
