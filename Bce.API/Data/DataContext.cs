using Bce.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bce.API.Data
{
    public class DataContext : DbContext
    {
                public DataContext(DbContextOptions<DataContext> options) : base(options) {}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<Comment>()
                    .HasOne<Record>(r => r.Record)
                    .WithMany(c => c.Comments)
                    .HasForeignKey(c => c.RecordID);
            }

        public DbSet<Record> Records { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}