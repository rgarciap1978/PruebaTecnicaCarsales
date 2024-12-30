using Api.Configurations;
using Api.DTO;
using Api.Services.Interfaces;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace Api.Services
{
    public class EpisodeService : IEpisodeService
    {
        private readonly HttpClient _http;
        private readonly string baseUrl;

        public EpisodeService(HttpClient http, IOptions<RickAndMortyOptions> options)
        {
            _http = http;
            baseUrl = options.Value.baseUrl;
        }

        public async Task<CollectionGenericDTO<ICollection<EpisodeDTO>>> FilterAsync(EpisodeFilterDTO episodeFilterDTO)
        {
            var response = new CollectionGenericDTO<ICollection<EpisodeDTO>>();

            try
            {
                var filter = "";
                if (episodeFilterDTO.Page is not null) filter += $"page={episodeFilterDTO.Page}&";
                if (episodeFilterDTO.Name is not null) filter += $"name={episodeFilterDTO.Name}&";
                if (episodeFilterDTO.Episode is not null) filter += $"episode={episodeFilterDTO.Episode}&";
                if (filter != "") filter = filter.Substring(0, filter.Length - 1);

                var collection = await _http.GetStringAsync($"{baseUrl}episode/?{filter}");
                var data = JsonDocument.Parse(collection);

                response.Info = data.RootElement.GetProperty("info").Deserialize<PaginatorDTO>();
                response.Info.Next = Utils.Utils.GetPage(response.Info.Next);
                response.Info.Prev = Utils.Utils.GetPage(response.Info.Prev);

                response.Results = data.RootElement.GetProperty("results").Deserialize<List<EpisodeDTO>>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener la lista de episodios\n{ex.Message}";
            }

            return response;
        }

        public async Task<CollectionGenericDTO<ICollection<EpisodeDTO>>> GetAsync()
        {
            var response = new CollectionGenericDTO<ICollection<EpisodeDTO>>();

            try
            {
                var collection = await _http.GetStringAsync($"{baseUrl}episode");
                var data = JsonDocument.Parse(collection);

                response.Info = data.RootElement.GetProperty("info").Deserialize<PaginatorDTO>();
                response.Info.Next = Utils.Utils.GetPage(response.Info.Next);
                response.Info.Prev = Utils.Utils.GetPage(response.Info.Prev);

                response.Results = data.RootElement.GetProperty("results").Deserialize<List<EpisodeDTO>>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener la lista de episodios\n{ex.Message}";
            }

            return response;
        }

        public async Task<GenericDTO<EpisodeDTO>> GetByIdAsync(int id)
        {
            var response = new GenericDTO<EpisodeDTO>();

            try
            {
                var collection = await _http.GetStringAsync($"{baseUrl}episode/{id}");
                var data = JsonDocument.Parse(collection);

                response.Results = data.RootElement.Deserialize<EpisodeDTO>();
                response.Success = true;
            }
            catch(Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener el episodio\n{ex.Message}";
            }

            return response;
        }

        public async Task<GenericDTO<ICollection<EpisodeDTO>>> GetMultipleAsync(string ids)
        {
            var response=new GenericDTO<ICollection<EpisodeDTO>>();

            try
            {
                var collection = await _http.GetStringAsync($"{baseUrl}episode/{ids}");
                var data = JsonDocument.Parse(collection);

                response.Results = data.RootElement.Deserialize<List<EpisodeDTO>>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener la lista de episodios\n{ex.Message}";
            }

            return response;
        }
    }
}
