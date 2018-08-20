using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatApp.Models;

namespace ChatApp
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ChatAppContext _context;

        public MessagesController(ChatAppContext context)
        {
            _context = context;
        }

        // GET: api/Messages
        [HttpGet]
        public IEnumerable<Messages> GetMessages()
        {
            return _context.Messages;
        }

        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMessages([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var messages = await _context.Messages.FindAsync(id);

            if (messages == null)
            {
                return NotFound();
            }

            return Ok(messages);
        }

        // PUT: api/Messages/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMessages([FromRoute] int id, [FromBody] Messages messages)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != messages.id)
            {
                return BadRequest();
            }

            _context.Entry(messages).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MessagesExists(id))
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

        // POST: api/Messages
        [HttpPost]
        public async Task<IActionResult> PostMessages([FromBody] Messages messages)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Messages.Add(messages);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMessages", new { id = messages.id }, messages);
        }

        // DELETE: api/Messages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessages([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var messages = await _context.Messages.FindAsync(id);
            if (messages == null)
            {
                return NotFound();
            }

            _context.Messages.Remove(messages);
            await _context.SaveChangesAsync();

            return Ok(messages);
        }

        private bool MessagesExists(int id)
        {
            return _context.Messages.Any(e => e.id == id);
        }
    }
}