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
    public class TaskVM : PropertyChangedMagic
    {
        public Task selectedTask { get; set; }

        public ObservableCollection<Task> tasks { get; set; }
        public TaskVM()
        {
            tasks = new ObservableCollection<Task>();
            using (ToDoContext db = new ToDoContext())
            {
                List<Task> tasksTemp = db.tasks.ToList();
                foreach (var item in tasksTemp)
                {
                    tasks.Add(item);
                }
            }
        }

        #region Update
        public void UpdateAll()
        {
            using (ToDoContext db = new ToDoContext())
            {
                foreach (var item in tasks)
                {
                    db.Entry(item).State = EntityState.Modified;
                }
                db.SaveChanges();
            }
        }

        #endregion

        #region Properties
        public long id { get; set; }
        public string name { get; set; }
        public int priority { get; set; }
        public DateTime pushDate { get; set; }
        public DateTime deadline { get; set; }
        public bool isCompleted { get; set; }

        public Category category { get; set; }

        #endregion
    }
}
