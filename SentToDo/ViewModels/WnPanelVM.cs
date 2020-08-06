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
    public class WnPanelVM : TaskVM
    {
        #region Commands
        public void BtGoToTasks() => GoToTasks();
        public void GGoToTasks() => GoToTasks();

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
        void GoToTasks() => WindowsOpener.OpenWindow("tasks");

        #endregion

        //private void UIElement_OnMouseDown(object sender, MouseButtonEventArgs e)
        //{
        //    if (e.LeftButton == MouseButtonState.Pressed)
        //    {
        //        GoToTasks()
        //    }
        //}

        
    }
}
