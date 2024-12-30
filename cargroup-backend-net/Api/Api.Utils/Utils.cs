using System.Web;

namespace Api.Utils
{
    public static class Utils
    {
        public static string GetPage(string url)
        {
            if (string.IsNullOrEmpty(url)) return string.Empty;

            Uri uri = new Uri(url);
            var query = HttpUtility.ParseQueryString(uri.Query);

            return query["page"];
        }
    }
}
