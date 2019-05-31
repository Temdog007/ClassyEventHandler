using System;

namespace ClassyEventHandler
{
    public interface IEventable<T> : IDisposable where T : class
    {
        T Instance { get; }
    }

    public abstract class Eventable<T> : IEventable<T> where T: class
    {
        private readonly IEventHandler _handler;

        public Eventable(IEventHandler handler)
        {
            _handler = handler;
            _handler.AddEventable(this);
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