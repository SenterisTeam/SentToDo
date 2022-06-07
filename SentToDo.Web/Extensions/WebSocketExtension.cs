using System.Net.WebSockets;
using System.Text;

namespace SentToDo.Web.Extensions;

public static class WebSocketExtension
{
    public static Task SendString(this WebSocket ws, String data, CancellationToken cancellation = default)
    {
        var encoded = Encoding.UTF8.GetBytes(data);
        var buffer = new ArraySegment<Byte>(encoded, 0, encoded.Length);
        return ws.SendAsync(buffer, WebSocketMessageType.Text, true, cancellation);
    }

    public static async Task<String> ReadString(this WebSocket ws, CancellationToken cancellation = default)
    {
        ArraySegment<Byte> buffer = new ArraySegment<byte>(new Byte[1024]);

        WebSocketReceiveResult result = null;

        using (var ms = new MemoryStream())
        {
            do
            {
                result = await ws.ReceiveAsync(buffer, cancellation);
                ms.Write(buffer.Array, buffer.Offset, result.Count);
            } while (!result.EndOfMessage);

            ms.Seek(0, SeekOrigin.Begin);

            using (var reader = new StreamReader(ms, Encoding.UTF8))
                return reader.ReadToEnd();
        }
    }
}