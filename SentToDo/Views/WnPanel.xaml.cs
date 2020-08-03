using SentToDo.ViewModels;
using System.Windows.Controls;

namespace SentToDo.Views
{
    public partial class WnPanel : UserControl
    {
        public WnPanel()
        {
            DataContext = new WnPanelVM();
            InitializeComponent();
        }
    }
}
