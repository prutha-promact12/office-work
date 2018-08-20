using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ChatApp.Models;

namespace ChatApp.Data
{
    public class ChatAppContext : DbContext
    {
        public ChatAppContext (DbContextOptions<ChatAppContext> options)
            : base(options)
        {
        }

        public DbSet<ChatApp.Models.login> login { get; set; }

        public DbSet<ChatApp.Models.Messages> Messages { get; set; }
    }
}
