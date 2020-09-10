using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using SentToDo.Annotations;

namespace SentToDo.Models
{
    public class Task: INotifyPropertyChanged
    {
        private string _name;
        
        public long Id { get; set; }

        public string Name
        {
            get => _name;
            set
            {
                if (value == _name) return;
                _name = value;
                OnPropertyChanged();
            }
        }

        public int Priority { get; set; }
        public DateTime PushDate { get; set; } = DateTime.Now;
        public DateTime Deadline { get; set; }
        public bool IsCompleted { get; set; }
        public event PropertyChangedEventHandler PropertyChanged;

        [NotifyPropertyChangedInvocator]
        protected virtual void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
