using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;

namespace Oportunia.Utils;

public class ExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var errorResponse = new
        {
            context.Exception.Message,
            context.Exception.StackTrace
        };

        context.Result = new ObjectResult(errorResponse);
        context.ExceptionHandled = true;
    }
}