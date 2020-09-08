using System.Collections.Generic;

namespace SentToDo.Models
{
    public class Category
    {
        public long id { get; set; }
        public string name { get; set; }
        public string color { get; set; }

        public List<Task> tasks { get; set; }
    }
}
