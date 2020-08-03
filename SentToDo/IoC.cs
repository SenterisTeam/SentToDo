using Microsoft.Extensions.DependencyInjection;
using DevExpress.Mvvm.POCO;
using SentToDo.ViewModels;
using SentToDo.Services;

namespace SentToDo
{
    public static class Ioc
    {
        static readonly ServiceProvider provider;

        static Ioc()
        {
            var services = new ServiceCollection();

            services.AddSingleton<TaskVM>();

            // services.AddTransient<>();

            services.AddSingleton<PageService>();

            provider = services.BuildServiceProvider();
        }

        public static T Resolve<T>() => provider.GetRequiredService<T>();
    }
}