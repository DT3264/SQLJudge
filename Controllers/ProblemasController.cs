﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQL_Judge.BD;
using SQL_Judge.Requests;
using SQL_Judge.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using static MoreLinq.Extensions.OrderByExtension;
using static MoreLinq.Extensions.LeadExtension;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SQL_Judge.Controllers
{
    [Authorize]
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
        /// <response code="200">La lista de problemas con todos sus detalles</response>
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
        /// Lista de problemas de la manera [id, nombre, categoria, dificultad, resueltos, resueltoPorUsiario]
        /// </summary>
        /// /// <remarks>
        /// La lista de categorías recibe los IDs de las categorías, en caso de que no exista o comience con 0, se devolverán todos los problemas
        /// orden puede ser "resueltos" o "dificultad".
        /// ascendente puede ser true o false
        /// </remarks>
        /// <returns>Una lista de problemas</returns>
        /// <response code="200">La lista de todos los problemas</response>
        [HttpPost("listaProblemas")]
        [ProducesResponseType(typeof(ListProblemasResponse), StatusCodes.Status200OK)]
        public IActionResult listaProblemas([FromBody] ListaProblemasRequest request)
        {
            var usuario = User.Identity.Name;
            var problemas = ObtenerListaProblemas(usuario, request);
            return Ok(problemas);
        }

        /// <summary>
        /// Igual que listaProblemas pero anónimo
        /// </summary>
        /// <returns>Una lista de problemas</returns>
        /// <response code="200">La lista de todos los problemas</response>
        [HttpPost("listaProblemasAnonimos")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(ListProblemasResponse), StatusCodes.Status200OK)]
        public IActionResult listaProblemasAnonimos([FromBody] ListaProblemasRequest request)
        {
            var problemas = ObtenerListaProblemas(null, request);
            return Ok(problemas);
        }

        private object ObtenerListaProblemas(string usuario, ListaProblemasRequest request)
        {
            var dbContext = new SQLJudgeContext();
            var problemasproblemasConIDCategoria = from p in dbContext.Problemas
                                                   join c in dbContext.Categorias on p.IdCategoria equals c.IdCategoria
                                                   select new { p.IdProblema, p.Nombre, p.IdCategoria, nombreCategoria = c.Nombre, p.Dificultad };

            // Filtra por categorias
            if (request.categorias != null && request.categorias[0] != 0)
            {
                problemasproblemasConIDCategoria = problemasproblemasConIDCategoria.Where(p => request.categorias.Contains(p.IdCategoria));
            }

            // Remueve el id de categoria
            var problemas = from p in problemasproblemasConIDCategoria
                            select new { p.IdProblema, p.Nombre, p.nombreCategoria, p.Dificultad, noResueltos = obtenResueltosPorProblema(p.IdProblema), resuelto = compruebaMejorResultadoEnProblema(usuario, p.IdProblema) };


            // Ordena
            var problemasOrdenados = (request.ordenaPor, request.ascendente) switch
            {
                ("resueltos", true) => problemas.OrderBy(p => p.noResueltos, MoreLinq.OrderByDirection.Ascending),
                ("resueltos", false) => problemas.OrderBy(p => p.noResueltos, MoreLinq.OrderByDirection.Descending),
                ("dificultad", true) => problemas.OrderBy(p => p.Dificultad, MoreLinq.OrderByDirection.Ascending),
                ("dificultad", false) => problemas.OrderBy(p => p.Dificultad, MoreLinq.OrderByDirection.Descending),
                // Por defecto se ordenan  por resueltos de manera descendente
                _ => problemas.OrderBy(p => p.noResueltos, MoreLinq.OrderByDirection.Descending),
            };

            return problemasOrdenados;
        }

        static private int obtenResueltosPorProblema(int idProblema)
        {
            var dbContext = new SQLJudgeContext();
            var resueltos = from e in dbContext.Envios
                            where e.IdProblema == idProblema && e.Veredicto == "AC"
                            group e by e.IdUsuario into u
                            select u;
            return resueltos.Count();
        }

        static private int compruebaMejorResultadoEnProblema(string usuario, int idProblema)
        {
            if (usuario == null) return -1;

            var dbContext = new SQLJudgeContext();
            var resultados = new string[] { "AC", "WA", "RE" };
            var envios = from p in dbContext.Problemas
                                      join e in dbContext.Envios on p.IdProblema equals e.IdProblema
                                      join u in dbContext.Usuarios on e.IdUsuario equals u.IdUsuario
                                      where p.IdProblema == idProblema && resultados.Contains(e.Veredicto) && u.Usuario1 == usuario
                                      select new {e.Veredicto};
            // Hay envios correctos
            if (envios.Where(e => e.Veredicto == "AC").Count() > 0) return 1;
            // Si hay envios y no hay correctos, son envios incorrectos
            else if (envios.Count() > 0) return 0;
            // Si no hay envios, no se ha intentado
            else return -1;
        }

        /// <summary>
        /// Vista del problema
        /// </summary>
        /// <param name="value">ID del problema</param>
        /// <returns></returns>
        /// <response code="200">Se a encontrado el problema a mostrar</response>
        /// <response code="400">No se a encontrado el problema a mostrar</response>
        [HttpPost("vistaProblema")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(VistaProblemaRequest), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult vistaProblema([FromBody] EliminarCodigoRequest value)
        {   
            var usuario = User.Identity.Name;
            var dbContext = new SQLJudgeContext();
            var envios = from p in dbContext.Problemas
                         join e in dbContext.Envios on p.IdProblema equals e.IdProblema
                         join u in dbContext.Usuarios on e.IdUsuario equals u.IdUsuario
                         where p.IdProblema == value.id && e.Veredicto == "AC"
                         select new { e.Veredicto };

            var cantEnvios = envios.Count();  
            var datos = from p in dbContext.Problemas 
                        join cat in dbContext.Categorias on p.IdCategoria equals cat.IdCategoria
                        join d in dbContext.Basesdedatos on p.IdBase equals d.IdBase
                        where p.IdProblema == value.id
                        select new
                        {
                            id = p.IdProblema,
                            nombre = p.Nombre,
                            categoria = cat.Nombre,
                            baseDatos = d.Nombre,
                            resueltos = cantEnvios,
                            descripcion = p.Descripcion
                        };
            if (datos.Count() > 0)
            {
                return Ok(datos.First());
            }
            else {
                return BadRequest("El problema no existe");
            }
            
        }
    }
}
