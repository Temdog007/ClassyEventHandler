using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;

namespace ClassyEventHandler
{
    internal class MethodInstance
    {
        internal MethodInfo Method { get; }

        public MethodInstance(MethodInfo method, object instance)
        {
            Method = method ?? throw new ArgumentNullException(nameof(method));
            Instance = instance ?? throw new ArgumentNullException(nameof(instance));
        }

        internal object Instance { get; }

        public bool Invoke(object[] parameters)
        {
            var returnValue = Method.Invoke(Instance, parameters);
            if(returnValue is bool val)
            {
                return val;
            }

            return false;
        }
    }

    public class EventHandler : IEventHandler
    {
        private readonly Dictionary<string, LinkedList<MethodInstance>> _methodInstances = new Dictionary<string, LinkedList<MethodInstance>>();

        private readonly Dictionary<Type, MethodInfo[]> _methodDictionary = new Dictionary<Type, MethodInfo[]>();

        private readonly Dictionary<Type, LinkedList<object>> _instancesDictionary = new Dictionary<Type, LinkedList<object>>();

        public bool AddEventable<T>(IEventable<T> eventable) where T : class
        {
            var type = typeof(T);

            var instance = eventable.Instance;
            if(!_instancesDictionary.ContainsKey(type))
            {
                _instancesDictionary.Add(type, new LinkedList<object>());
            }
            _instancesDictionary[type].AddLast(instance);

            if (!_methodDictionary.TryGetValue(type, out var methods))
            {
                methods = type.GetMethods(BindingFlags.Public | BindingFlags.Instance | BindingFlags.DeclaredOnly);
                _methodDictionary.Add(type, methods);
            }

            foreach(var method in methods)
            {
                if(!_methodInstances.ContainsKey(method.Name))
                {
                    _methodInstances.Add(method.Name, new LinkedList<MethodInstance>());
                }
                _methodInstances[method.Name].AddLast(new MethodInstance(method, instance));
            }

            return true;
        }

        public void Invoke(string eventName, params object[] parameters)
        {
            if(!_methodInstances.ContainsKey(eventName))
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
                return new bool[] {  };
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
            var type = typeof(T);
            return _instancesDictionary[type].Remove(eventable.Instance);
        }
    }
}
