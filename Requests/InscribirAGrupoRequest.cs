using System.ComponentModel;

namespace SQL_Judge.Requests
{
    public class InscribirAGrupoRequest
    {
        [DefaultValue("codigo")]
        public string codigoClase { get; set; }
    }
}
