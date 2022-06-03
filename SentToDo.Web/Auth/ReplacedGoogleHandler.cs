using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.Extensions.Options;

namespace SentToDo.Web.Auth;

public class ReplacedGoogleHandler: GoogleHandler
{
    public ReplacedGoogleHandler(IOptionsMonitor<GoogleOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock)
        : base(options, logger, encoder, clock)
    { }

    public override Task<bool> ShouldHandleRequestAsync() => Task.FromResult(Request.Path == "/api/oauth/google");
}