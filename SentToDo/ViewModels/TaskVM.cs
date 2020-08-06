using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Caliburn.Micro;
using Microsoft.EntityFrameworkCore;
using SentToDo.Models;

namespace SentToDo.ViewModels
{
    public class TaskVM : Screen
    {
        Task _selectedTask;
        public Task selectedTask
        {
            get => _selectedTask;
            set
            {
                _selectedTask = value;
                NotifyOfPropertyChange(() => selectedTask);
            }
        }

        BindableCollection<Task> _tasks = new BindableCollection<Task>();
        public BindableCollection<Task> tasks 
        {
            get => _tasks;
            set 
            { 
                _tasks = value;
                // NotifyOfPropertyChange(() => tasks);
            }
        }
        public TaskVM()
        {
            tasks = new BindableCollection<Task>();
            using (ToDoContext db = new ToDoContext())
            {
                List<Task> temp = db.tasks.ToList();
                foreach (var item in temp)
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
        long _id;
        string _name;
        int _priority;
        DateTime _pushDate;
        DateTime _deadline;
        bool _isCompleted;

        Category _category;


        public long id 
        {
            get => _id;
            set
            {
                _id = value;
                NotifyOfPropertyChange(() => id);
            }

        }
        public string name
        {
            get => _name;
            set
            {
                _name = value;
                NotifyOfPropertyChange(() => name);
            }

        }
        public int priority
        {
            get => _priority;
            set
            {
                _priority = value;
                NotifyOfPropertyChange(() => priority);
            }

        }
        public DateTime pushDate
        {
            get => _pushDate;
            set
            {
                _pushDate = value;
                NotifyOfPropertyChange(() => pushDate);
            }

        }
        public DateTime deadline
        {
            get => _deadline;
            set
            {
                _deadline = value;
                NotifyOfPropertyChange(() => deadline);
            }

        }
        public bool isCompleted
        {
            get => _isCompleted;
            set
            {
                _isCompleted = value;
                NotifyOfPropertyChange(() => isCompleted);
            }

        }

        public Category category
        {
            get => _category;
            set
            {
                _category = value;
                NotifyOfPropertyChange(() => category);
            }

        }

        #endregion
    }
}
