using System.ComponentModel;
namespace SQL_Judge.Requests
{
    public class CreaGrupoRequest
    {

        [DefaultValue("FundBases2022A")]
        public string Nombre { get; set; }
    }
}
