using System;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Input;
using Microsoft.Win32;
using SentToDo.Deskband.Models;
using SentToDo.Deskband.Services;

namespace SentToDo.Deskband
{
    /// <summary>
    /// Interaction logic for UserControl1.xaml
    /// </summary>
    public partial class UserControl1 : UserControl
    {
        private bool _isLight = true;

        private Uri dark;
        private Uri light;

        public static BindingList<Task> tasks;
        
        public UserControl1()
        {
            InitializeComponent();
            
            try
            {
                tasks = new BindingList<Task>();
                
                Assembly entryAssembly = new StackTrace().GetFrames().Last().GetMethod().Module.Assembly;

                dark = new Uri($"/{entryAssembly.FullName};component/Themes/Dark.xaml", UriKind.Relative);
                light = new Uri($"/{entryAssembly.FullName};component/Themes/Light.xaml", UriKind.Relative);
            
                SystemEvents.UserPreferenceChanged += SystemEventsOnUserPreferenceChanged;
                SetTheme();
                
                Thread thread = new Thread(DataExchange.StartServer);
                thread.Start(); 
            }
            catch (Exception e)
            {
                MessageBox.Show(e.ToString());
            }
        }


        private void UIElement_OnMouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.LeftButton == MouseButtonState.Pressed)
            {
                if (tasks.Count > 0)
                    MessageBox.Show(tasks[0].name);
            }
        }

        private void Settings_OnClick(object sender, RoutedEventArgs e)
        {
        }

        private void SetTheme()
        {
            _isLight = Theme.ThemeIsLight();

            var theme = Application.LoadComponent(_isLight ? light : dark) as ResourceDictionary;
            Resources.MergedDictionaries.Clear();
            Resources.MergedDictionaries.Add(theme);
        }

        private void SystemEventsOnUserPreferenceChanged(object sender, UserPreferenceChangedEventArgs e)
        {
            if (Theme.ThemeIsLight() != _isLight)
            {
                SetTheme();
            }
        }
    }
}