namespace Api.DTO
{
    public class CollectionGenericDTO<T> : BaseDTO
    {
        public PaginatorDTO? Info { get; set; }
        public T? Results { get; set; }
    }
}
