using System;

namespace Bce.API.Dto
{
    public class CommentToReturnDto
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public string Email { get; set; }
        public DateTime DateCreated { get; set; }
    }
}