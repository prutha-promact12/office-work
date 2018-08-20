using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
namespace ChatApp.Models
{
    public class Chatmessage
    {
        public bool Status { get; set; }
        public Messages messages { get; set; }
        public ModelStateDictionary ModelStates { get; internal set; }
    }
}
