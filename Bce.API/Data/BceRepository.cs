using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bce.API.Helpers;
using Bce.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bce.API.Data
{
    public class BceRepository : IBceRepository
    {
        private readonly DataContext _context;
        public BceRepository(DataContext context)
        {
            this._context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void DeleteRecord(int id)
         {
             var record = _context.Records.FirstOrDefault(u => u.Id == id);
              _context.Records.Remove(record);
         }
        public void DeleteComment(int id)
         {
             var comment = _context.Comments.FirstOrDefault(u => u.Id == id);
              _context.Comments.Remove(comment);
         }

        public async Task<Comment> GetComment(int id)
        {
            return await _context.Comments.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<PagedList<Comment>> GetRecordCommentsPaged(UserParams userParams)
        {
           var comments = _context.Comments.Where(x => x.RecordID == userParams.RecordID);
            return await PagedList<Comment>.CreateAsync(comments, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Record> GetRecord(int id)
        {
            return await _context.Records.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<List<Comment>> GetRecordComments(int recordID)
        {
            return await _context.Comments.Where(x => x.RecordID == recordID).ToListAsync();
        }

        public async Task<PagedList<Record>> GetRecords(UserParams userParams)
        {
            return await PagedList<Record>.CreateAsync(_context.Records, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}