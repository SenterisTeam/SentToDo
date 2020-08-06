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
    }
}
