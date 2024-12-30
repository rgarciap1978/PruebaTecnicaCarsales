using Api.Configurations;
using Api.DTO;
using Api.Services.Interfaces;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace Api.Services
{
    public class CharacterService : ICharacterService
    {
        private readonly HttpClient _http;
        private readonly string baseUrl;

        public CharacterService(HttpClient http, IOptions<RickAndMortyOptions> options)
        {
            _http = http;
            baseUrl = options.Value.baseUrl;
        }

        public async Task<CollectionGenericDTO<ICollection<CharacterDTO>>> FilterAsync(CharacterFilterDTO characterFilter)
        {
            var response = new CollectionGenericDTO<ICollection<CharacterDTO>>();

            try
            {

                var filter = "";
                if (characterFilter.Page is not null) filter += $"page={characterFilter.Page}&";
                if (characterFilter.Name is not null) filter += $"name={characterFilter.Name}&";
                if (characterFilter.Status is not null) filter += $"status={characterFilter.Status}&";
                if (characterFilter.Species is not null) filter += $"species={characterFilter.Species}&";
                if (characterFilter.Type is not null) filter += $"type={characterFilter.Type}&";
                if (characterFilter.Gender is not null) filter += $"gender={characterFilter.Gender}&";
                if (filter != "") filter = filter.Substring(0, filter.Length - 1);

                var collection = await _http.GetStringAsync($"{baseUrl}character/?{filter}");
                var data = JsonDocument.Parse(collection);

                response.Info = data.RootElement.GetProperty("info").Deserialize<PaginatorDTO>();
                response.Info.Next = Utils.Utils.GetPage(response.Info.Next);
                response.Info.Prev = Utils.Utils.GetPage(response.Info.Prev);

                response.Results = data.RootElement.GetProperty("results").Deserialize<List<CharacterDTO>>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener la lista de personajes\n{ex.Message}";
            }

            return response;
        }

        public async Task<CollectionGenericDTO<ICollection<CharacterDTO>>> GetAsync()
        {
            var response = new CollectionGenericDTO<ICollection<CharacterDTO>>();

            try
            {
                var collection = await _http.GetStringAsync($"{baseUrl}character");
                var data = JsonDocument.Parse(collection);

                response.Info =  data.RootElement.GetProperty("info").Deserialize<PaginatorDTO>();
                response.Info.Next = Utils.Utils.GetPage(response.Info.Next);
                response.Info.Prev = Utils.Utils.GetPage(response.Info.Prev);

                response.Results = data.RootElement.GetProperty("results").Deserialize<List<CharacterDTO>>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener la lista de personajes\n{ex.Message}";
            }

            return response;
        }

        public async Task<GenericDTO<CharacterDTO>> GetByIdAsync(int id)
        {
            var response = new GenericDTO<CharacterDTO>();

            try
            {
                var collection = await _http.GetStringAsync($"{baseUrl}character/{id}");
                var data = JsonDocument.Parse(collection);

                response.Results = data.RootElement.Deserialize<CharacterDTO>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener el personaje\n{ex.Message}";
            }

            return response;
        }

        public async Task<GenericDTO<ICollection<CharacterDTO>>> GetMultipleAsync(string ids)
        {
            var response = new GenericDTO<ICollection<CharacterDTO>>();

            try
            {
                var collection = await _http.GetStringAsync($"{baseUrl}character/{ids}");
                var data = JsonDocument.Parse(collection);

                response.Results = data.RootElement.Deserialize<List<CharacterDTO>>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener la lista de personajes\n{ex.Message}";
            }

            return response;
        }
    }
}
