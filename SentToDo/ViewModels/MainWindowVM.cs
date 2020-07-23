using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using SentToDo.ViewModels.KindOfMagic;

namespace SentToDo.ViewModels
{
    public class MainWindowVM
    {
        [Key] public long id { get; set; }
        public string name { get; set; }
        public string color { get; set; }
    }
}
