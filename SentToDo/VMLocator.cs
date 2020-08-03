using SentToDo.ViewModels;

namespace SentToDo
{
    public class VMLocator
    {
        public TaskVM MainVM => Ioc.Resolve<TaskVM>();

    }
}
