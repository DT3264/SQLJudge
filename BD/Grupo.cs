using System;
using System.Collections.Generic;

#nullable disable

namespace SQL_Judge.BD
{
    public partial class Grupo
    {
        public Grupo()
        {
            Registrogrupos = new HashSet<Registrogrupo>();
            Tareas = new HashSet<Tarea>();
        }

        public int IdGrupo { get; set; }
        public string Nombre { get; set; }
        public int IdDocente { get; set; }
        public string CodigoClase { get; set; }

        public virtual Usuario DocenteNavigation { get; set; }
        public virtual ICollection<Registrogrupo> Registrogrupos { get; set; }
        public virtual ICollection<Tarea> Tareas { get; set; }
    }
}
