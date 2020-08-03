using SentToDo.ViewModels;
using System.Windows;

namespace SentToDo.Views
{
    public partial class Tasks : Window
    {
        static Tasks instance; // Singleton

        public Tasks()
        {
            if (instance != null)
            {
                instance.Focus();
                this.Close();
            }
            else
            {
                instance = this;
                DataContext = new TaskVM();
                InitializeComponent();
            }
        }
    }
}
