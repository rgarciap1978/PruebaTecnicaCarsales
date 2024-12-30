using Api.Configurations;
using Api.DTO;
using Api.Services.Interfaces;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace Api.Services
{
    public class LocationService : ILocationService
    {
        private readonly HttpClient _http;
        private readonly string baseUrl;

        public LocationService(HttpClient http, IOptions<RickAndMortyOptions> options)
        {
            _http = http;
            baseUrl = options.Value.baseUrl;
        }

        public async Task<CollectionGenericDTO<ICollection<LocationDTO>>> FilterAsync(LocationFilterDTO locationFilterDTO)
        {
            var response = new CollectionGenericDTO<ICollection<LocationDTO>>();

            try
            {
                var filter = "";
                if (locationFilterDTO.Page is not null) filter += $"page={locationFilterDTO.Page}&";
                if (locationFilterDTO.Name is not null) filter += $"name={locationFilterDTO.Name}&";
                if (locationFilterDTO.Type is not null) filter += $"type={locationFilterDTO.Type}&";
                if (locationFilterDTO.Dimension is not null) filter += $"dimension={locationFilterDTO.Dimension}&";
                if (filter != "") filter = filter.Substring(0, filter.Length - 1);

                var collection = await _http.GetStringAsync($"{baseUrl}location/?{filter}");
                var data = JsonDocument.Parse(collection);

                response.Info = data.RootElement.GetProperty("info").Deserialize<PaginatorDTO>();
                response.Info.Next = Utils.Utils.GetPage(response.Info.Next);
                response.Info.Prev = Utils.Utils.GetPage(response.Info.Prev);

                response.Results = data.RootElement.GetProperty("results").Deserialize<List<LocationDTO>>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener la lista de ubicaciones\n{ex.Message}";
            }

            return response;
        }

        public async Task<CollectionGenericDTO<ICollection<LocationDTO>>> GetAsync()
        {
            var response = new CollectionGenericDTO<ICollection<LocationDTO>>();

            try
            {
                var collection = await _http.GetStringAsync($"{baseUrl}location");
                var data = JsonDocument.Parse(collection);

                response.Info = data.RootElement.GetProperty("info").Deserialize<PaginatorDTO>();
                response.Info.Next = Utils.Utils.GetPage(response.Info.Next);
                response.Info.Prev = Utils.Utils.GetPage(response.Info.Prev);

                response.Results = data.RootElement.GetProperty("results").Deserialize<List<LocationDTO>>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener la lista de ubicaciones\n{ex.Message}";
            }

            return response;
        }

        public async Task<GenericDTO<LocationDTO>> GetByIdAsync(int id)
        {
            var response = new GenericDTO<LocationDTO>();

            try
            {
                var collection = await _http.GetStringAsync($"{baseUrl}location/{id}");
                var data = JsonDocument.Parse(collection);

                response.Results = data.RootElement.Deserialize<LocationDTO>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener la ubicacion\n{ex.Message}";
            }

            return response;
        }

        public async Task<GenericDTO<ICollection<LocationDTO>>> GetMultipleAsync(string ids)
        {
            var response = new GenericDTO<ICollection<LocationDTO>>();

            try
            {
                var collection = await _http.GetStringAsync($"{baseUrl}location/{ids}");
                var data = JsonDocument.Parse(collection);

                response.Results = data.RootElement.Deserialize<List<LocationDTO>>();
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.ErrorMessage = $"Error al obtener la lista de ubicaciones\n{ex.Message}";
            }

            return response;
        }
    }
}
