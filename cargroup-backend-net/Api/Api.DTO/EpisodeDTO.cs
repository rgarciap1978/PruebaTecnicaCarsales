using Api.Entities;
using System.Text.Json.Serialization;

namespace Api.DTO
{
    public class EpisodeDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("air_date")]
        public string AirDate { get; set; }

        [JsonPropertyName("episode")]
        public string CodeEpisode { get; set; }

        [JsonPropertyName("characters")]
        public string[] Characters { get; set; }

        [JsonPropertyName("url")]
        public string Url { get; set; }

        [JsonPropertyName("created")]
        public string Created { get; set; }
    }
}
