using System;
using System.ComponentModel.DataAnnotations;

namespace SentToDo.Deskband.Models
{
    public class Task
    {
        [Key] public long id { get; set; }
        public string name { get; set; }
        public int priority { get; set; }
        public DateTime pushDate { get; set; } 
        public DateTime deadline { get; set; }
        public bool isCompleted { get; set; }
    }
}
