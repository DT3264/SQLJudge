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
        public IActionResult obtenerEnviosAlumno([FromBody] EliminarCodigoRequest value)
        {
            List<EnviosAlumnoResponse> list = new List<EnviosAlumnoResponse>();
            var problem1 = new EnviosAlumnoResponse();
            problem1.IdEnvio = 123;
            problem1.estatus = "AC";
            problem1.horaYFecha = new DateTime(2020,5,1,8,30,52);

            var problem2 = new EnviosAlumnoResponse();
            problem2.IdEnvio = 124;
            problem2.estatus = "WA";
            problem2.horaYFecha = new DateTime(2020, 5, 1, 9, 30, 52);

            var problem3 = new EnviosAlumnoResponse();
            problem3.IdEnvio = 129;
            problem3.estatus = "RE";
            problem3.horaYFecha = new DateTime(2020, 5, 1, 9, 32, 52);

            list.Add(problem1);
            list.Add(problem2);
            list.Add(problem3);

            /*var usuario = User.Identity.Name;
            var dbContext = new SQLJudgeContext();
            var envios = from e in dbContext.Envios
                         where e.IdUsuario == 22
                         select new { e.IdEnvio, e.Veredicto, e.Fecha };
            */                
            return Ok(list);
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
        public IActionResult codigoFuente([FromBody] EliminarCodigoRequest value)
        {
            string codigo = "SELECT O.ORDERID, O.ORDERDATE, C.CUSTOMERID, C.COMPANYNAME " +
                "FROM ORDERS O JOIN CUSTOMERS C ON C.CUSTOMERID=O.CUSTOMERID " +
                "WHERE YEAR(ORDERDATE)='1997' AND MONTH(ORDERDATE)='03';";

            return Ok(codigo);
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
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public IActionResult descripcionProblema([FromBody] EliminarCodigoRequest value)
        {
            var desc = new DescripcionProblemaResponses();
            desc.problema = "Cuidades de Guanajuato";
            desc.idProblema = 1234;
            desc.BaseDeDatos = "WORLD";

            return Ok(desc);
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
        public IActionResult detalleProblemasAlumno([FromBody] EliminarCodigoRequest id)
        {
            DetalleProblemasAlumnoResponses res = new DetalleProblemasAlumnoResponses();
            List<ProblemasResueltasResponses> prob = new List<ProblemasResueltasResponses>();
            ProblemasResueltasResponses P1 = new ProblemasResueltasResponses();

            res.nombreAlumno = "Juan Perez";
            res.usuario = "JuanPz";
            res.envios = 100;
            res.aceptados = 70;
            res.incorrectos = 15;
            res.error = 15;
            P1.id = 1;
            P1.nombre = "Cuidades de Mexico";
            P1.fechaHoraEnvio = new DateTime(2020, 5, 1, 9, 32, 52);
            P1.codigoFuente = "SELECT O.ORDERID, O.ORDERDATE, C.CUSTOMERID, C.COMPANYNAME " +
                "FROM ORDERS O JOIN CUSTOMERS C ON C.CUSTOMERID=O.CUSTOMERID " +
                "WHERE YEAR(ORDERDATE)='1997' AND MONTH(ORDERDATE)='03';";
            P1.BaseDeDatos = "WORLD";
            prob.Add(P1);
            P1.id = 2;
            P1.BaseDeDatos = "SAKILA";
            prob.Add(P1);
            P1.id = 3;
            P1.BaseDeDatos = "WORLD";
            prob.Add(P1);
            res.problemasResueltos = prob;



            return Ok(res);
        }
    }
}
