using System;
using System.Collections.Generic;

#nullable disable

namespace SQL_Judge.BD
{
    public partial class Basesdedato
    {
        public Basesdedato()
        {
            Problemas = new HashSet<Problema>();
        }

        public int IdBase { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Problema> Problemas { get; set; }
    }
}
