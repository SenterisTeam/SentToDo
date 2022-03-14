using Microsoft.EntityFrameworkCore;

namespace SentToDo.Models
{
    public class ApplicationContext: DbContext
    {
        public DbSet<ToDoTask> Tasks { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=SentToDoDatabase.db");
        }
    }
}