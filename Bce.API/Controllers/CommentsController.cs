using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Bce.API.Data;
using Bce.API.Dto;
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
        private readonly IMapper _mapper;
        public CommentsController(IBceRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
    
        [HttpPost]
        public async Task<IActionResult> CreateComment(int recordID, Comment comment)
        {
            var record = _repo.GetRecord(recordID);
            if (record.Result == null)
            {
                return BadRequest();
            }
            comment.RecordID = recordID;
            comment.DateCreated = DateTime.Now;

            _repo.Add(comment);
            if(await _repo.SaveAll()) {
                return Ok(record);
            }
            throw new  Exception("Creating the record failed on save");
        }
        [HttpGet]
        public async Task<IActionResult> GetComments([FromQuery]UserParams userParams, int recordID)
        {
            var record = _repo.GetRecord(recordID);
            if (record.Result == null)
            {
                return BadRequest();
            }
            userParams.RecordID = recordID;
            var comments = await _repo.GetRecordCommentsPaged(userParams);
            var commentsToReturn = _mapper.Map<IEnumerable<CommentToReturnDto>>(comments);
            Response.AddPagination(comments.CurrentPage, comments.PageSize, 
            comments.TotalCount, comments.TotalPages, record.Result.Title, record.Result.Content);
            return Ok(commentsToReturn);
        }
        [HttpDelete("{id}")]
        public IActionResult DeleteComment(int id)
        {
            var comment = _repo.GetComment(id);
            if (comment.Result == null)
            {
                return BadRequest();
            }
            _repo.DeleteComment(id);
            _repo.SaveAll();
            return NoContent();
        }
    }
}