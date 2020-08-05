using DevExpress.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using SentToDo.Models;
using Microsoft.EntityFrameworkCore;
using SentToDo.ViewModels.KindOfMagic;

namespace SentToDo.ViewModels
{
    public class TasksVM : TaskVM
    {
        public ObservableCollection<Priority> priorities { get; set; }

        public TasksVM()
        {
            priorities = new ObservableCollection<Priority>();

            using (ToDoContext db = new ToDoContext())
            {
                List<Priority> pTemp = db.priorities.ToList();
                foreach (var item in pTemp)
                {
                    priorities.Add(item);
                }
            }
        }
    }
}
