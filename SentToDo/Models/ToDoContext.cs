using Microsoft.EntityFrameworkCore;

namespace SentToDo.Models
{
    class ToDoContext : DbContext
    {
        public ToDoContext()
        {
            Database.EnsureCreated();
        }

        public DbSet<Task> tasks { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<Priority> priorities { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=SentToDo.db");
        }
    }
}
