namespace SentToDo.Web.Models;

public class DbToDoTask
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool Completed { get; set; }
    public long Timestamp { get; set; }
}

public class ToDoTask
{
    public string Name { get; set; }
    public bool Completed { get; set; }
    public long Timestamp { get; set; }
}