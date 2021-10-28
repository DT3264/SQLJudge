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
    [Authorize]
    public class BasesController : ControllerBase
    {
        /// <summary>
        /// Obbtiene las bases existentes
        /// </summary>
        /// <response code="200">Regresa las bases existentes</response>  
        [HttpPost("obtenerBases")]
        [Authorize(Policy = "Admins")]
        [ProducesResponseType(typeof(List<ObtenerBasesResponse>), StatusCodes.Status200OK)]
        public IActionResult ObtenerCategorias()
        {
            var dbContext = new SQLJudgeContext();
            var bases = from c in dbContext.Basesdedatos
                             select new { c.IdBase, c.Nombre };
            return Ok(bases);
        }
    }
}
