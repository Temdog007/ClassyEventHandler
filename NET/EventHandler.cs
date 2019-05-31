using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ClassyEventHandler
{
    public class EventHandler : IEventHandler
    {
        private readonly Dictionary<Type, HashSet<object>> _instancesDictionary = new Dictionary<Type, HashSet<object>>();

        private readonly Dictionary<Type, MethodInfo[]> _methodDictionary = new Dictionary<Type, MethodInfo[]>();

        private readonly Dictionary<string, HashSet<MethodInstance>> _methodInstances = new Dictionary<string, HashSet<MethodInstance>>();

        public IEnumerable<object> Acquire(string eventName, params object[] parameters)
        {
            if(!_methodInstances.ContainsKey(eventName))
            {
                yield break;
            }

            foreach (var methodInstance in _methodInstances[eventName])
            {
                yield return methodInstance.Acquire(parameters);
            }
        }

        public IEnumerable<T> Acquire<T>(string eventName, params object[] parameters) => from obj in Acquire(eventName, parameters)
                                                                                          where obj is T
                                                                                          select (T)obj;

        public Task<IEnumerable<object>> AcquireAsync(string eventName, params object[] parameters) => Task.Run(() => Acquire(eventName, parameters));

        public Task<IEnumerable<T>> AcquireAsync<T>(string eventName, params object[] parameters) => Task.Run(() => Acquire<T>(eventName, parameters));

        public bool AddEventable<T>(IEventable<T> eventable) where T : class
        {
            var type = typeof(T);

            var instance = eventable.Instance;
            if (!_instancesDictionary.ContainsKey(type))
            {
                _instancesDictionary.Add(type, new HashSet<object>());
            }

            if (_instancesDictionary[type].Contains(instance))
            {
                return false;
            }

            _instancesDictionary[type].Add(instance);

            if (!_methodDictionary.TryGetValue(type, out var methods))
            {
                methods = type.GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly);
                _methodDictionary.Add(type, methods);
            }

            foreach (var method in methods)
            {
                if (!_methodInstances.ContainsKey(method.Name))
                {
                    _methodInstances.Add(method.Name, new HashSet<MethodInstance>());
                }
                _methodInstances[method.Name].Add(new MethodInstance(method, instance));
            }

            return true;
        }

        bool IEventHandler.HasInstance<T>(Eventable<T> eventable)
        {
            var type = typeof(T);
            return _instancesDictionary.ContainsKey(type) ? _instancesDictionary[type].Contains(eventable.Instance) : false;
        }

        public void Invoke(string eventName, params object[] parameters)
        {
            if (!_methodInstances.ContainsKey(eventName))
            {
                return;
            }

            foreach (var methodInstance in _methodInstances[eventName])
            {
                if (methodInstance.Invoke(parameters))
                {
                    break;
                }
            }
        }

        public Task InvokeAsync(string eventName, params object[] parameters)
        {
            if (!_methodInstances.ContainsKey(eventName))
            {
                return Task.Run(() => new bool[] { });
            }

            var tasks = new List<Task<bool>>();
            foreach (var methodInstance in _methodInstances[eventName])
            {
                tasks.Add(Task.Run(() => methodInstance.Invoke(parameters)));
            }

            return Task.WhenAll(tasks);
        }

        public bool RemoveEventable<T>(IEventable<T> eventable) where T : class
        {
            var instance = eventable.Instance;

            foreach (var key in _methodInstances.Keys.ToArray())
            {
                var oldList = _methodInstances[key];
                _methodInstances[key] = new HashSet<MethodInstance>(oldList.Where(x => x.Instance != instance));
            }

            var type = typeof(T);
            return _instancesDictionary[type].Remove(instance);
        }

        private class MethodInstance
        {
            internal MethodInstance(MethodInfo method, object instance)
            {
                Method = method ?? throw new ArgumentNullException(nameof(method));
                Instance = instance ?? throw new ArgumentNullException(nameof(instance));
            }

            internal object Instance { get; }

            internal MethodInfo Method { get; }

            internal object Acquire(object[] parameters) => Method.Invoke(Instance, parameters);

            internal bool Invoke(object[] parameters) => Method.Invoke(Instance, parameters) is bool val ? val : false;
        }
    }
}