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
        /// <returns>Regresa un AuthResponse con el token de sesión, usuario y tipo de usuario</returns>
        /// /// <remarks>
        /// Ejemplo:
        ///
        ///     POST /api/login
        ///     {
        ///        "usuario": S18120,
        ///        "clave": "juasjuas"
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Regresa el usuario logueado con su token</response>
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
