using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatApp.Data;
using ChatApp.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private ChatAppContext _service;
        private login data;

        public ChatHub(ChatAppContext service)
        {
            _service = service;
        }
        public async Task Send(string userID, string senderId, string Message, string Sender )
        {
             await Clients.Clients(senderId, userID).SendAsync("send", Message, Sender);
        }
        public async void setConnectId(string Name)
        {
            data = await _service.login.SingleOrDefaultAsync(c => c.Name == Name);
            data.ConnectionId = Context.ConnectionId;
            _service.login.Attach(data);
            _service.Entry(data).State = EntityState.Modified;
            _service.SaveChangesAsync();
        }
        public async void setStatus (string Name)
        {
            data = await _service.login.SingleOrDefaultAsync(e => e.Name == Name);
            data.isConnected = "1";
            _service.login.Attach(data);
            _service.Entry(data).State = EntityState.Modified;
            _service.SaveChanges();
        }
    }
}
