namespace SentToDo.Web.Models;

public class DbToDoTask: ToDoTask
{
    public int Id { get; set; }
    public ApplicationUser User { get; set; }
}

public class ToDoTask
{
    public long Timestamp { get; set; }
    public string Name { get; set; }
    public bool Completed { get; set; }
    public int Priority { get; set; }
}