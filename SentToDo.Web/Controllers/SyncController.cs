using System.Collections.Concurrent;
using System.Data;
using System.Net.WebSockets;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SentToDo.Web.Data;
using SentToDo.Web.Extensions;
using SentToDo.Web.Models;

namespace SentToDo.Web.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class SyncController : ControllerBase
{
    private static ConcurrentDictionary<string, Tuple<WebSocket, string>> _clients = new();

    private readonly ApplicationDbContext _db;
    private readonly IMapper _mapper;
    private readonly JsonSerializerSettings _jsonOptions;

    public SyncController(ApplicationDbContext db, IMapper mapper, IOptions<MvcNewtonsoftJsonOptions> jsonOptions)
    {
        _db = db;
        _mapper = mapper;
        _jsonOptions = jsonOptions.Value.SerializerSettings;
    }

    [HttpGet("ws")]
    public async Task WebSocket()
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            CancellationToken ct = HttpContext.RequestAborted;
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync("client");
            var socketId = Guid.NewGuid().ToString();
            _clients.TryAdd(socketId, new(webSocket, User.Identity.Name));

            try
            {
                while (!(bool)webSocket?.CloseStatus.HasValue)
                {
                    if (ct.IsCancellationRequested) break;

                    var result = await webSocket.ReadString(ct);

                    if (webSocket.State != WebSocketState.Open) break;
                    if (string.IsNullOrEmpty(result)) continue;

                    try
                    {
                        SyncData data = JsonConvert.DeserializeObject<SyncData>(result);

                        var returnData = await ProcessSync(data);

                        if (returnData != null)
                        {
                            SendToSockets(returnData);
                        }
                    }
                    catch (Exception e) when (e is JsonReaderException || e is NoNullAllowedException)
                    {
                        // ToDO: Send error to client
                    }
                }
            }
            catch (OperationCanceledException e)
            {
                // Ignore
            }

            Tuple<WebSocket, string> dummy;
            _clients.TryRemove(socketId, out dummy);
             
            if (webSocket.State == WebSocketState.Open) 
                await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", ct);
            webSocket.Dispose();
        }

        else
        {
            HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }

    [HttpPost("postData")]
    public async Task<ActionResult<SyncData>> PostData(SyncData request)
    {
        try
        {
            var returnData = await ProcessSync(request);
            if (returnData != null)
            {
                SendToSockets(returnData);
                return new ObjectResult(returnData);
            }
            else return NoContent();
        }
        catch (Exception e) when (e is NoNullAllowedException)
        {
            return BadRequest(); // ToDo: Send error to client
        }
    }

    private async Task SendToSockets(SyncData data, CancellationToken ct = default)
    {
        var response = JsonConvert.SerializeObject(data, _jsonOptions);

        foreach (var (id, (socket, username)) in _clients)
        {
            if (socket.State != WebSocketState.Open || username != User.Identity.Name) continue;

            socket.SendString(response, ct);
        }
    }

    private async Task<SyncData> ProcessSync(SyncData data)
    {
        JObject syncJObject = data.SyncObject as JObject;

        SyncData returnData = null;

        using (var dbContextTransaction = _db.Database.BeginTransaction())
        {
            try
            {
                switch (data.ObjectType)
                {
                    case ObjectType.ToDoHistoryEntry:
                        var toDoHistoryEntry = syncJObject.ToObject<ToDoHistoryEntry>();
                        if (toDoHistoryEntry == null) throw new NoNullAllowedException();

                        var dbToDoHistoryEntry = _mapper.Map<DbToDoHistoryEntry>(toDoHistoryEntry);
                        dbToDoHistoryEntry.User = HttpContext.GetUser();

                        if (!_db.History.Include(h => h.User).Any(h =>
                                h.Timestamp == dbToDoHistoryEntry.Timestamp &&
                                h.User.Id == dbToDoHistoryEntry.User.Id))
                        {
                            _db.History.Add(dbToDoHistoryEntry);

                            switch (dbToDoHistoryEntry.Action)
                            {
                                case HistoryAction.Added:
                                    var dbToDo = _mapper.Map<DbToDoTask>(toDoHistoryEntry.NewValue);
                                    dbToDo.User = HttpContext.GetUser();
                                    if (!_db.ToDoTasks.Include(t => t.User).Any(t =>
                                            t.Timestamp == dbToDo.Timestamp &&
                                            t.User.Id == HttpContext.GetUser().Id))
                                    {
                                        _db.ToDoTasks.Add(dbToDo);
                                    }
                                    else
                                    {
                                        _db.ToDoTasks.Update(dbToDo);
                                    }

                                    break;
                                case HistoryAction.Modified:
                                    var dbToDoModified = await _db.ToDoTasks.FirstAsync(t =>
                                        t.Timestamp == dbToDoHistoryEntry.NewValue.Timestamp &&
                                        t.User.Id == HttpContext.GetUser().Id);

                                    _mapper.Map(toDoHistoryEntry.NewValue, dbToDoModified);
                                    _db.ToDoTasks.Update(dbToDoModified);
                                    break;
                                case HistoryAction.Deleted:
                                    var dbToDoDeleted = await _db.ToDoTasks.FirstAsync(t =>
                                        t.Timestamp == dbToDoHistoryEntry.OldValue.Timestamp &&
                                        t.User.Id == HttpContext.GetUser().Id);
                                    _db.ToDoTasks.Remove(dbToDoDeleted);
                                    break;
                            }

                            _db.SaveChanges();

                            dbContextTransaction.Commit();

                            returnData = new SyncData()
                            {
                                ObjectType = ObjectType.ToDoHistoryEntry,
                                SyncObject = _mapper.Map<ToDoHistoryEntry>(dbToDoHistoryEntry)
                            };

                            return returnData;
                        }

                        break;
                }
            }
            catch (Exception e)
            {
                dbContextTransaction.Rollback();
                throw e;
            }
        }

        return returnData;
    }

    [HttpGet("getCurrentData")]
    public async Task<ActionResult<DataPackage>> GetCurrentData()
    {
        var data = new DataPackage()
        {
            ToDoTasks = await _db.ToDoTasks.Where(t => t.User.Id == HttpContext.GetUser().Id).ToListAsync()
        };

        return data;
    }
}