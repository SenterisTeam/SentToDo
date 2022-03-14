using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using SentToDo.Models;

namespace SentToDo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController
    {
        private readonly ApplicationContext _db;
        private readonly ILogger<WeatherForecastController> _logger;

        public TasksController(ApplicationContext context, ILogger<WeatherForecastController> logger)
        {
            _db = context;
            _logger = logger;
        }
        
        [HttpGet]
        public async Task<IEnumerable<ToDoTask>> Index()
        {
            return await _db.Tasks.ToListAsync();
        }

        
        [HttpPost]
        public async Task<IActionResult> Create(ToDoTask task)
        {
            _db.Tasks.Add(task);
            await _db.SaveChangesAsync();
            return new OkResult();
        }
    }
}