using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
//using Repository.Models.DataLayer;
using Service.Contracts;
using Shared.DataTransferObjects;
using Shared.RequestFeatures;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace Presentation.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly IServiceManager _service;
        public QuoteController(IServiceManager service)
        {
            _service = service;
        }
        [HttpGet]
        // [ResponseCache(Duration=60)]
        public IActionResult AllQuote()
        {
            try
            {
                var fighters = _service.QuoteService.GetQuote();
                return Ok(fighters);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");

            }

        }

        [HttpGet]
        [ActionName("GetQuotePagination")]
        public IActionResult AllQuote([FromQuery] QuoteParameters quoteParameter)
        {
            try
            {
                var (quote, metaData) = _service.QuoteService.GetAllQuotes(quoteParameter);
                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metaData));
                return Ok(quote);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");

            }
        }

        [HttpGet]
        public IActionResult SearchQuote([FromQuery] SearchParameter searchParameters)
        {
            try
            {
                var (quote, metaData) = _service.QuoteService.GetSearchResult(searchParameters);
                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metaData));
                return Ok(quote);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");

            }
        }

        [HttpGet]
        public IActionResult Categories()
        {
            try
            {
                var category = _service.QuoteService.GetAllCategory();
                return Ok(category);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");

            }
        }

        [HttpGet]
        public IActionResult GetFavourite([FromQuery] FavouriteParameters favouriteParameters)
        {
            try
            {
                var (quote, metaData) = _service.QuoteService.GetUserFavourite(favouriteParameters);
                Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metaData));
                return Ok(quote);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");

            }
        }

        [HttpPost]
        public ActionResult<UserQuoteDTO> Favourite([FromBody] UserQuoteCreationDTO value)
        {
            try
            {
                _service.QuoteService.CreateUserQuote(value);
                return CreatedAtAction(nameof(GetFavourite), new { quoteContent = value.quote_id }, value);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
