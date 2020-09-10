using System.ComponentModel;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace SentToDo.Views
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
                new MainWindow().Show();
            }
        }

        private void Settings_OnClick(object sender, RoutedEventArgs e)
        {
            new MainWindow().Show();
        }

        private void UserControl1_OnLoaded(object sender, RoutedEventArgs e)
        {
            App.tasksList = new BindingList<Models.Task>
            {
                new Models.Task {Name = "Test"},
                new Models.Task {Name = "Test 2"},
            };

            FirstTextBlock.DataContext = App.tasksList[0];
            FirstCheckBox.DataContext = App.tasksList[0];
            
            SecondTextBlock.DataContext = App.tasksList[1];
            SecondCheckBox.DataContext = App.tasksList[1];
        }
    }
}
