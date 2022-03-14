using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SentToDo.Models
{
    public class ToDoTask
    {
        [Key, ReadOnly(true)]  public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}