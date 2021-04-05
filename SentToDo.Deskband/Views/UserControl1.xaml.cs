using System;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Microsoft.Win32;
using SentToDo.Deskband.Services;

namespace SentToDo.Deskband
{
    /// <summary>
    /// Interaction logic for UserControl1.xaml
    /// </summary>
    public partial class UserControl1 : UserControl
    {
        private bool isLight = true;

        private Uri dark;
        private Uri light;
        
        public UserControl1()
        {
            InitializeComponent();
            
            try
            {
                Assembly entryAssembly = new StackTrace().GetFrames().Last().GetMethod().Module.Assembly;

                dark = new Uri($"/{entryAssembly.FullName};component/Themes/Dark.xaml", UriKind.Relative);
                light = new Uri($"/{entryAssembly.FullName};component/Themes/Light.xaml", UriKind.Relative);
            
                SystemEvents.UserPreferenceChanged += SystemEventsOnUserPreferenceChanged;
                SetTheme();
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
                MessageBox.Show(Theme.ThemeIsLight().ToString());
            }
        }

        private void Settings_OnClick(object sender, RoutedEventArgs e)
        {
        }

        private void SetTheme()
        {
            isLight = Theme.ThemeIsLight();

            var theme = Application.LoadComponent(isLight ? light : dark) as ResourceDictionary;
            Resources.MergedDictionaries.Clear();
            Resources.MergedDictionaries.Add(theme);
        }

        private void SystemEventsOnUserPreferenceChanged(object sender, UserPreferenceChangedEventArgs e)
        {
            if (Theme.ThemeIsLight() != isLight)
            {
                SetTheme();
            }
        }
    }
}