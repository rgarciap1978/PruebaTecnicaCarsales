using System.Text.Json.Serialization;

namespace Api.Entities
{
    public class Setting
    {
        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("url")]
        public string? Url { get; set; }
    }
}
