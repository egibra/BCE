using AutoMapper;
using Bce.API.Dto;
using Bce.API.Models;

namespace Bce.API.Helpers
{
public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Record,RecordToReturnDto>()
            .ForMember(dest => dest.CommentsCount, opt => {
                opt.MapFrom(src => src.Comments.Count);
            });    
            CreateMap<Comment,CommentToReturnDto>(); 
        }
    }
}