using SentToDo.ViewModels;
using System.Windows;

namespace SentToDo.Views
{
    public partial class Settings : Window
    {
        public Settings()
        {
            InitializeComponent();
            DataContext = new SettingsVM();
        }
    }
}
