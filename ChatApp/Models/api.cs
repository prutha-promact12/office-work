using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;
namespace ChatApp.Models
{
    public class api
    {
        public bool Status { get; set; }
        public login User { get; set; }
        public ModelStateDictionary ModelState { get; internal set; }
    }
}
