using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.Models;
using ChatApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ChatApp.DataService
{
    public class SQLLoginService : LoginService
    {
        private readonly ChatAppContext _context;
        private readonly ILogger _Logger;
        public SQLLoginService(ChatAppContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _Logger = loggerFactory.CreateLogger("UserRepository");
        }

        public async Task<login> AddUserAsync(login info)
        {
            _context.Add(info);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(System.Exception exp)
            {
                _Logger.LogError($"Erro in {nameof(AddUserAsync)}: " + exp.Message);
            }
            return info;
        }

        public async Task<login> GetUserAsync(string name)
        {
            return await _context.login.SingleOrDefaultAsync(e => e.Name == name);
        }

        public async Task<List<login>> GetUserAsync()
        {
            return await _context.login.ToListAsync();
        }

        public async Task<bool> UpdateUserStatusAsync(login info)
        {
            _context.login.Attach(info);
            _context.Entry(info).State = EntityState.Modified;
            try
            {
                return (await _context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
                _Logger.LogError($"Error in {nameof(UpdateUserStatusAsync)}:" + exp.Message);
            }
            return false;
        }
    }
}
