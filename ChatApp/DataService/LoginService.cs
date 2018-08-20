using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.Models;
namespace ChatApp.DataService
{
    public interface LoginService
    {
        Task<login> AddUserAsync(login info);
        Task<login> GetUserAsync(string name);
        Task<List<login>> GetUserAsync();
        Task<bool> UpdateUserStatusAsync(login info);
    }
}
