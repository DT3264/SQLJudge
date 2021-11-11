using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Requests
{
    public class EvaluaProblemaRequest
    {
        [DefaultValue(10)]
        public int idProblema { get; set; }

        [DefaultValue("Select * from country order by 1")]
        public string sqlAEvaluar { get; set; }
    }
}
