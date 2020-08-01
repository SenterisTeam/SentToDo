using SentToDo.ViewModels;

namespace SentToDo
{
    public class VMLocator
    {
        public MainVM MainVM => Ioc.Resolve<MainVM>();

    }
}
