using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQL_Judge.BD;
using SQL_Judge.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Judge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProblemasController : ControllerBase
    {
        /// <summary>
        /// Inserta un nuevo problema
        /// </summary>
        /// /// Ejemplo:
        ///
        ///     POST /api/problemas/agregaProblema
        ///     {
        ///        "Nombre": "Las montañas más altas",
        ///        "Descripcion": "En este problema debes seleccionar las 10 montañas más altas",
        ///        "Solucion": "select * from motañas order by altura limit 10",
        ///        "BaseDeDatos": "zonas",
        ///        "Categoria": 1,
        ///        "Dificultad": 500
        ///     }
        ///
        /// </remarks>
        /// <response code="200">El problema se agregó exitosamente</response>
        [HttpPost("agregaProblema")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        public IActionResult AgregaProblema([FromBody]AgregarProblemaRequest request)
        {
            var dbContext = new SQLJudgeContext();
            var nuevoProblema = new Problema()
            {
                Nombre = request.Nombre,
                Descripcion = request.Descripcion,
                Solucion = request.Solucion,
                BaseDeDatos = request.BaseDeDatos,
                Categoria = request.Categoria,
                Dificultad = request.Dificultad
            };
            dbContext.Add(nuevoProblema);
            dbContext.SaveChanges();
            return Ok("Problema agregado correctamente");
        }

        /// <summary>
        /// Inserta un nuevo problema
        /// </summary>
        /// /// Ejemplo:
        ///
        ///     POST /api/problemas/modificarProblema
        ///     {
        ///        "IdProblema": 1,
        ///        "Nombre": "Las montañas más altas",
        ///        "Descripcion": "En este problema debes seleccionar las 20 montañas más altas",
        ///        "Solucion": "select * from motañas order by altura limit 20",
        ///        "BaseDeDatos": "zonas",
        ///        "Categoria": 1,
        ///        "Dificultad": 500
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
                IdProblema = request.IdProblema,
                Nombre = request.Nombre,
                Descripcion = request.Descripcion,
                Solucion = request.Solucion,
                BaseDeDatos = request.BaseDeDatos,
                Categoria = request.Categoria,
                Dificultad = request.Dificultad
            };
            dbContext.Update(problemaAActualizar);
            dbContext.SaveChanges();
            return Ok("Problema modificado correctamente");
        }
    }
}
