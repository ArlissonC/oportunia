using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace Oportunia.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class FileController : ControllerBase
{
    [HttpGet("GetFile/{fileName}")]
    public IActionResult GetFile(string fileName)
    {
        var currentDirectory = Directory.GetCurrentDirectory();
        var uploadDirectory = Path.Combine(currentDirectory, "Uploads");
        var filePath = Path.Combine(uploadDirectory, fileName);

        if (System.IO.File.Exists(filePath))
        {
            var stream = System.IO.File.OpenRead(filePath);

            // Determina o tipo MIME do arquivo
            string contentType;
            new FileExtensionContentTypeProvider().TryGetContentType(fileName, out contentType!);

            return File(stream, contentType ?? "application/octet-stream");
        }
        else
        {
            return NotFound();
        }
    }
}
