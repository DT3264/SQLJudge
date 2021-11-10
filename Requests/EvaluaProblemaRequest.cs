using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Requests
{
    public class EvaluaProblemaRequest
    {
        [DefaultValue(1)]
        public int idProblema { get; set; }

        [DefaultValue("select code, name, region, gnp, headOfState, capital from country where name like 'Z%'")]
        public string sqlAEvaluar { get; set; }
    }
}
