using Caliburn.Micro;
using SentToDo.Models;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Input;

namespace SentToDo.ViewModels
{
    public class WnPanelVM : TaskVM
    {
        #region Commands
        public void BtGoToTasks() => GoToTasks();
        public void GGoToTasks(MouseButtonEventArgs e)
        {
            if (e.LeftButton == MouseButtonState.Pressed) GoToTasks();
        }

        #endregion
        #region for commands
        void GoToTasks() => WindowsOpener.OpenWindow("tasks");

        #endregion

        public WnPanelVM() // Max 2 tasks can be shown at the panel
        {
            
            tasks = new BindableCollection<Task>();
            using (ToDoContext db = new ToDoContext())
            {
                List<Task> temp = db.tasks.ToList();
                for (byte i=0; i!=2; i++)
                {
                    tasks.Add(temp[0]);
                }
            }
        }


    }
}
