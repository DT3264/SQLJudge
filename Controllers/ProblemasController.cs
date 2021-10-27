using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQL_Judge.BD;
using SQL_Judge.Requests;
using SQL_Judge.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SQL_Judge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProblemasController : ControllerBase
    {
        /// <summary>
        /// Inserta un nuevo problema
        /// </summary>
        /// /// <remarks>
        /// Ejemplo:
        ///
        ///     POST /api/problemas/agregarProblema
        ///     {
        ///        "nombre": "Las montañas más altas",
        ///        "descripcion": "En este problema debes seleccionar las 10 montañas más altas",
        ///        "solucion": "select * from motañas order by altura limit 10",
        ///        "idBaseDeDatos": "zonas",
        ///        "idCategoria": 1,
        ///        "dificultad": 500
        ///     }
        ///
        /// </remarks>
        /// <response code="200">El problema se agregó exitosamente</response>
        [HttpPost("agregarProblema")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public IActionResult AgregarProblema([FromBody]AgregarProblemaRequest request)
        {
            var dbContext = new SQLJudgeContext();
            var nuevoProblema = new Problema()
            {
                Nombre = request.nombre,
                Descripcion = request.descripcion,
                Solucion = request.solucion,
                IdBase = request.idBaseDeDatos,
                IdCategoria = request.idCategoria,
                Dificultad = request.dificultad
            };
            dbContext.Add(nuevoProblema);
            dbContext.SaveChanges();
            return Ok("Problema agregado correctamente");
        }

        /// <summary>
        /// Modifica un problema
        /// </summary>
        /// /// <remarks>
        /// Ejemplo:
        ///
        ///     POST /api/problemas/modificarProblema
        ///     {
        ///        "idProblema": 1,
        ///        "nombre": "Las montañas más altas",
        ///        "descripcion": "En este problema debes seleccionar las 20 montañas más altas",
        ///        "solucion": "select * from motañas order by altura limit 20",
        ///        "idBaseDeDatos": "zonas",
        ///        "idCategoria": 1,
        ///        "dificultad": 500
        ///     }
        ///
        /// </remarks>
        /// <response code="200">El problema se modificó exitosamente</response>
        [HttpPost("modificarProblema")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public IActionResult ModificarProblema([FromBody] ModificarProblemaRequest request)
        {
            var dbContext = new SQLJudgeContext();
            var problemaAActualizar = new Problema()
            {
                IdProblema = request.idProblema,
                Nombre = request.nombre,
                Descripcion = request.descripcion,
                Solucion = request.solucion,
                IdBase = request.idBaseDeDatos,
                IdCategoria = request.idCategoria,
                Dificultad = request.dificultad
            };
            dbContext.Update(problemaAActualizar);
            dbContext.SaveChanges();
            return Ok("Problema modificado correctamente");
        }

        /// <summary>
        /// Elimina un problema
        /// </summary>
        /// /// <remarks>
        ///Ejemplo:
        ///
        ///     POST /api/problemas/eliminarProblema
        ///     {
        ///        "idProblema": 1
        ///     }
        ///
        /// </remarks>
        /// <response code="200">El problema se eliminó exitosamente</response>
        [HttpPost("eliminarProblema")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public IActionResult EliminaProblema([FromBody] EliminaProblemaRequest request)
        {
            var dbContext = new SQLJudgeContext();
            try
            {
                var problemaAEliminar = dbContext.Problemas.First(p => p.IdProblema == request.idProblema);
                dbContext.Remove(problemaAEliminar);
                dbContext.SaveChanges();
                return Ok("Problema eliminado correctamente");
            }
            catch
            {
                return Ok("El problema a eliminar no existe");
            }
        }

        /// <summary>
        /// Obtiene los problemas existentes con todos los datos
        /// </summary>
        /// <response code="200">El problema se eliminó exitosamente</response>
        [HttpPost("obtenerProblemasCompletos")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(List<ObtenerProblemasResponse>), StatusCodes.Status200OK)]
        public IActionResult ObtenerProblemasCompletos()
        {
            var dbContext = new SQLJudgeContext();
            var problemas = from c in dbContext.Problemas
                            select new { c.IdProblema, c.Nombre, c.Descripcion, c.Solucion,  c.IdBase, c.IdCategoria, c.Dificultad};

            return Ok(problemas);
        }
        /// <summary>
        /// Lista de problemas
        /// </summary>
        /// <returns>Una lista de problemas</returns>
        /// <response code="200">La lista de todos los problemas</response>
        [HttpPost("listaProblemas")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ListProblemasRequest), StatusCodes.Status200OK)]
        public IActionResult listaProblemas()
        {
            //EJEMPLO DE SALIDA
            List<ListProblemasRequest> lista = new List<ListProblemasRequest>();
            ListProblemasRequest res = new ListProblemasRequest(1, "Cuidades de mexico", "Basico", 500, 45, true);
            ListProblemasRequest res2 = new ListProblemasRequest(2, "Cuidades de mexico", "Join", 400, 9, false);
            ListProblemasRequest res3 = new ListProblemasRequest(3, "Cuidades", "Agrupaciones", 500, 45, true);
            lista.Add(res);
            lista.Add(res2);
            lista.Add(res3);

            var usuario = User.Claims.Where(c => c.Type == ClaimTypes.Name).Select(c => c.Value).SingleOrDefault();
            var dbContext = new SQLJudgeContext();
            //var problemas = dbContext.Problemas.ToList();

            return Ok(lista);
        }
        /// <summary>
        /// Vista del problema
        /// </summary>
        /// <param name="value">ID del problema</param>
        /// <returns></returns>
        /// <response code="200">Se a encontrado el problema a mostrar</response>
        [HttpPost("vistaProblema")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(VistaProblemaRequest), StatusCodes.Status200OK)]
        public IActionResult vistaProblema([FromBody] EliminarCodigoRequest value)
        {
            VistaProblemaRequest problema = new VistaProblemaRequest();
            problema.id = 1;
            problema.nombre = "Cuidades";
            problema.categoria = "Basicos";
            problema.baseDatos = "NWIND";
            problema.resueltos = 45;
            problema.descripcion = "The manager of Mangojata Lawyes a report on the current lawyers...";

            return Ok(problema);
        }
    }
}
