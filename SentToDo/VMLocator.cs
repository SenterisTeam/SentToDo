using SentToDo.ViewModels;

namespace SentToDo
{
    public class VMLocator
    {
        public TaskVM taskVM => Ioc.Resolve<TaskVM>();
        public WnPanelVM wnPanelVM => Ioc.Resolve<WnPanelVM>();
    }
}
