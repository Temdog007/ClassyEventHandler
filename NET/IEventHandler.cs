using System;
using System.Threading.Tasks;

namespace ClassyEventHandler
{
    public interface IEventHandler
    {
        void Invoke(string eventName, params object[] parameters);

        Task<bool[]> InvokeAsync(string eventName, params object[] parameters);

        bool AddEventable<T>(IEventable<T> eventable) where T : class;

        bool RemoveEventable<T>(IEventable<T> eventable) where T : class;
    }
}
