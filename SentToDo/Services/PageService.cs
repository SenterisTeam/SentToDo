using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Controls;

namespace SentToDo.Services
{
    public class PageService
    {
        Stack<Type> history;

        public bool CanGoBack => history.Skip(1).Any();

        public PageService() => history = new Stack<Type>();

        public event Action<Page> OnPageChanged;

        public void Navigate(Page page)
        {
            OnPageChanged?.Invoke(page);
            history.Push(page.GetType());
        }

        internal void GoBack()
        {
            history.Pop();
            OnPageChanged?.Invoke((Page)Activator.CreateInstance(history.Pop()));
        }

    }
}