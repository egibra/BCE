using System;

namespace Bce.API.Dto
{
    public class RecordToReturnDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
        public int CommentsCount { get; set; }

    }
}