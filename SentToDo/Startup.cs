using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;
using ElectronNET.API;
using ElectronNET.API.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SentToDo.Models;
using Task = System.Threading.Tasks.Task;

namespace SentToDo
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddDbContext<ApplicationContext>();
            services.AddSwaggerGen();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationContext dataContext)
        {
            dataContext.Database.Migrate(); 
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:8080");
                }
            });

            Task.Run(async () =>
            {
                // Main window
                var options = new BrowserWindowOptions
                {
                    Frame = false,
                    Icon = Path.Combine(env.ContentRootPath, "Assets/icon256.png"),
                    Title = "SentToDo"
                };
                var window = await Electron.WindowManager.CreateWindowAsync(options);
                
                // Title bar buttons 
                Electron.IpcMain.On("close", o => { window.Hide(); });
                Electron.IpcMain.On("maximize",
                    async o =>
                    {
                        if (!await window.IsMaximizedAsync()) window.Maximize();
                        else window.Unmaximize();
                    });
                Electron.IpcMain.On("minimize", o => { window.Minimize(); });

                window.OnMaximize += async () =>
                {
                    Electron.IpcMain.Send(window, "maximize-status", await window.IsMaximizedAsync());
                };
                window.OnUnmaximize += async () =>
                {
                    Electron.IpcMain.Send(window, "maximize-status", await window.IsMaximizedAsync());
                };

                // Tray
                var menu = new MenuItem[]
                {
                    new()
                    {
                        Label = "Show",
                        Click = () => window.Show()
                    },
                    new()
                    {
                        Label = "Hide",
                        Click = () => window.Hide()
                    },
                    new()
                    {
                        Type = MenuType.separator
                    },
                    new()
                    {
                        Label = "Exit",
                        Click = () => Electron.App.Exit()
                    }
                };
                
                if (Electron.Tray.MenuItems.Count == 0)
                    Electron.Tray.Show(Path.Combine(env.ContentRootPath, "Assets/icon16.png"), menu);
                Electron.Tray.SetToolTip("SentToDo");
                
                Electron.Tray.OnClick += async (args, rectangle) =>
                {
                    if (await window.IsVisibleAsync()) window.Hide();
                    else window.Show();
                };
                // Action<TrayClickEventArgs, Rectangle> onTrayClick = async (args, rectangle) => window.Show();
            });
        }
    }
}