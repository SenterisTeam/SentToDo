using System;
using System.ComponentModel;
using System.Windows;
using SentToDo.Models;

namespace SentToDo.Views
{
    public partial class MainWindow : Window
    {
        private BindingList<Models.Task> _tasksList;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            _tasksList = new BindingList<Task>
            {
                new Models.Task() {Name = "Test"},
                new Models.Task() {Name = "Test 2"},
            };

            DataGridToDoList.ItemsSource = _tasksList;
            _tasksList.ListChanged += TasksListOnListChanged;
        }

        private void TasksListOnListChanged(object sender, ListChangedEventArgs e)
        {
            if (e.ListChangedType == ListChangedType.ItemAdded ||
                e.ListChangedType == ListChangedType.ItemChanged ||
                e.ListChangedType == ListChangedType.ItemDeleted)
            {
            }
        }
    }
}