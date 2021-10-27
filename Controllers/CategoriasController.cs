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
    public class CategoriasController : ControllerBase
    {
        /// <summary>
        /// obtiene las categorías existentes
        /// </summary>
        /// <returns>Regresa un AuthResponse con el token de sesión, usuario y tipo de usuario</returns>
        /// <response code="200">Regresa las categorías existentes</response>  
        [HttpPost("obtenerCategorias")]
        [ProducesResponseType(typeof(List<ObtenerCategoriasResponse>), StatusCodes.Status200OK)]
        public IActionResult ObtenerCategorias()
        {
            var dbContext = new SQLJudgeContext();
            var categorias = from c in dbContext.Categorias
                             select new { c.IdCategoria, c.Nombre};
            return Ok(categorias);
        }
    }
}
