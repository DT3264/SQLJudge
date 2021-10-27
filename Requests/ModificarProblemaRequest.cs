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
        public int IdProblema { get; set; }
        [DefaultValue("Las montañas más altas")]
        public string Nombre { get; set; }
        [DefaultValue("En este problema debes seleccionar las 10 montañas más altas")]
        public string Descripcion { get; set; }
        [DefaultValue("select * from motañas order by altura limit 10")]
        public string Solucion { get; set; }
        [DefaultValue("zonas")]
        public string BaseDeDatos { get; set; }
        [DefaultValue(1)]
        public int Categoria { get; set; }
        [DefaultValue(10)]
        public int Dificultad { get; set; }
    }
}
