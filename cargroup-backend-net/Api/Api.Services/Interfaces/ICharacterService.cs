using Api.DTO;

namespace Api.Services.Interfaces
{
    public interface ICharacterService
    {
        Task<CollectionGenericDTO<ICollection<CharacterDTO>>> GetAsync();

        Task<GenericDTO<CharacterDTO>> GetByIdAsync(int id);

        Task<GenericDTO<ICollection<CharacterDTO>>> GetMultipleAsync(string ids);

        Task<CollectionGenericDTO<ICollection<CharacterDTO>>> FilterAsync(CharacterFilterDTO characterFilterDTO);
    }
}
