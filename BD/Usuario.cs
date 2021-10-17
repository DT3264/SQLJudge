using System;
using System.Collections.Generic;

#nullable disable

namespace SQL_Judge.BD
{
    public partial class Usuario
    {
        public Usuario()
        {
            Envios = new HashSet<Envio>();
            Grupos = new HashSet<Grupo>();
            Registrogrupos = new HashSet<Registrogrupo>();
        }

        public int IdUsuario { get; set; }
        public string Nombre { get; set; }
        public string ApellidoP { get; set; }
        public string ApellidoM { get; set; }
        public string Correo { get; set; }
        public string Usuario1 { get; set; }
        public string Clave { get; set; }
        public string Pais { get; set; }
        public string Estado { get; set; }
        public string Escuela { get; set; }
        public string Tipo { get; set; }

        public virtual ICollection<Envio> Envios { get; set; }
        public virtual ICollection<Grupo> Grupos { get; set; }
        public virtual ICollection<Registrogrupo> Registrogrupos { get; set; }
    }
}
