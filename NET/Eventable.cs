using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CEH
{
    public interface IEventable<T> : IDisposable where T : class
    {
        T Instance { get; }
    }

    public abstract class Eventable<TEventType> : IEventComponent, IEventable<TEventType> where TEventType : class
    {
        private readonly IEventHandler _handler;

        public Eventable(IEventHandler handler) : this(handler, true)
        {
        }

        public Eventable(IEventHandler handler, bool enabled)
        {
            _handler = handler;

            if (enabled)
            {
                _handler.Add(Instance);
            }
        }

        public bool Enabled
        {
            get => _handler.HasInstance(Instance);
            set
            {
                if (disposedValue) { return; }
                if (value)
                {
                    _handler.Add(Instance);
                }
                else
                {
                    _handler.Remove(Instance);
                }
            }
        }

        public abstract TEventType Instance { get; }

        #region IEventComponent

        public IEnumerable<object> Acquire(string eventName, params object[] parameters) => _handler.Acquire(eventName, parameters);

        public IEnumerable<T> Acquire<T>(string eventName, params object[] parameters) => _handler.Acquire<T>(eventName, parameters);

        public Task<IEnumerable<object>> AcquireAsync(string eventName, params object[] parameters) => _handler.AcquireAsync(eventName, parameters);

        public Task<IEnumerable<T>> AcquireAsync<T>(string eventName, params object[] parameters) => _handler.AcquireAsync<T>(eventName, parameters);

        public bool HasInstance<T>(T t) where T : class => _handler.HasInstance(t);

        public void Invoke(string eventName, params object[] parameters) => _handler.Invoke(eventName, parameters);

        public Task InvokeAsync(string eventName, params object[] parameters) => _handler.InvokeAsync(eventName, parameters);

        #endregion IEventComponent

        #region IDisposable Support

        private bool disposedValue = false; // To detect redundant calls

        public void Dispose()
        {
            Dispose(true);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                _handler.Remove(Instance);

                disposedValue = true;
            }
        }

        #endregion IDisposable Support
    }
}