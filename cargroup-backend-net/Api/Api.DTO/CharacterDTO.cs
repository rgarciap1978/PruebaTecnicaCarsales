using Api.Entities;
using System.Text.Json.Serialization;

namespace Api.DTO
{
    public class CharacterDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string? Name { get; set; }

        [JsonPropertyName("status")]
        public string? Status { get; set; }

        [JsonPropertyName("species")]
        public string? Species { get; set; }

        [JsonPropertyName("type")]
        public string? Type { get; set; }

        [JsonPropertyName("gender")]
        public string? Gender { get; set; }

        [JsonPropertyName("origin")]
        public Setting? Origin { get; set; }

        [JsonPropertyName("location")]
        public Setting? Location { get; set; }

        [JsonPropertyName("image")]
        public string? Image { get; set; }

        [JsonPropertyName("episode")]
        public string[]? Episode { get; set; }

        [JsonPropertyName("url")]
        public string? Url { get; set; }

        [JsonPropertyName("created")]
        public string? Created { get; set; }
    }
}
