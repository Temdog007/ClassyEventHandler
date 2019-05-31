using System.Threading.Tasks;

namespace ClassyEventHandler
{
    public interface IEventHandler
    {
        bool AddEventable<T>(IEventable<T> eventable) where T : class;

        bool HasInstance<T>(Eventable<T> eventable) where T : class;

        void Invoke(string eventName, params object[] parameters);

        Task<bool[]> InvokeAsync(string eventName, params object[] parameters);

        bool RemoveEventable<T>(IEventable<T> eventable) where T : class;
    }
}