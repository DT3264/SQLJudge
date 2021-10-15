using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge
{
    public class UnauthorizedExample
    {
        [DefaultValue("Unauthorized")]
        public string title { get; set; }
        [DefaultValue(401)]
        public int status { get; set; }
    }
}
