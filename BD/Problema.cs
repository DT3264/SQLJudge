using System;
using System.Collections.Generic;

#nullable disable

namespace SQL_Judge.BD
{
    public partial class Problema
    {
        public Problema()
        {
            Envios = new HashSet<Envio>();
            Problemastareas = new HashSet<Problemastarea>();
        }

        public int IdProblema { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Solucion { get; set; }
        public int IdBase { get; set; }
        public int IdCategoria { get; set; }
        public int Dificultad { get; set; }
        public byte ComprobarColumnas { get; set; }

        public virtual Basesdedato IdBaseNavigation { get; set; }
        public virtual Categoria IdCategoriaNavigation { get; set; }
        public virtual ICollection<Envio> Envios { get; set; }
        public virtual ICollection<Problemastarea> Problemastareas { get; set; }
    }
}
