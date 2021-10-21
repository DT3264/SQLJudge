﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQL_Judge.Auth;
using SQL_Judge.BD;
using SQL_Judge.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SQL_Judge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        /// <summary>
        /// Lista de usuarios registrados
        /// </summary>
        /// <returns>Lista de usuarios</returns>
        /// /// <remarks>
        /// Ejemplo de salida:
        ///
        ///     POST Usuario/obtenerUsuarios
        ///     [
        ///          {
        ///            "idUsuario": 1,
        ///            "nombre": "Alexia",
        ///            "apellidoP": "Martinez",
        ///            "apellidoM": "Aguilera"
        ///          },
        ///          {
        ///            "idUsuario": 2,
        ///            "nombre": "Dennis",
        ///            "apellidoP": "Bucio",
        ///            "apellidoM": "Palmerin"
        ///          },
        ///     ]
        ///
        /// </remarks>
        /// <response code="200">Lista de usuarios registrados</response>
        [Authorize(Policy = "Admins")]
        [HttpPost("obtenerUsuarios")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public IActionResult listaUsuarios()
        {
            using (SQLJudgeContext context = new SQLJudgeContext())
            {
                var Usuarios = context.Usuarios.ToList();
                var users = from us in Usuarios
                            select new { us.IdUsuario, us.Nombre, us.ApellidoP, us.ApellidoM };
                return Ok(users);
            }
        }

        /// <summary>
        /// Elimina un usuario por su identificador (id)
        /// </summary>
        /// <param name="value">El identificador del usuario</param>
        /// <returns>Mensaje de eliminación correctamente o si no se encontró al usuario</returns>
        /// /// <remarks>
        /// Ejemplo:
        ///
        ///     POST Usuario/eliminarUsuario
        ///     {
        ///        "id": 1
        ///     }
        ///
        /// </remarks>
        /// <response code="200">El usuario se eliminó correctamente</response>
        /// <response code="400">El usuario a eliminar no existe</response>
        [HttpPost("eliminarUsuario")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult eliminarUsuario([FromBody] EliminarCodigoRequest value)
        {
            Usuario user;
            using (SQLJudgeContext context = new SQLJudgeContext())
            {
                var Usuario = context.Usuarios.ToList();
                user = Usuario.FirstOrDefault(u => u.IdUsuario == value.id) ;
                //return Ok(user);
                if (user != null)
                {
                    context.Remove(user);
                    context.SaveChanges();
                    return Ok("Usuario eliminado");
                }
                else {
                    return BadRequest("No existe el usuario");
                }
            }
        }
        /// <summary>
        /// Modifica un usuario con los nuevos parámetros identificado por su id
        /// </summary>
        /// <param name="value">Usuario ha modificar</param>
        /// <returns></returns>
        /// /// <remarks>
        /// Ejemplo:
        ///
        ///     POST Usuario/editarUsuario
        ///     {
        ///        "id": 1,
        ///        "nombre": "Miguel Alejandro",
        ///        "apellidoP": "Moreno",
        ///        "apellidoM": "Ruiz",
        ///        "correo": "mike.ale@gmail.com",
        ///        "usuario": "usuario1",
        ///        "clave": "123",
        ///        "pais": "Mexico",
        ///        "estado": "Guanajuato",
        ///        "escuela": "ITSUR",
        ///        "tipo": "Alumno"
        ///      }
        ///
        /// </remarks>
        /// <response code="200">El usuario se modificó correctamente</response>
        /// <response code="400">El usuario a modificar no existe</response>
        [HttpPost("editarUsuario")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        public IActionResult modificarUsuario([FromBody] UsuarioRequest value)
        {
            Usuario user;
            using (SQLJudgeContext context = new SQLJudgeContext())
            {
                var Usuario = context.Usuarios.ToList();
                user = Usuario.FirstOrDefault(u => u.IdUsuario == value.id);
                if (user != null)
                {
                    context.Entry(user).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    user.Nombre = value.nombre;
                    user.ApellidoM = value.apellidoM;
                    user.ApellidoP = value.apellidoP;
                    user.Correo = value.correo;
                    user.Usuario1 = value.usuario;
                    user.Clave = JWTAuthManager.getStringHash(value.clave).ToLower();
                    user.Pais = value.pais;
                    user.Estado = value.estado;
                    user.Escuela = value.escuela;
                    context.SaveChanges();
                    return Ok("Usuario modificado");
                }
                else
                {
                    return BadRequest("No existe el usuario");
                }
            }
        }
    }
}