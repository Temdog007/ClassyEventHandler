namespace CEH
{
    public interface IEventHandler : IEventComponent
    {
        bool Add<T>(T t) where T : class;

        bool Remove<T>(T t) where T : class;
    }
}