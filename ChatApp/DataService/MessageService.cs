using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.Models;
namespace ChatApp.DataService
{
    public interface MessageService
    {
        Task<Chatmessage> AddmsgAsync(Chatmessage data);
        Task<List<Chatmessage>> GetmsgAsync();
        Task<bool> UpadateReadStatusAsync(Chatmessage data);
    }
}
