using System.IO;
using System.Security.Permissions;
using System.Security.Principal;
using System.Windows;
using Microsoft.WindowsAPICodePack.Dialogs;
using Application = System.Windows.Application;

namespace Installer
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void Cancel_OnClick(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }

        private void Install_OnClick(object sender, RoutedEventArgs e)
        {
            CommonOpenFileDialog dialog = new CommonOpenFileDialog();
            dialog.InitialDirectory = "C:\\Program Files";
            dialog.IsFolderPicker = true;
            if (dialog.ShowDialog() == CommonFileDialogResult.Ok)
            {
                Install(dialog);
            }
        }
        
        private void Install(CommonOpenFileDialog dialog)
        {
            MessageBox.Show("You selected: " + dialog.FileName);
        }
    }
}