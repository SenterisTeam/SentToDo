using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SentToDo.ViewModels.KindOfMagic;

namespace SentToDo.Models
{
    public class Category : PropertyChangedMagic
    {
        [Key] public long id { get; set; }
        public string name { get; set; }
        public string color { get; set; }

        public List<Task> tasks { get; set; }
    }
}
