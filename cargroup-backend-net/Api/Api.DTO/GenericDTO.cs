namespace Api.DTO
{
    public class GenericDTO<T> : BaseDTO
    {
        public T? Results { get; set; }
    }
}
