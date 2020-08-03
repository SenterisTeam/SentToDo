using System;
using System.ComponentModel.DataAnnotations;
using SentToDo.ViewModels.KindOfMagic;

namespace SentToDo.Models
{
    public class Task : PropertyChangedMagic
    {
        [Key] public long id { get; set; }
        public string name { get; set; }
        public Priority priority { get; set; }
        public DateTime pushDate { get; set; } 
        public DateTime deadline { get; set; }
        public bool isCompleted { get; set; }

        public Category category { get; set; }
    }
}
