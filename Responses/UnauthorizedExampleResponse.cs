using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge
{
    public class UnauthorizedExampleResponse
    {
        [DefaultValue("Unauthorized")]
        public string title { get; set; }
        [DefaultValue(400)]
        public int status { get; set; }
    }
}
