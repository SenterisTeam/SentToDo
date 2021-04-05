using Microsoft.Win32;

namespace SentToDo.Deskband.Services
{
    public static class Theme
    {
        public static bool ThemeIsLight()
        {
            RegistryKey registry =
                Registry.CurrentUser.OpenSubKey(
                    @"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize");
            return (int)registry.GetValue("SystemUsesLightTheme") == 1;
        }
    }
}