using AutoMapper;
using SentToDo.Web.Models;

namespace SentToDo.Web.Mapping;

public class AppMappingProfile : Profile
{
    public AppMappingProfile()
    {			
        CreateMap<ToDoTask, DbToDoTask>()
            .ForMember(t => t.Id, opt => opt.Ignore())
            .ForMember(t => t.User, opt => opt.Ignore());
        
        CreateMap<ToDoHistoryEntry, DbToDoHistoryEntry>()
            .ForMember(t => t.User, opt => opt.Ignore());

        CreateMap<DbToDoHistoryEntry, ToDoHistoryEntry>();
    }
}