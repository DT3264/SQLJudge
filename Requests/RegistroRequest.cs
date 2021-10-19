using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Auth
{
    public class RegistroRequest
    {
        [DefaultValue("Miguel Alejandro")]
        public string nombre { get; set; }
        [DefaultValue("Moreno")]
        public string apellidoP { get; set; }
        [DefaultValue("Ruiz")]
        public string apellidoM { get; set; }
        [DefaultValue("mike.ale@gmail.com")]
        public string correo { get; set; }
        [DefaultValue("usuario1")]
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
