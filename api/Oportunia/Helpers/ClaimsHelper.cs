using System.Security.Claims;

namespace TutorNotaMil.Api.Helpers;

public static class ClaimsHelper
{
    public static Guid GetUserIdFromHttpContext(HttpContext httpContext)
    {
        if (httpContext.User.Identity is ClaimsIdentity identity)
        {
            Claim userIdClaim = identity.FindFirst(ClaimTypes.NameIdentifier)!;

            if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out Guid userIdGuid))
            {
                return userIdGuid;
            }
        }

        return Guid.NewGuid();
    }
}