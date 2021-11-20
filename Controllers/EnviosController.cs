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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SQL_Judge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnviosController : ControllerBase
    {
        /// <summary>
        /// Lista de los envios realizados por el alumno
        /// </summary>
        /// 
        /// <param name="value">ID del problema</param>
        /// <returns>Lista de envios del alumno</returns>
        /// /// <remarks>
        /// Ejemplo:
        ///
        ///     POST /api/enviosAlumno
        ///     {
        ///        "id": 1
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Lista de envios realizados por alumno</response>
        /// <response code="400">El problema no existe</response>   
        [HttpPost("enviosAlumno")]
        [Authorize(Policy = "Alumnos")]
        [ProducesResponseType(typeof(EnviosAlumnoResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult obtenerEnviosAlumno([FromBody] EliminarCodigoRequest value)
        {
            var dbContext = new SQLJudgeContext();
            var usuario2 = User.Identity.Name;
            var response = from e in dbContext.Envios
                           join p in dbContext.Problemas on e.IdProblema equals p.IdProblema
                           join us in dbContext.Usuarios on e.IdUsuario equals us.IdUsuario
                           where us.Usuario1 == usuario2 && value.id == p.IdProblema
                           select new { IdEnvio = e.IdEnvio, estatus = e.Veredicto, horaYFecha = e.Fecha, codigo = e.Codigo, respuesta = e.Respuesta};
            return Ok(response);
        }
        /// <summary>
        /// Código fuente del envio correspondiente
        /// </summary>
        /// <param name="value">ID del envio</param>
        /// <returns></returns>
        /// /// <remarks>
        /// Ejemplo:
        ///
        ///     POST /api/codigoFuente
        ///     {
        ///        "id": 1
        ///     }
        ///
        /// </remarks>
        /// <response code="200">La respuesta del envio</response>
        /// <response code="400">El envio no existe</response>   
        [HttpPost("codigoFuente")]
        [Authorize(Policy = "Alumnos")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult codigoFuente([FromBody] EliminarCodigoRequest value)
        {
            var dbContext = new SQLJudgeContext();
            var response = (from en in dbContext.Envios
                          where en.IdEnvio == value.id
                          select new { en.Codigo });
            if (!response.Any())
            {
                return BadRequest("Envio no encontrado");
            }
            else {
                return Ok(response.First());
            }     
        }
        /// <summary>
        /// Una descripción del problema que contiene:
        /// El nombre del problema, ID y la base de datos
        /// </summary>
        /// <param name="value">ID del problema</param>
        /// <returns></returns>
        /// /// <remarks>
        /// Ejemplo:
        ///
        ///     POST /api/descripcionProblema
        ///     {
        ///        "id": 1
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Descripción del problema</response>
        /// <response code="400">El problema no existe</response>  
        [HttpPost("descripcionProblema")]
        [Authorize(Policy = "Alumnos")]
        [ProducesResponseType(typeof(DescripcionProblemaResponses), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult descripcionProblema([FromBody] EliminarCodigoRequest value)
        {
            var dbContext = new SQLJudgeContext();
            var response = (from p in dbContext.Problemas
                            join b in dbContext.Basesdedatos on p.IdBase equals b.IdBase
                            where p.IdProblema == value.id
                            select new { problema = p.Nombre, idProblema = p.IdProblema, BaseDeDatos = b.Nombre });
            if (!response.Any())
            {
                return BadRequest("El problema no existe");
            }
            else 
            {
                return Ok(response.First());
            }
            
        }
        /// <summary>
        /// Detalles de los problemas del alumno con la lista de los problemas
        /// resueltos
        /// </summary>
        /// <param name="id">ID del alumno</param>
        /// <returns></returns>
        /// /// <remarks>
        /// Ejemplo:
        ///
        ///     POST /api/detalleProblemasAlumno
        ///     {
        ///          "id": 1
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Detalles del alumno con sus problemas resueltos</response>
        /// <response code="400">El alumno no existe</response>  
        [HttpPost("detalleProblemasAlumno")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(DetalleProblemasAlumnoResponses), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult detalleProblemasAlumno([FromBody] EliminarCodigoRequest id)
        {
            

            var dbContext = new SQLJudgeContext();
            var problemasR = from p in dbContext.Problemas
                             join e in dbContext.Envios on p.IdProblema equals e.IdProblema
                             where e.IdUsuario == id.id && e.Veredicto == "AC"
                             select new
                             {
                                 id = p.IdProblema,
                                 nombre = p.Nombre,
                                 fechaHoraEnvio = e.Fecha,
                                 codigoFuente = e.Codigo
                             };

            var response = from u in dbContext.Usuarios
                           where u.IdUsuario == id.id
                           select new
                           {
                               nombreAlumno = string.Join(" ", u.Nombre, u.ApellidoP, u.ApellidoM),
                               usuario = u.Usuario1,
                               envios = (
                                    (from e in dbContext.Envios
                                     where e.IdUsuario == u.IdUsuario
                                     select new { e.IdEnvio }).Count()
                               ),
                               aceptados = (
                                    (from e in dbContext.Envios
                                     where e.IdUsuario == u.IdUsuario && e.Veredicto == "AC"
                                     select new { e.IdEnvio }).Count()
                               ),
                               incorrectos = (
                                    (from e in dbContext.Envios
                                     where e.IdUsuario == u.IdUsuario && e.Veredicto == "WA"
                                     select new { e.IdEnvio }).Count()
                               ),
                               error = (
                                    (from e in dbContext.Envios
                                     where e.IdUsuario == u.IdUsuario && e.Veredicto != "AC" && e.Veredicto != "WA"
                                     select new { e.IdEnvio }).Count()
                               ),
                               problemasResueltos = problemasR.ToList()
                           };
            if (!response.Any())
            {
                return BadRequest("El alumno no existe");
            }
            else {
                return Ok(response.First());
            }
        }
        /// <summary>
        /// Lista de alumnos con nombre, usuario y problemas resueltos
        /// </summary>
        /// <returns>Lista de alumnos</returns>
        /// <response code="200">Lista de los alumnos</response>
        [HttpPost("listaAlumnosEnvio")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(ListaAlumnosEnvioResponses), StatusCodes.Status200OK)]
        public IActionResult listaAlumnosEnvio()
        {
            var dbContext = new SQLJudgeContext();
            var respose = from u in dbContext.Usuarios
                          where u.Tipo == "Alumno" 
                          select new { id = u.IdUsuario, usuario = u.Usuario1, nombre = string.Join(" ", u.Nombre, u.ApellidoP, u.ApellidoM),
                              problemasResueltos = (
                               from es in dbContext.Envios
                               join us in dbContext.Usuarios on es.IdUsuario equals us.IdUsuario
                               where es.Veredicto == "AC" && us.IdUsuario == u.IdUsuario
                               select new { es.IdProblema }
                              ).Distinct().Count()
                          };
            return Ok(respose);
        }
    }
}
