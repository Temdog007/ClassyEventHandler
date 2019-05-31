using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClassyEventHandler
{
    public interface IEventHandler
    {
        IEnumerable<object> Acquire(string eventName, params object[] parameters);

        IEnumerable<T> Acquire<T>(string eventName, params object[] parameters);

        Task<IEnumerable<object>> AcquireAsync(string eventName, params object[] parameters);

        Task<IEnumerable<T>> AcquireAsync<T>(string eventName, params object[] parameters);

        bool AddEventable<T>(IEventable<T> eventable) where T : class;

        bool HasInstance<T>(IEventable<T> eventable) where T : class;

        void Invoke(string eventName, params object[] parameters);

        Task InvokeAsync(string eventName, params object[] parameters);

        bool RemoveEventable<T>(IEventable<T> eventable) where T : class;
    }
}