using Api.DTO;

namespace Api.Services.Interfaces
{
    public interface ILocationService
    {
        Task<CollectionGenericDTO<ICollection<LocationDTO>>> GetAsync();

        Task<GenericDTO<LocationDTO>> GetByIdAsync(int id);

        Task<GenericDTO<ICollection<LocationDTO>>> GetMultipleAsync(string ids);

        Task<CollectionGenericDTO<ICollection<LocationDTO>>> FilterAsync(LocationFilterDTO locationFilterDTO);
    }
}
