using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQL_Judge.BD;
using SQL_Judge.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using SQL_Judge.Auth;

namespace SQL_Judge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroController : ControllerBase
    {
        /// <summary>
        /// Genera un nuevo código de registro
        /// </summary>
        /// <response code="200">Regresa el código generado</response>
        [HttpPost("generarCodigoRegistro")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(NewCodigoRegistroResponse), StatusCodes.Status200OK)]
        public IActionResult GenerarCodigo()
        {
            var dbContext = new SQLJudgeContext();

            const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            var longitud = 10;
            var randString = new string(Enumerable.Repeat(chars, longitud)
              .Select(s => s[random.Next(s.Length)]).ToArray());

            var codigoRegistro = new Codigosregistro() 
            {
                Codigo = randString
            };
            dbContext.Add(codigoRegistro);
            dbContext.SaveChanges();

            var codigoResult = new Dictionary<string, string>()
            {
                {
                    "codigo", codigoRegistro.Codigo
                }
            };
            return Ok(codigoResult);
        }

        /// <summary>
        /// Obtiene los códigos de registro existentes
        /// </summary>
        /// <remarks>
        /// Respuesta de ejemplo:
        /// [
        ///  {
        ///    "idCodigoRegistro": 6,
        ///    "codigo": "xd7oi93b2k"
        ///  },
        ///  {
        ///    "idCodigoRegistro": 7,
        ///    "codigo": "s1aqg0vt32"
        ///  },
        /// ]
        /// </remarks>
        /// <response code="200">Regresa los códigos de registro existentes</response>
        [HttpPost("obtenerCodigosRegistro")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(Codigosregistro), StatusCodes.Status200OK)]
        public IActionResult ObtenerCodigos()
        {
            var dbContext = new SQLJudgeContext();
            var codigos = dbContext.Codigosregistros;
            return Ok(codigos);
        }

        /// <summary>
        /// Elimina un código por ID
        /// </summary>
        /// <response code="200">El código se eliminó correctamente</response>
        /// <response code="400">El código a eliminar no existe</response>
        [HttpPost("eliminarCodigoPorID")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult EliminarCodigoPorID([FromBody] EliminarCodigoRequest id)
        {
            var dbContext = new SQLJudgeContext();
            try {
                var codigoAEliminar = (from c in dbContext.Codigosregistros
                                       where c.IdCodigoRegistro == id.id
                                       select c).Single();
                dbContext.Remove(codigoAEliminar);
                dbContext.SaveChanges();
                return Ok("Codigo eliminado correctamente");
            }
            catch 
            {
                return BadRequest("No existe código con ese ID");
            }
        }

        /// <summary>
        /// Registra a un usuario
        /// </summary>
        /// <param name="value">Parametros del usuario</param>
        /// <returns>
        /// Regresa un mensaje si el usuario se ha insertado o si ya existe
        /// </returns>
        ///  /// <remarks>
        /// Sample request:
        ///
        ///     POST /Registro
        ///     {
        ///          "nombre": "Juan",
        ///          "apellidoP": "Perez",
        ///          "apellidoM": "Guzman",
        ///          "correo": "Juan.g@gmail.com",
        ///          "usuario": "usuario1",
        ///          "clave": "123",
        ///          "pais": "Mexico",
        ///          "estado": "Guanajuato",
        ///          "escuela": "ITSUR",
        ///          "tipo": "Alumno"
        ///          "codigo": "asf899ad2"
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Regresa el mensaje de usuario registrado</response>
        /// <response code="400">Regresa el mensaje de usuario existente o grupo no existente</response>
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public ActionResult Post([FromBody] RegistroRequest value)
        {
            Usuario usuario;
            using (SQLJudgeContext context = new SQLJudgeContext())
            {
                var usuarioDB = context.Usuarios.ToList();
                usuario = usuarioDB.FirstOrDefault(u => u.Usuario1 == value.usuario);
                if (usuario == null)
                {
                    Codigosregistro grup;
                    var codigo = context.Codigosregistros.ToList();
                    grup = codigo.FirstOrDefault(u => u.Codigo == value.codigo);
                    if (grup != null)
                    {
                        context.Add(new Usuario()
                        {
                            Nombre = value.nombre,
                            ApellidoP = value.apellidoP,
                            ApellidoM = value.apellidoM,
                            Correo = value.correo,
                            Usuario1 = value.usuario,
                            Clave = JWTAuthManager.getStringHash(value.clave).ToLower(),
                            Pais = value.pais,
                            Estado = value.estado,
                            Escuela = value.escuela,
                            Tipo = value.tipo
                        });
                        context.SaveChanges();
                        return Ok("Usuario registrado");
                    }
                    else
                    {
                        return BadRequest("El grupo no existe");
                    }
                }
                else
                {
                    return BadRequest("El alumno ya existe");
                }
            }
        }
    }
}
