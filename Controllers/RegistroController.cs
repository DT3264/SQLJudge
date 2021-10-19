using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQL_Judge.BD;
using SQL_Judge.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
    }
}
