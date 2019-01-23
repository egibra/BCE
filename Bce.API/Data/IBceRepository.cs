using System.Collections.Generic;
using System.Threading.Tasks;
using Bce.API.Helpers;
using Bce.API.Models;

namespace Bce.API.Data
{
    public interface IBceRepository
    {
         void Add<T>(T entity) where T: class;

         void DeleteRecord(int id);
         void DeleteComment(int id);
         Task<bool> SaveAll();
         Task<PagedList<Record>> GetRecords(UserParams userParams);
         Task<List<Comment>> GetRecordComments(int recordID);
         Task<PagedList<Comment>> GetRecordCommentsPaged(UserParams userParams);
         Task<Comment> GetComment(int id);
         Task<Record> GetRecord(int id);

    }
}