using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Requests
{
    public class ModificarProblemaRequest
    {
        [DefaultValue(1)]
        public int idProblema { get; set; }
        [DefaultValue("Las montañas más altas")]
        public string nombre { get; set; }
        [DefaultValue("En este problema debes seleccionar las 10 montañas más altas")]
        public string descripcion { get; set; }
        [DefaultValue("select * from motañas order by altura limit 10")]
        public string solucion { get; set; }
        [DefaultValue(1)]
        public int idBaseDeDatos { get; set; }
        [DefaultValue(1)]
        public int idCategoria { get; set; }
        [DefaultValue(10)]
        public int dificultad { get; set; }
        [DefaultValue(0)]
        public byte comprobarColumnas { get; set; }
    }
}
