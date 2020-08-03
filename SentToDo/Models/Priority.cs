using SentToDo.ViewModels.KindOfMagic;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SentToDo.Models
{
    public class Priority : PropertyChangedMagic
    {
        [Key] public long id { get; set; }
        public string name { get; set; }
        public string color { get; set; }

        public List<Task> tasks { get; set; }
    }
}
