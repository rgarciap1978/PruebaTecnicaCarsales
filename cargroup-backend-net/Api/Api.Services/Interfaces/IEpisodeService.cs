using Api.DTO;

namespace Api.Services.Interfaces
{
    public interface IEpisodeService
    {
        Task<CollectionGenericDTO<ICollection<EpisodeDTO>>> GetAsync();

        Task<GenericDTO<EpisodeDTO>> GetByIdAsync(int id);

        Task<GenericDTO<ICollection<EpisodeDTO>>> GetMultipleAsync(string ids);

        Task<CollectionGenericDTO<ICollection<EpisodeDTO>>> FilterAsync(EpisodeFilterDTO episodeFilterDTO);
    }
}
