using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Bce.API.Data;
using Bce.API.Helpers;
using Bce.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecordsController :ControllerBase
    {
        private readonly IBceRepository _repo;
        public RecordsController(IBceRepository repo)
        {
            _repo = repo;
        }
         [HttpGet]
        public async Task<IActionResult> GetRecords([FromQuery]UserParams userParams)
        {
            var records = await _repo.GetRecords(userParams);
            Response.AddPagination(records.CurrentPage, records.PageSize, 
            records.TotalCount, records.TotalPages);

            return Ok(records);
        }
        [HttpPost]
        public async Task<IActionResult> CreateRecord(Record record)
        {
            record.DateCreated = DateTime.Now;
            _repo.Add(record);
            if(await _repo.SaveAll()) {
                return Ok(record);
            }
            throw new  Exception("Creating the record failed on save");
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecord()
        {
            var record = _repo.GetRecord(2);
            _repo.Delete(record);
            List<Comment> comments = await _repo.GetRecordComments(2);
            if (comments.Count > 0)
            {
                foreach(Comment comment in comments)
                {
                     _repo.Delete(comment);
                }                
            }
            if (await _repo.SaveAll())
                           return NoContent();
            
            throw new Exception("Error deleting the record");
        }
    }
}