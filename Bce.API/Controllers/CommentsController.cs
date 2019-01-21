using System;
using System.Threading.Tasks;
using Bce.API.Data;
using Bce.API.Helpers;
using Bce.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Bce.API.Controllers
{
    [ApiController]
    [Route("api/records/{recordID}/[controller]")]
    public class CommentsController :ControllerBase
    {
        private readonly IBceRepository _repo;
        public CommentsController(IBceRepository repo)
        {
            _repo = repo;
        }
    
        [HttpPost]
        public async Task<IActionResult> CreateComment(int recordID, Comment comment)
        {
            comment.RecordID = recordID;
            comment.DateCreated = DateTime.Now;
            _repo.Add(comment);
            if(await _repo.SaveAll()) {
                return Ok(comment);
            }
            throw new  Exception("Creating the comment failed on save");
        }
        [HttpGet]
        public async Task<IActionResult> GetComments([FromQuery]UserParams userParams, int RecordID)
        {
            userParams.RecordID = RecordID;
            var records = await _repo.GetRecordCommentsPaged(userParams);
            Response.AddPagination(records.CurrentPage, records.PageSize, 
            records.TotalCount, records.TotalPages);

            return Ok(records);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = _repo.GetComment(id);
            _repo.Delete(comment);
            if (await _repo.SaveAll())
                            return NoContent();
            
            throw new Exception("Error deleting the comment");
        }
    }
}