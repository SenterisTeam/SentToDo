using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SentToDo.Models;

namespace SentToDo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoTasksController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public ToDoTasksController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/ToDoTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoTask>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // GET: api/ToDoTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoTask>> GetToDoTask(long id)
        {
            var toDoTask = await _context.Tasks.FindAsync(id);

            if (toDoTask == null)
            {
                return NotFound();
            }

            return toDoTask;
        }

        // PUT: api/ToDoTask/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutToDoTask(long id, ToDoTask toDoTask)
        {
            if (id != toDoTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(toDoTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoTaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ToDoTask
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ToDoTask>> PostToDoTask(ToDoTask toDoTask)
        {
            _context.Tasks.Add(toDoTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetToDoTask", new { id = toDoTask.Id }, toDoTask);
        }

        // DELETE: api/ToDoTask/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoTask(long id)
        {
            var toDoTask = await _context.Tasks.FindAsync(id);
            if (toDoTask == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(toDoTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToDoTaskExists(long id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
