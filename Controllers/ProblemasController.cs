using Microsoft.AspNetCore.Authorization;
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
using SQL_Judge.Evaluador;

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
        ///        "dificultad": 500,
        ///        "comprobarColumnas": 1
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
                Dificultad = request.dificultad,
                ComprobarColumnas = request.comprobarColumnas
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
        ///        "dificultad": 500,
        ///        "comprobarColumnas": 0
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
                Dificultad = request.dificultad,
                ComprobarColumnas = request.comprobarColumnas
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
        [ProducesResponseType(typeof(List<ObtenerProblemasResponse>), StatusCodes.Status200OK)]
        public IActionResult ObtenerProblemasCompletos()
        {
            var usuario = User.Identity.Name;
            var dbContext = new SQLJudgeContext();
            var problemas = from p in dbContext.Problemas
                            join c in dbContext.Categorias on p.IdCategoria equals c.IdCategoria
                            join b in dbContext.Basesdedatos on p.IdBase equals b.IdBase
                            select new { id = p.IdProblema, p.Nombre, categoria = new { c.IdCategoria, c.Nombre }, p.Dificultad, noResueltos = obtenResueltosPorProblema(p.IdProblema), baseDatos = new { b.IdBase, b.Nombre }, resuelto = compruebaMejorResultadoEnProblema(usuario, p.IdProblema) };

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

        /// <summary>
        /// Comprueba  el mejor envio de un usuario en  un problema
        /// </summary>
        /// <param name="usuario">El usuario en cuestión</param>
        /// <param name="idProblema">El problema a comprobar los envíos</param>
        /// <returns>
        /// -1 si no hay envios en el problema;
        /// 0 si hay envios pero ninguno es correcto; 
        /// 1 si hay algun envio correcto</returns>
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

        /// <summary>
        /// Evalua un problema
        /// </summary>
        /// /// <remarks>
        ///Ejemplo:
        ///
        ///     POST /api/problemas/evaluaProblema
        ///     {
        ///        "idProblema": 10,
        ///        "sqlAEvaluar": "Select * from country order by 1"
        ///     }
        ///
        /// </remarks>
        /// <returns></returns>
        /// <response code="200">Se ha evaluado el problema</response>
        /// <response code="400">No se ha evaluado el problema o no existe</response>
        [HttpPost("evaluaProblema")]
        [ProducesResponseType(typeof(EvaluaProblemaResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult evaluaproblema([FromBody] EvaluaProblemaRequest request)
        {
            var dbContext = new SQLJudgeContext();
            var problemas = from p in dbContext.Problemas
                           join b in dbContext.Basesdedatos on p.IdBase equals b.IdBase
                           where p.IdProblema == request.idProblema
                           select new { p.IdProblema, p.Solucion, p.ComprobarColumnas, baseDeDatos=b.Nombre};

            // El try se requiere específicamente para la linea problemas.First() en caso de que se envíe la solución de un problema que no exista
            try
            {
                var problema = problemas.First();
                // var fechaEvaluacion = DateTime.Now.ToUniversalTime(); // Si es horario en UTC, es este
                var fechaEvaluacion = DateTime.Now;
                var respuestaEvaluacion = new Evaluador.Evaluador().Evaluar(request.sqlAEvaluar, problema.Solucion, problema.ComprobarColumnas, problema.baseDeDatos);
                var usuario = User.Identity.Name;
                var idUsuario = (from u in dbContext.Usuarios
                                 where u.Usuario1 == usuario
                                 select u.IdUsuario).First();
                var envio = new Envio()
                {
                    IdUsuario = idUsuario,
                    IdProblema = problema.IdProblema,
                    Fecha = fechaEvaluacion,
                    Veredicto = respuestaEvaluacion,
                    Codigo = request.sqlAEvaluar,
                    Respuesta = ""// TODO: la evaluación debería regresar algún mensaje, tal vez el error en caso de existir
                };
                dbContext.Envios.Add(envio);
                dbContext.SaveChanges();

                var respuesta = new EvaluaProblemaResponse()
                {
                    idEnvio = envio.IdEnvio,
                    estadoEnvio = envio.Veredicto,
                    codigoFuenteEnvio = envio.Codigo,
                    fechaYhoraEnvio = envio.Fecha.ToString("dd/MM/yyyy HH:mm")
                };
                return Ok(respuesta);
            }
            catch
            {
                return BadRequest("El problema no existe");
            }
        }

        /// <summary>
        /// Lista de problemas de la manera [id, nombre, categoria, dificultad, noResueltos]
        /// </summary>
        /// /// <remarks>
        ///Ejemplo:
        ///
        ///     POST /api/problemas/listaProblemasPorID
        ///     {
        ///        ids: [1, 2, 3]
        ///     }
        ///
        /// </remarks>
        /// <returns>Una lista de problemas</returns>
        /// <response code="200">La lista de todos los problemas</response>
        [HttpPost("listaProblemasPorID")]
        [ProducesResponseType(typeof(ListaProblemasPorIDResponse), StatusCodes.Status200OK)]
        public IActionResult listaProblemasPorID([FromBody] ListaProblemasPorIDRequest request)
        {
            var dbContext = new SQLJudgeContext();
            var problemas = from p in dbContext.Problemas
                            join c in dbContext.Categorias on p.IdCategoria equals c.IdCategoria
                            where request.ids.Contains(p.IdProblema)
                            select new { p.IdProblema, p.Nombre, categoria = c.Nombre, p.Dificultad, noResueltos = obtenResueltosPorProblema(p.IdProblema) };
            var idsNoExistentes = new List<int>();
            foreach(var id in request.ids)
            {   
                if (problemas.FirstOrDefault(p => p.IdProblema == id) == default)
                {
                    idsNoExistentes.Add(id);
                }
            }
            var respuesta = new
            {
                problemas = problemas,
                idsNoExistentes = idsNoExistentes
            };
            return Ok(respuesta);
        }

        /// <summary>
        /// Lista las respuestas de los envios especificados
        /// </summary>
        /// /// <remarks>
        ///Ejemplo:
        ///
        ///     POST /api/problemas/listaResutladosDeProblemas
        ///     {
        ///        ids: [1, 2, 3]
        ///     }
        ///
        /// </remarks>
        /// <returns>Una lista de respuestas en los probkemas especificados</returns>
        /// <response code="200">La lista de todos los problemas</response>
        [HttpPost("listaResutladosDeProblemas")]
        [ProducesResponseType(typeof(ListaResuldatosDeProblemasResponse), StatusCodes.Status200OK)]
        public IActionResult listaResutladosDeProblemas([FromBody] ListaProblemasPorIDRequest request)
        {
            var dbContext = new SQLJudgeContext();
            var usuarios = (from u in dbContext.Usuarios
                           select new { idUsuario = u.IdUsuario, usuario = u.Usuario1, u.Nombre, u.ApellidoP, u.ApellidoM }).ToList();

            List<object> resultados = new List<object>();
            foreach(var usuario in usuarios)
            {
                List<string> veredictosUsuario = new List<string>();
                foreach (var idProblema in request.ids)
                {
                    var veredictosQuery = from e in dbContext.Envios
                                     where e.IdProblema == idProblema && e.IdUsuario == usuario.idUsuario
                                     select e.Veredicto;
                    veredictosUsuario.Add(obtenerMejorVeredicto(veredictosQuery));
                }
                resultados.Add(new
                {
                    usuario = usuario.usuario,
                    nommbreCompleto = string.Format("{0} {1} {2}", usuario.Nombre, usuario.ApellidoP, usuario.ApellidoM),
                    veredictos = veredictosUsuario
                }); ;
            }
            return Ok(resultados);
        }

        /// <summary>
        /// Comprueba  el mejor envio
        /// </summary>
        /// <param name="veredictosQuery">Los veredictos obtenidos</param>
        /// <returns>
        /// El mejor veredicto en el orden AC > WA > RE > "" (No hay envio)</returns>
        private string obtenerMejorVeredicto(IQueryable<string> veredictosQuery)
        {
            if (veredictosQuery.Contains("AC")) return "AC";
            if (veredictosQuery.Contains("WA")) return "WA";
            if (veredictosQuery.Contains("RE")) return "RE";
            // Si no hay ningun envío
            return "";
        }

    }
}
