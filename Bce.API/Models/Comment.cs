using System;

namespace Bce.API.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
        public int RecordID { get; set; }
        public Record Record { get; set; } 

    }
}