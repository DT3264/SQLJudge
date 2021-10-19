using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQL_Judge.Auth;
using SQL_Judge.BD;
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
    public class RegistroController : ControllerBase
    {

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
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Regresa el mensaje de usuario registrado</response>
        /// <response code="400">Regresa el mensaje de usuario existente</response>
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public ActionResult Post([FromBody] RegistroCred value)
        {
            Usuario usuario;
            using (SQLJudgeContext context = new SQLJudgeContext())
            {
                var usuarioDB = context.Usuarios.ToList();
                usuario = usuarioDB.FirstOrDefault(u => u.Usuario1 == value.usuario);
                if (usuario == null)
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
                    return BadRequest("El alumno ya existe");
                }
            }
        }
    }
    
}
