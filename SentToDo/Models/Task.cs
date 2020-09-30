using System;
using System.ComponentModel.DataAnnotations;

namespace SentToDo.Models
{
    public class Task
    {
        [Key] public long id { get; set; }
        public string name { get; set; }
        public Priority priority { get; set; }
        public DateTime creationDate { get; set; } 
        public DateTime deadline { get; set; }
        public bool isCompleted { get; set; }

        public Category category { get; set; }
    }
}
