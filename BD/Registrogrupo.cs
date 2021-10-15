using System;
using System.Collections.Generic;

#nullable disable

namespace SQL_Judge.BD
{
    public partial class Registrogrupo
    {
        public int IdUsuario { get; set; }
        public int IdGrupo { get; set; }

        public virtual Grupo IdGrupoNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
