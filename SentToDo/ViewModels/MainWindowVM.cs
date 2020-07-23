using DevExpress.Mvvm;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using SentToDo.Models;
using Microsoft.EntityFrameworkCore;
using System.Windows.Forms;
using SentToDo.ViewModels.KindOfMagic;

namespace SentToDo.ViewModels
{
    public class MainWindowVM : PropertyChangedMagic
    {
        #region Commands
        //public DelegateCommand RemoveItemCmd
        //{
        //    get
        //    {
        //        return new DelegateCommand(() =>
        //        {
        //            DialogResult dialogResult = MessageBox.Show("Вы точно хотите удалить это слово?", "Подтверждение", MessageBoxButtons.YesNo);
        //            if (dialogResult == DialogResult.Yes)
        //            {
        //                RemoveItem();
        //            }
        //        });
        //    }
        //}

        #endregion
        #region for commands
        //private void RemoveItem()
        //{
        //    using (SEWContext db = new SEWContext())
        //    {
        //        if (SelectedWord != null)
        //        {
        //            db.Entry(SelectedWord).State = EntityState.Deleted;
        //            db.SaveChanges();
        //            Words.Remove(SelectedWord);
        //        }
        //    }
        //}

        #endregion

        public Task selectedTask { get; set; }

        public ObservableCollection<Task> tasks { get; set; }
        public MainWindowVM()
        {
            tasks = new ObservableCollection<Task>();
            using (ToDoContext db = new ToDoContext())
            {
                List<Task> temp = db.Tasks.ToList();
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
