using Microsoft.AspNetCore.Http;

namespace Oportunia.Api.Helpers;

public static class Files
{
    public static async Task<string> SaveFile(IFormFile file)
    {
        var currentDirectory = Directory.GetCurrentDirectory();
        var uploadDirectory = Path.Combine(currentDirectory, "Uploads");

        if (!Directory.Exists(uploadDirectory)) Directory.CreateDirectory(uploadDirectory);
    
        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadDirectory, fileName);

        using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return fileName;
    }
}
