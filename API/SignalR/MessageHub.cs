using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Entity;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessageHub : Hub
    {

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _tracker;
        public MessageHub(IUnitOfWork unitOfWork, IMapper mapper, IHubContext<PresenceHub> presenceHub, PresenceTracker tracker)
        {
            _unitOfWork = unitOfWork;
            _tracker = tracker;
            _presenceHub = presenceHub;
            _mapper = mapper;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var otherUser = httpContext.Request.Query["user"].ToString();
            var groupeName = GetGroupName(Context.User.GetUsername(), otherUser);
            await Groups.AddToGroupAsync(Context.ConnectionId, groupeName);
            var group = await AddToGroup(groupeName);
            await Clients.Group(groupeName).SendAsync("UpdateGroup", group);
            var messages = await _unitOfWork.MessageRepository.GetMessageThread(Context.User.GetUsername(), otherUser);
            if(_unitOfWork.HasChanges()) await _unitOfWork.Complete();
            await Clients.Caller.SendAsync("ReceiveMessageThread", messages);

        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var group = await RemoveFromMessageGroup();
            await Clients.Group(group.Name).SendAsync("UpdateGroup", group);
            await base.OnDisconnectedAsync(exception);
        }
        public async Task SendMessage(CreateMessageDto createMessageDto)
        {
            var username = Context.User.GetUsername();

            if (username == createMessageDto.RecipientUsername.ToLower())
                throw new HubException("You send to yourself");
            var sender = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var recipient = await _unitOfWork.UserRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

            if (recipient == null) throw new HubException("Not found user");

            var message = new Message
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = sender.UserName,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content
            };
            var groupeName = GetGroupName(sender.UserName, recipient.UserName);

            var group = await _unitOfWork.MessageRepository.GetMessageGroup(groupeName);

            if (group.Connections.Any(x => x.Username == recipient.UserName))
            {
                message.DateRead = DateTime.UtcNow;
            }
            else
            {
                var connections = await _tracker.GetConnectionsForUser(recipient.UserName);
                if (connections != null)
                {
                    await _presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived", new
                    {
                        username = sender.UserName,
                        knowAs = sender.KnownAs
                    });
                }
            }
            _unitOfWork.MessageRepository.AddMessage(message);
            if (await _unitOfWork.Complete())
            {

                await Clients.Group(groupeName).SendAsync("NewMessage", _mapper.Map<MessageDto>(message));

            }

        }
        private async Task<Group> AddToGroup(string groupName)
        {
            var group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);
            var connection = new Connection(Context.ConnectionId, Context.User.GetUsername());

            if (group == null)
            {
                group = new Group(groupName);
                _unitOfWork.MessageRepository.AddGroup(group);
            }
            group.Connections.Add(connection);
            if (await _unitOfWork.Complete())
            {
                return group;
            }
            throw new HubException("Failed to join group");
        }

        private async Task<Group> RemoveFromMessageGroup()
        {
            var group = await _unitOfWork.MessageRepository.GetGroupForCOnnection(Context.ConnectionId);
            var connection = group.Connections.FirstOrDefault(c => c.ConnectionId == Context.ConnectionId);
            _unitOfWork.MessageRepository.RemoveConnection(connection);

            if (await _unitOfWork.Complete()) return group;

            throw new HubException("Failed to remove from group");

        }
        private string GetGroupName(string caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller, other) < 0;
            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}