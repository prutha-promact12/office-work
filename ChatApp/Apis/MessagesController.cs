using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ChatApp.DataService;
using ChatApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChatApplication.Apis
{
    [Produces("application/json")]
    [Route("api/message")]
    public class MessageController : Controller
    {
        private MessageService _msgservice;
        private ILogger _Logger;

        public MessageController(MessageService msgservice, ILoggerFactory loggerFactory)
        {
            _msgservice = msgservice;
            _Logger = loggerFactory.CreateLogger(nameof(MessageController));
        }
        [HttpGet]
        [ProducesResponseType(typeof(List<Messages>), 200)]
        [ProducesResponseType(typeof(ChatMessage), 400)]
        public async Task<ActionResult> Messages()
        {
            try
            {
                var msgs = await _msgservice.GetMsgAsync();
                return Ok(msgs);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ChatMessage { Status = false });
            }
        }
        [HttpPost]
        [ProducesResponseType(typeof(ChatMessage), 201)]
        [ProducesResponseType(typeof(ChatMessage), 400)]
        public async Task<ActionResult> AddMsg([FromBody]Messages data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ChatMessage { Status = false, ModelStates = ModelState });
            }
            try
            {
                var newmsg = await _msgservice.AddMsgAsync(data);
                if (newmsg == null)
                {
                    return BadRequest(new ChatMessage { Status = false });
                }
                return CreatedAtRoute("GetMessageRoute", new { id = newmsg.id }, newmsg);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ChatMessage { Status = false });
            }
        }
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(ChatMessage), 200)]
        [ProducesResponseType(typeof(ChatMessage), 400)]
        public async Task<ActionResult> UpdateRead(int id, [FromBody]Messages data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ChatMessage { Status = false, ModelStates = ModelState });
            }

            try
            {
                var status = await _msgservice.UpadateReadStatusAsync(data);
                if (!status)
                {
                    return BadRequest(new ChatMessage { Status = false });
                }
                return Ok(new ChatMessage { Status = true, messages = data });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ChatMessage { Status = false });
            }
        }
    }
}
