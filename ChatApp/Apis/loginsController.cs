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
    public class loginsController : ControllerBase
    {
        private readonly ChatAppContext _context;

        public loginsController(ChatAppContext context)
        {
            _context = context;
        }

        // GET: api/logins
        [HttpGet]
        public IEnumerable<login> Getlogin()
        {
            return _context.login;
        }

        // GET: api/logins/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Getlogin([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var login = await _context.login.FindAsync(id);

            if (login == null)
            {
                return NotFound();
            }

            return Ok(login);
        }

        // PUT: api/logins/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Putlogin([FromRoute] int id, [FromBody] login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != login.id)
            {
                return BadRequest();
            }

            _context.Entry(login).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!loginExists(id))
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

        // POST: api/logins
        [HttpPost]
        public async Task<IActionResult> Postlogin([FromBody] login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.login.Add(login);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getlogin", new { id = login.id }, login);
        }

        // DELETE: api/logins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletelogin([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var login = await _context.login.FindAsync(id);
            if (login == null)
            {
                return NotFound();
            }

            _context.login.Remove(login);
            await _context.SaveChangesAsync();

            return Ok(login);
        }

        private bool loginExists(int id)
        {
            return _context.login.Any(e => e.id == id);
        }
    }
}