using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SentToDo.Models
{
    public class Category
    {
        [Key] public long id { get; set; }
        public string name { get; set; }
        public string color { get; set; }

        public List<Task> tasks { get; set; }
    }
}
