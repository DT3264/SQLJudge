using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQL_Judge.BD;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SQL_Judge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LoginController : ControllerBase
    {
        private readonly IJWTAuthManager jWTAuthManager;

        public LoginController(IJWTAuthManager jWTAuthManager)
        {
            this.jWTAuthManager = jWTAuthManager;
        }

        /// <summary>
        /// Loguea a un usuario
        /// </summary>
        /// <returns>Regresa un AuthResponse con el token de sesión, usuario y tipo de usuario</returns>
        /// /// <remarks>
        /// Sample request:
        ///
        ///     POST /login
        ///     {
        ///        "usuario": S18120,
        ///        "clave": "juasjuas"
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Regresa el usuario logueado con su token</response>
        /// <response code="401">El ingreso fue incorrecto, credenciales inválidas</response>            
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(typeof(AuthResponse),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(UnauthorizedExample), StatusCodes.Status401Unauthorized)]
        public IActionResult Authenticate([FromBody] UserCred userCred)
        {
            var authResponse = jWTAuthManager.Authenticate(userCred.Usuario, userCred.Clave);
            if (authResponse == null) return Unauthorized();

            var correo = User.Claims.Where(c => c.Type == ClaimTypes.Email).Select(c => c.Value).SingleOrDefault();
            var tipo = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).SingleOrDefault();            
            
            var response = new Dictionary<string, string>()
            {
                { "token", authResponse.token },
                { "usuario", authResponse.usuario },
                { "tipo", authResponse.tipo }
            };
            return Ok(authResponse);
        }

        /// <summary>
        /// Ejemplo de petición exclusiva para alumnos
        /// </summary>
        /// <returns>Saludo para alumnos</returns>
        /// <response code="200">El  usuario tiene acceso de alumno</response>
        /// <response code="403">El usuario no tiene acceso de alumno</response> 
        [HttpGet("holaAlumno")]
        [Authorize(Policy = "Alumnos")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ForbidenExample), StatusCodes.Status403Forbidden)]
        public IActionResult SaludaAlumno()
        {
            var usuario = User.Claims.Where(c => c.Type == ClaimTypes.Name).Select(c => c.Value).SingleOrDefault();
            return Ok("Hola " + usuario + " eres un alumno");
        }

        /// <summary>
        /// Ejemplo de petición exclusiva para admins
        /// </summary>
        /// <returns>Saludo para admins</returns>
        /// <response code="200">El  usuario tiene acceso de administrador</response>
        /// <response code="403">El usuario no tiene acceso de administrador</response>            
        [HttpGet("holaAdmin")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ForbidenExample), StatusCodes.Status403Forbidden)]
        public IActionResult SaludaAdmin()
        {
            var usuario = User.Claims.Where(c => c.Type == ClaimTypes.Name).Select(c => c.Value).SingleOrDefault();
            return Ok("Hola " + usuario + " eres un admin");
        }
    }
}
