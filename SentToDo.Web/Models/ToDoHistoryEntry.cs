namespace SentToDo.Web.Models;

public class DbToDoHistoryEntry : ToDoHistoryEntry
{
    public ApplicationUser User { get; set; }
}

public class ToDoHistoryEntry
{
    public int Id { get; set; }
    public long Timestamp { get; set; }
    public ToDoTask? OldValue { get; set; }
    public ToDoTask? NewValue { get; set; }
    public HistoryAction Action { get; set; }
}

public enum HistoryAction
{
    Added,
    Deleted,
    Modified
}
