using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Windows;
using CSDeskBand;
using CSDeskBand.ContextMenu;
using ExampleWpf;

namespace SentToDo
{
    [ComVisible(true)]
    [Guid("AA01ACB3-6CCC-497C-9CE6-9211F2EDFC10")]
    [CSDeskBandRegistration(Name = "SentToDo")]
    public class Deskband : CSDeskBandWpf
    {
        public Deskband()
        {
            Options.ContextMenuItems = ContextMenuItems;
            Options.MinHorizontalSize = new DeskBandSize(120, -1);
        }

        protected override UIElement UIElement => new UserControl1();

        private List<DeskBandMenuItem> ContextMenuItems => new List<DeskBandMenuItem>();
    }
}
