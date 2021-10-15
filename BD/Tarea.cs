using System;
using System.Collections.Generic;

#nullable disable

namespace SQL_Judge.BD
{
    public partial class Tarea
    {
        public Tarea()
        {
            Problemastareas = new HashSet<Problemastarea>();
        }

        public int IdTarea { get; set; }
        public int IdGrupo { get; set; }
        public DateTime FechaLimite { get; set; }
        public DateTime FechaAsignacion { get; set; }

        public virtual Grupo IdGrupoNavigation { get; set; }
        public virtual ICollection<Problemastarea> Problemastareas { get; set; }
    }
}
