using System;

namespace CEH
{
    public interface IEventable<T> : IDisposable where T : class
    {
        T Instance { get; }
    }

    public abstract class Eventable<T> : IEventable<T> where T : class
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
                _handler.AddEventable(this);
            }
        }

        public void Invoke(string eventName) => _handler.Invoke(eventName);

        public bool Enabled
        {
            get => _handler.HasInstance(this);
            set
            {
                if (disposedValue) { return; }
                if (value)
                {
                    _handler.AddEventable(this);
                }
                else
                {
                    _handler.RemoveEventable(this);
                }
            }
        }

        public abstract T Instance { get; }

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
                _handler.RemoveEventable(this);

                disposedValue = true;
            }
        }

        #endregion IDisposable Support
    }
}