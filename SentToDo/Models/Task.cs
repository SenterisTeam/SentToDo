using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using SentToDo.Annotations;

namespace SentToDo.Models
{
    public class Task: INotifyPropertyChanged
    {
        public long Id { get; set; }
        
        public string Name { get; set; }
        public int Priority { get; set; }
        public DateTime PushDate { get; set; } = DateTime.Now;
        public DateTime Deadline { get; set; }
        public bool IsCompleted { get; set; }
        public event PropertyChangedEventHandler PropertyChanged;
    }
}
