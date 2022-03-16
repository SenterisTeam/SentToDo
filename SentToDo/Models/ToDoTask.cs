using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SentToDo.Models
{
    public class ToDoTask
    {
        [Key, ReadOnly(true)]  public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsComplete { get; set; }
    }
}