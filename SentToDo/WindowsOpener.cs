using SentToDo.Views;
using System;
using System.Linq;
using System.Windows;

namespace SentToDo
{
    class WindowInfo
    {
        public string name;
        public Window window;

        public void Create(Window creatingWindow)
        {
            if (window != null)
            {
                window.Activate();
                creatingWindow.Close();
            }
            else
            {
                window = creatingWindow;
                window.Closing += RemoveInstance;
            }
        }

        void RemoveInstance(object sender, System.ComponentModel.CancelEventArgs e) => window = null;
    }

    public static class WindowsOpener
    {
        static WindowInfo[] windows = new WindowInfo[] 
        { 
            new WindowInfo{ name = "tasks" }
        };
        public static void OpenWindow(string name)
        {
            Window window = null;
            switch (name)
            {
                case "tasks":
                    window = new Tasks();
                    break;
                case "settings":
                    window = new Settings();
                    break;
                default:
                    throw new Exception("Window with the name does not exist");
            }
            windows.Where(w => w.name.Equals(name)).FirstOrDefault().Create(window);
        }
    }
}
