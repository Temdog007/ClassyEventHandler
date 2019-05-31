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

        public bool AddEventable<T>(IEventable<T> eventable) where T : class
        {
            var type = typeof(T);

            var instance = eventable.Instance;
            if (!_instancesDictionary.ContainsKey(type))
            {
                _instancesDictionary.Add(type, new HashSet<object>());
            }

            if(_instancesDictionary[type].Contains(instance))
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
            return _instancesDictionary[type].Contains(eventable.Instance);
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

        public async Task<bool[]> InvokeAsync(string eventName, params object[] parameters)
        {
            if (!_methodInstances.ContainsKey(eventName))
            {
                return new bool[] { };
            }

            var tasks = new List<Task<bool>>();
            foreach (var methodInstance in _methodInstances[eventName])
            {
                tasks.Add(Task.Run(() => methodInstance.Invoke(parameters)));
            }

            return await Task.WhenAll(tasks);
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
    }

    internal class MethodInstance
    {
        public MethodInstance(MethodInfo method, object instance)
        {
            Method = method ?? throw new ArgumentNullException(nameof(method));
            Instance = instance ?? throw new ArgumentNullException(nameof(instance));
        }

        internal object Instance { get; }

        internal MethodInfo Method { get; }

        public bool Invoke(object[] parameters)
        {
            var returnValue = Method.Invoke(Instance, parameters);
            if (returnValue is bool val)
            {
                return val;
            }

            return false;
        }
    }
}