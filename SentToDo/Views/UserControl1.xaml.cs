using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace SentToDo.Views
{
    public partial class UserControl1 : UserControl
    {
        public UserControl1()
        {
            InitializeComponent();
        }

        private void UIElement_OnMouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.LeftButton == MouseButtonState.Pressed)
            {
                new Main().Show();
            }
        }

        private void Settings_OnClick(object sender, RoutedEventArgs e)
        {
            new Main().Show();
        }
    }
}
