﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge
{
    public class ForbidenExample
    {
        [DefaultValue("Forbiden")]
        public string title { get; set; }
        [DefaultValue(403)]
        public int status { get; set; }
    }
}
