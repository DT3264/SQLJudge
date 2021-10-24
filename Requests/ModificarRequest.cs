using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Requests
{
    public class ModificarRequest
    {
        [DefaultValue(1)]
        public int id { get; set; }
        [DefaultValue("Juan")]
        public string nombre { get; set; }
        [DefaultValue("Perez")]
        public string apellidoP { get; set; }
        [DefaultValue("Nava")]
        public string apellidoM { get; set; }
        [DefaultValue("navaJaun@gmail.com")]
        public string correo { get; set; }
        [DefaultValue("JuanxD")]
        public string usuario { get; set; }
        [DefaultValue("123")]
        public string clave { get; set; }

        [DefaultValue("Mexico")]
        public string pais { get; set; }
        [DefaultValue("Guanajuato")]
        public string estado { get; set; }
        [DefaultValue("ITSUR")]
        public string escuela { get; set; }
        [DefaultValue("Alumno")]
        public string tipo { get; set; }
    }
}
