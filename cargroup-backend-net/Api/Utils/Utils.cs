using System.Web;

namespace Utils
{
    public class Utils
    {
        public string GetPage(string url)
        {
            if (string.IsNullOrEmpty(url)) return string.Empty;

            Uri uri = new Uri(url);
            var query = HttpUtility.ParseQueryString(uri.Query);

            return query["page"];
        }
    }
}
