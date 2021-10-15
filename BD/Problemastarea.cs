using System;
using System.Collections.Generic;

#nullable disable

namespace SQL_Judge.BD
{
    public partial class Problemastarea
    {
        public int IdTarea { get; set; }
        public int IdProblema { get; set; }

        public virtual Problema IdProblemaNavigation { get; set; }
        public virtual Tarea IdTareaNavigation { get; set; }
    }
}
