using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Bce.API.Data;
using Bce.API.Helpers;
using Bce.API.Models;
using Bce.API.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Bce.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecordsController :ControllerBase
    {
        private readonly IBceRepository _repo;
        private readonly IMapper _mapper;




        public RecordsController(IBceRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
         [HttpGet]
        public async Task<IActionResult> GetRecords([FromQuery]UserParams userParams)
        {
            var records = await _repo.GetRecords(userParams);
            var recordsToReturn = _mapper.Map<IEnumerable<RecordToReturnDto>>(records);
            Response.AddPagination(records.CurrentPage, records.PageSize, 
            records.TotalCount, records.TotalPages, string.Empty, string.Empty);

            return Ok(recordsToReturn);
        }
        [HttpGet("{id}")]
         public async Task<IActionResult> GetRecord(int id)
        {
            var record = await _repo.GetRecord(id);
            var recordToReturn = _mapper.Map<RecordToReturnDto>(record);

            return Ok(record);
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
        public IActionResult DeleteRecord(int id)
        {
            _repo.DeleteRecord(id);
           _repo.SaveAll();
            return Ok();      
        }
    }
}