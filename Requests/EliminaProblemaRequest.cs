using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Requests
{
    public class EliminaProblemaRequest
    {
        [DefaultValue(1)]
        public int idProblema { get; set; }
    }
}
