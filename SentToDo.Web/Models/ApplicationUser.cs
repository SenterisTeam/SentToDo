using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace SentToDo.Web.Models;

public class ApplicationUser: IdentityUser
{
    public List<DbToDoTask> ToDoTasks { get; set; }
    public List<DbToDoHistoryEntry> ToDoHistory { get; set; }
}