using Bce.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bce.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Record> Records { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}