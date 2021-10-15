using System;
using System.Collections.Generic;

#nullable disable

namespace SQL_Judge.BD
{
    public partial class Categoria
    {
        public Categoria()
        {
            Problemas = new HashSet<Problema>();
        }

        public int IdCategoria { get; set; }
        public string Nombre { get; set; }

        public virtual ICollection<Problema> Problemas { get; set; }
    }
}
