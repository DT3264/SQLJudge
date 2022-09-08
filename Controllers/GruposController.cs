using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQL_Judge.BD;
using SQL_Judge.Requests;
using Microsoft.AspNetCore.Authorization;

namespace SQL_Judge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GruposController : ControllerBase
    {

        // POST: api/Grupos
        [Authorize(Policy = "Admins")]
        [HttpPost("creaGrupo")]
        public async Task<ActionResult<Grupo>> CreaGrupo(CreaGrupoRequest grupoRequest)
        {
            var dbContext = new SQLJudgeContext();
            var usuario = User.Identity.Name;
            var idDocente = (from u in dbContext.Usuarios
                             where u.Usuario1 == usuario
                             select u.IdUsuario).First();
            Grupo grupo = new Grupo() { Nombre = grupoRequest.Nombre, IdDocente = idDocente, CodigoClase = CreaIdDelGrupo(), };
            while (dbContext.Grupos.Any(x => x.CodigoClase == grupo.CodigoClase))
            {
                grupo.CodigoClase = CreaIdDelGrupo();
            }
            dbContext.Grupos.Add(grupo);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction("GetGrupo", new { id = grupo.IdGrupo }, grupo);
        }

        // POST: api/Grupos
        [Authorize(Policy = "Admins")]
        [HttpGet("gruposAdministrados")]
        public async Task<ActionResult<Grupo>> CreaGrupo()
        {
            var dbContext = new SQLJudgeContext();

            var usuario = User.Identity.Name;
            var idDocente = (from u in dbContext.Usuarios
                             where u.Usuario1 == usuario
                             select u.IdUsuario).First();
            var grupos = from grupo in dbContext.Grupos
                         where grupo.IdDocente == idDocente
                         join registro in dbContext.Registrogrupos on grupo.IdGrupo equals registro.IdGrupo into gr
                         from subregistro in gr.DefaultIfEmpty()
                         group subregistro by new { grupo.IdGrupo, grupo.Nombre, grupo.CodigoClase} into x
                         select new { x.Key.IdGrupo, x.Key.Nombre, x.Key.CodigoClase, registros = x.Count(x => x != null) };



            return Ok(grupos);
        }

        private string CreaIdDelGrupo()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 8)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        // DELETE: api/Grupos/5
        [Authorize(Policy = "Admins")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrupo(int id)
        {

            var dbContext = new SQLJudgeContext();
            var grupo = await dbContext.Grupos.FindAsync(id);
            if (grupo == null)
            {
                return NotFound();
            }

            dbContext.Grupos.Remove(grupo);
            await dbContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
