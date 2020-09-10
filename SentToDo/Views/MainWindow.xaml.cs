using System;
using System.ComponentModel;
using System.Windows;
using SentToDo.Models;

namespace SentToDo.Views
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void MainWindow_OnLoaded(object sender, RoutedEventArgs e)
        {
            DataGridToDoList.ItemsSource = App.tasksList;
            App.tasksList.ListChanged += TasksListOnListChanged;
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