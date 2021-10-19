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
        /// <response code="400">El ingreso fue incorrecto, credenciales inválidas</response>            
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(typeof(LoginResponse),StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(UnauthorizedExampleResponse), StatusCodes.Status400BadRequest)]
        public IActionResult Authenticate([FromBody] LoginRequest userCred)
        {
            var authResponse = jWTAuthManager.Authenticate(userCred.Usuario, userCred.Clave);
            if (authResponse == null) return BadRequest("No existe");

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
        [HttpGet("holaAlumno")]
        [Authorize(Policy = "Alumnos")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
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
        [HttpGet("holaAdmin")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public IActionResult SaludaAdmin()
        {
            var usuario = User.Claims.Where(c => c.Type == ClaimTypes.Name).Select(c => c.Value).SingleOrDefault();
            return Ok("Hola " + usuario + " eres un admin");
        }
    }
}
