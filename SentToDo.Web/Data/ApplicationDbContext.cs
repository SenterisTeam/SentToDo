using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SentToDo.Web.Models;

namespace SentToDo.Web.Data;

public class ApplicationDbContext: IdentityDbContext<ApplicationUser> 
{
    public DbSet<DbToDoTask> ToDoTasks { get; set; } = null!;
    public DbSet<DbToDoHistoryEntry> History { get; set; } = null!;
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
        
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder
            .Entity<ToDoHistoryEntry>()
            .Property(e => e.NewValue)
            .HasConversion(
                t => JsonConvert.SerializeObject(t),
                t => JsonConvert.DeserializeObject<ToDoTask>(t));
        
        builder
            .Entity<ToDoHistoryEntry>()
            .Property(e => e.OldValue)
            .HasConversion(
                t => JsonConvert.SerializeObject(t),
                t => JsonConvert.DeserializeObject<ToDoTask>(t));
    }
}