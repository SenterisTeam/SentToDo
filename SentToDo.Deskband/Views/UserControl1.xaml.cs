using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace SentToDo.Deskband
{
    /// <summary>
    /// Interaction logic for UserControl1.xaml
    /// </summary>
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
                
            }
        }

        private void Settings_OnClick(object sender, RoutedEventArgs e)
        {
            
        }
    }
}
