using System.Globalization;
using System.Text.RegularExpressions;
using System.Text;

namespace Oportunia.Utils;

public static class ManipulateString
{
    public static string RemoveSpacesSpecialCharactersAccents(string input)
    {
        string normalizedString = RemoveAccents(input);
        return Regex.Replace(normalizedString, @"[^\p{L}\p{N}]", "").ToLower();
    }

    private static string RemoveAccents(string input)
    {
        string normalizedString = input.Normalize(NormalizationForm.FormD);
        StringBuilder result = new StringBuilder();

        foreach (char ch in normalizedString)
        {
            UnicodeCategory category = CharUnicodeInfo.GetUnicodeCategory(ch);
            if (category != UnicodeCategory.NonSpacingMark)
            {
                result.Append(ch);
            }
        }

        return result.ToString();
    }

    public static string SubstituirCaracteresEspeciais(string input)
    {
        // Substituir traços e caracteres especiais por %
        string pattern = @"[-\W]";
        string replacement = "%";
        Regex regex = new Regex(pattern);
        string result = regex.Replace(input, replacement);

        return result;
    }
}
