using System;
using System.Collections.Generic;

#nullable disable

namespace SQL_Judge.BD
{
    public partial class Envio
    {
        public int IdEnvio { get; set; }
        public int IdUsuario { get; set; }
        public int IdProblema { get; set; }
        public DateTime Fecha { get; set; }
        public string Veredicto { get; set; }
        public string Codigo { get; set; }
        public string Respuesta { get; set; }

        public virtual Problema IdProblemaNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
