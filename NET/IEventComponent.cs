using System.Collections.Generic;
using System.Threading.Tasks;

namespace CEH
{
    public interface IEventComponent
    {
        IEnumerable<object> Acquire(string eventName, params object[] parameters);

        IEnumerable<T> Acquire<T>(string eventName, params object[] parameters);

        Task<IEnumerable<object>> AcquireAsync(string eventName, params object[] parameters);

        Task<IEnumerable<T>> AcquireAsync<T>(string eventName, params object[] parameters);

        bool HasInstance<T>(T t) where T : class;

        void Invoke(string eventName, params object[] parameters);

        Task InvokeAsync(string eventName, params object[] parameters);
    }
}