using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChatApp.Models;
using Microsoft.Extensions.Logging;
using ChatApp.DataService;


namespace ChatApp.Apis
{
    [Produces("application/json")]
    [Route("api/login")]
    public class LoginController : Controller
    {
        private LoginService _logindata;
        private ILogger _Logger;
        
        public LoginController (LoginService Logindata, ILoggerFactory loggerFactory)
        {
            _logindata = Logindata;
            _Logger = loggerFactory.CreateLogger(nameof(LoginController));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<login>), 200)]
        [ProducesResponseType(typeof(api), 400)]
        public async Task<ActionResult> Employees()
        {
            try
            {
                var users = await _logindata.GetUserAsync();
                return Ok(users);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new api { Status = false });
            }
        }

        [HttpGet("{name}")]
        [ProducesResponseType(typeof(login), 200)]
        public async Task<ActionResult> GetUser(string name)
        {
            try
            {
                var user = await _logindata.GetUserAsync(name);
                return Ok(user);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new api{ Status = false });
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(api), 201)]
        [ProducesResponseType(typeof(api), 400)]
        public async Task<ActionResult> AddUser([FromBody]login info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new api { Status = false, ModelState = ModelState });
            }

            try
            {
                var newuser = await _logindata.AddUserAsync(info);
                if (newuser == null)
                {
                    return BadRequest(new api { Status = false });
                }
                return CreatedAtRoute("GetUserRoute", new { id = newuser.id }, newuser);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new api { Status = false });
            }
        }
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(api), 200)]
        [ProducesResponseType(typeof(api), 400)]
        public async Task<ActionResult> UpdateUser(int id, [FromBody]login info)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new api { Status = false, ModelState = ModelState });
            }

            try
            {
                var status = await _logindata.UpdateUserStatusAsync(info);
                if (!status)
                {
                    return BadRequest(new api { Status = false });
                }
                return Ok(new api { Status = true, User = info });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new api { Status = false });
            }
        }
    }
}
    
