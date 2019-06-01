/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.7.0
 */
Bridge.assembly("ClassEventHandlerBridge", function ($asm, globals) {
    "use strict";

    Bridge.definei("CEH.IEventable$1", function (T) { return {
        inherits: [System.IDisposable],
        $kind: "interface"
    }; });

    Bridge.define("CEH.IEventHandler", {
        $kind: "interface"
    });

    Bridge.define("CEH.EventHandler.MethodInstance", {
        $kind: "nested class",
        fields: {
            Instance: null,
            Method: null
        },
        ctors: {
            ctor: function (method, instance) {
                var $t;
                this.$initialize();
                this.Method = method || function () {
                    throw new System.ArgumentNullException.$ctor1("method");
                }();
                this.Instance = ($t = instance, $t != null ? $t : function () {
                    throw new System.ArgumentNullException.$ctor1("instance");
                }());
            }
        },
        methods: {
            Acquire: function (parameters) {
                return Bridge.Reflection.midel(this.Method, Bridge.unbox(this.Instance)).apply(null, Bridge.unbox(parameters));
            },
            Invoke: function (parameters) {
                var val;
                return ((val = Bridge.is(this.Acquire(parameters), System.Boolean) ? System.Nullable.getValue(Bridge.cast(Bridge.unbox(this.Acquire(parameters), System.Boolean), System.Boolean)) : null)) != null ? val : false;
            }
        }
    });

    Bridge.define("CEH.Eventable$1", function (T) { return {
        inherits: [CEH.IEventable$1(T)],
        fields: {
            _handler: null,
            disposedValue: false
        },
        props: {
            Enabled: {
                get: function () {
                    return this._handler.CEH$IEventHandler$HasInstance(T, this);
                },
                set: function (value) {
                    if (this.disposedValue) {
                        return;
                    }

                    if (value) {
                        this._handler.CEH$IEventHandler$AddEventable(T, this);
                    } else {
                        this._handler.CEH$IEventHandler$RemoveEventable(T, this);
                    }
                }
            }
        },
        alias: ["Dispose", "System$IDisposable$Dispose"],
        ctors: {
            init: function () {
                this.disposedValue = false;
            },
            ctor: function (handler) {
                CEH.Eventable$1(T).$ctor1.call(this, handler, true);

            },
            $ctor1: function (handler, enabled) {
                this.$initialize();
                this._handler = handler;

                if (enabled) {
                    this._handler.CEH$IEventHandler$AddEventable(T, this);
                }
            }
        },
        methods: {
            Invoke: function (eventName) {
                this._handler.CEH$IEventHandler$Invoke(eventName);
            },
            Dispose: function () {
                this.Dispose$1(true);
            },
            Dispose$1: function (disposing) {
                if (!this.disposedValue) {
                    this._handler.CEH$IEventHandler$RemoveEventable(T, this);

                    this.disposedValue = true;
                }
            }
        }
    }; });

    Bridge.define("CEH.EventHandler", {
        inherits: [CEH.IEventHandler],
        fields: {
            _instancesDictionary: null,
            _methodDictionary: null,
            _methodInstances: null
        },
        alias: [
            "Acquire$1", "CEH$IEventHandler$Acquire$1",
            "Acquire", "CEH$IEventHandler$Acquire",
            "AcquireAsync$1", "CEH$IEventHandler$AcquireAsync$1",
            "AcquireAsync", "CEH$IEventHandler$AcquireAsync",
            "AddEventable", "CEH$IEventHandler$AddEventable",
            "Invoke", "CEH$IEventHandler$Invoke",
            "InvokeAsync", "CEH$IEventHandler$InvokeAsync",
            "RemoveEventable", "CEH$IEventHandler$RemoveEventable"
        ],
        ctors: {
            init: function () {
                this._instancesDictionary = new (System.Collections.Generic.Dictionary$2(System.Type,System.Collections.Generic.HashSet$1(System.Object))).ctor();
                this._methodDictionary = new (System.Collections.Generic.Dictionary$2(System.Type,System.Array.type(System.Reflection.MethodInfo))).ctor();
                this._methodInstances = new (System.Collections.Generic.Dictionary$2(System.String,System.Collections.Generic.HashSet$1(CEH.EventHandler.MethodInstance))).ctor();
            }
        },
        methods: {
            Acquire$1: function (eventName, parameters) {
                return new (Bridge.GeneratorEnumerable$1(System.Object))(Bridge.fn.bind(this, function (eventName, parameters) {
                    var $step = 0,
                        $jumpFromFinally,
                        $returnValue,
                        $t,
                        methodInstance,
                        $async_e;

                    var $enumerator = new (Bridge.GeneratorEnumerator$1(System.Object))(Bridge.fn.bind(this, function () {
                        try {
                            for (;;) {
                                switch ($step) {
                                    case 0: {
                                        if (parameters === void 0) { parameters = []; }
                                            if (!this._methodInstances.containsKey(eventName)) {
                                                $step = 1;
                                                continue;
                                            } 
                                            $step = 2;
                                            continue;
                                    }
                                    case 1: {
                                        return false;
                                    }
                                    case 2: {
                                        $t = Bridge.getEnumerator(this._methodInstances.getItem(eventName));
                                            $step = 3;
                                            continue;
                                    }
                                    case 3: {
                                        if ($t.moveNext()) {
                                                methodInstance = $t.Current;
                                                $step = 4;
                                                continue;
                                            }
                                        $step = 6;
                                        continue;
                                    }
                                    case 4: {
                                        $enumerator.current = methodInstance.Acquire(parameters);
                                            $step = 5;
                                            return true;
                                    }
                                    case 5: {
                                        $step = 3;
                                        continue;
                                    }
                                    case 6: {

                                    }
                                    default: {
                                        return false;
                                    }
                                }
                            }
                        } catch($async_e1) {
                            $async_e = System.Exception.create($async_e1);
                            throw $async_e;
                        }
                    }));
                    return $enumerator;
                }, arguments));
            },
            Acquire: function (T, eventName, parameters) {
                if (parameters === void 0) { parameters = []; }
                return System.Linq.Enumerable.from(this.Acquire$1(eventName, parameters)).where(function (obj) {
                        return Bridge.is(obj, T);
                    }).select(function (obj) {
                    return Bridge.cast(Bridge.unbox(obj, T), T);
                });
            },
            AcquireAsync$1: function (eventName, parameters) {
                if (parameters === void 0) { parameters = []; }
                return System.Threading.Tasks.Task.run(Bridge.fn.bind(this, function () {
                    return this.Acquire$1(eventName, parameters);
                }));
            },
            AcquireAsync: function (T, eventName, parameters) {
                if (parameters === void 0) { parameters = []; }
                return System.Threading.Tasks.Task.run(Bridge.fn.bind(this, function () {
                    return this.Acquire(T, eventName, parameters);
                }));
            },
            AddEventable: function (T, eventable) {
                var $t;
                var type = T;

                var instance = eventable["CEH$IEventable$1$" + Bridge.getTypeAlias(T) + "$Instance"];
                if (!this._instancesDictionary.containsKey(type)) {
                    this._instancesDictionary.add(type, new (System.Collections.Generic.HashSet$1(System.Object)).ctor());
                }

                if (this._instancesDictionary.getItem(type).contains(instance)) {
                    return false;
                }

                this._instancesDictionary.getItem(type).add(instance);
                var methods = { };

                if (!this._methodDictionary.tryGetValue(type, methods)) {
                    methods.v = Bridge.Reflection.getMembers(type, 8, 22);
                    this._methodDictionary.add(type, methods.v);
                }

                $t = Bridge.getEnumerator(methods.v);
                try {
                    while ($t.moveNext()) {
                        var method = $t.Current;
                        if (!this._methodInstances.containsKey(method.n)) {
                            this._methodInstances.add(method.n, new (System.Collections.Generic.HashSet$1(CEH.EventHandler.MethodInstance)).ctor());
                        }
                        this._methodInstances.getItem(method.n).add(new CEH.EventHandler.MethodInstance(method, instance));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                return true;
            },
            CEH$IEventHandler$HasInstance: function (T, eventable) {
                var type = T;
                return this._instancesDictionary.containsKey(type) ? this._instancesDictionary.getItem(type).contains(eventable["CEH$IEventable$1$" + Bridge.getTypeAlias(T) + "$Instance"]) : false;
            },
            Invoke: function (eventName, parameters) {
                var $t;
                if (parameters === void 0) { parameters = []; }
                if (!this._methodInstances.containsKey(eventName)) {
                    return;
                }

                $t = Bridge.getEnumerator(this._methodInstances.getItem(eventName));
                try {
                    while ($t.moveNext()) {
                        var methodInstance = $t.Current;
                        if (methodInstance.Invoke(parameters)) {
                            break;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            InvokeAsync: function (eventName, parameters) {
                var $t;
                if (parameters === void 0) { parameters = []; }
                if (!this._methodInstances.containsKey(eventName)) {
                    return System.Threading.Tasks.Task.run(function () {
                        return System.Array.init([], System.Boolean);
                    });
                }

                var tasks = new (System.Collections.Generic.List$1(System.Threading.Tasks.Task$1(System.Boolean))).ctor();
                $t = Bridge.getEnumerator(this._methodInstances.getItem(eventName));
                try {
                    while ($t.moveNext()) {
                        var methodInstance = { v : $t.Current };
                        tasks.add(System.Threading.Tasks.Task.run((function ($me, methodInstance) {
                            return function () {
                                return methodInstance.v.Invoke(parameters);
                            };
                        })(this, methodInstance)));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                return System.Threading.Tasks.Task.whenAll(tasks);
            },
            RemoveEventable: function (T, eventable) {
                var $t;
                var instance = eventable["CEH$IEventable$1$" + Bridge.getTypeAlias(T) + "$Instance"];

                $t = Bridge.getEnumerator(System.Linq.Enumerable.from(this._methodInstances.Keys).ToArray());
                try {
                    while ($t.moveNext()) {
                        var key = $t.Current;
                        var oldList = this._methodInstances.getItem(key);
                        this._methodInstances.setItem(key, new (System.Collections.Generic.HashSet$1(CEH.EventHandler.MethodInstance)).$ctor1(System.Linq.Enumerable.from(oldList).where(function (x) {
                                return !Bridge.referenceEquals(x.Instance, instance);
                            })));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                var type = T;
                return this._instancesDictionary.getItem(type).remove(instance);
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDbGFzc0V2ZW50SGFuZGxlckJyaWRnZS5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiLi4vTkVUL0V2ZW50SGFuZGxlci5jcyIsIi4uL05FVC9FdmVudGFibGUuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFtSW9DQSxRQUFtQkE7OztnQkFFdkNBLGNBQVNBLFVBQVVBLEFBQUNBLEFBQTBCQTtvQkFBS0EsTUFBTUEsSUFBSUE7O2dCQUM3REEsZ0JBQVdBLGtDQUFZQSxBQUFDQSxBQUFzQkE7b0JBQUtBLE1BQU1BLElBQUlBOzs7OzsrQkFNckRBO2dCQUVwQkEsT0FBT0EscUNBQWNBLHlDQUFVQTs7OEJBQ2JBO2dCQUV0QkE7Z0JBQWFBLE9BQU9BLENBQUNBLE9BQU1BLHVCQUFRQSwrQkFBc0JBLHFDQUFNQSwwQkFBUUEsaURBQWNBLFVBQXNDQSxPQUFNQTs7Ozs7Ozs7Ozs7Ozs7b0JDOUd6SEEsT0FBT0EsK0NBQXdCQTs7O29CQU0vQkEsSUFBSUE7d0JBRUFBOzs7b0JBR0pBLElBQUlBO3dCQUVBQSxnREFBeUJBOzt3QkFJekJBLG1EQUE0QkE7Ozs7Ozs7Ozs7NEJBdkNmQTtxREFBOEJBOzs7OEJBSzlCQSxTQUF1QkE7O2dCQUVwQ0EsZ0JBQVdBOztnQkFFWEEsSUFBSUE7b0JBRUFBLGdEQUF5QkE7Ozs7OzhCQUd0QkE7Z0JBRWZBLHVDQUFnQkE7OztnQkFtQ1JBOztpQ0FHMkJBO2dCQUUzQkEsSUFBSUEsQ0FBQ0E7b0JBRURBLG1EQUE0QkE7O29CQUU1QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NENEL0RrRUEsS0FBSUE7eUNBRVZBLEtBQUlBO3dDQUVRQSxLQUFJQTs7OztpQ0FFakRBLFdBQWtCQTs7Ozs7Ozs7Ozs7Ozs7OzRDQUVqREEsSUFBR0EsQ0FBQ0Esa0NBQTZCQTs7Ozs7Ozs7d0NBRTdCQTs7O3dDQUdKQSwwQkFBK0JBLDhCQUFpQkE7Ozs7Ozs7Ozs7Ozs7O3dDQUU1Q0Esc0JBQWFBLHVCQUF1QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFHdEJBLEdBQUdBLFdBQWtCQTs7Z0JBRS9DQSxPQUNnQkEsMkNBQVFBLFdBQVdBLG1CQUExQkE7K0JBQ0NBOzhCQUREQTsyQkFFRUEsWUFBR0E7OztzQ0FDNkJBLFdBQWtCQTs7Z0JBRTdEQSxPQUFPQSxnQ0FBOEJBLEFBQTRCQTsyQkFBTUEsZUFBUUEsV0FBV0E7OztvQ0FDcERBLEdBQUdBLFdBQWtCQTs7Z0JBRTNEQSxPQUFPQSxnQ0FBeUJBLEFBQXVCQTsyQkFBTUEsZ0JBQVdBLFdBQVdBOzs7b0NBRXREQSxHQUFHQTs7Z0JBRXhCQSxXQUFXQSxBQUFPQTs7Z0JBRWxCQSxlQUFlQTtnQkFDZkEsSUFBSUEsQ0FBQ0Esc0NBQWlDQTtvQkFFbENBLDhCQUF5QkEsTUFBTUEsS0FBSUE7OztnQkFHdkNBLElBQUlBLGtDQUFxQkEsZUFBZUE7b0JBRXBDQTs7O2dCQUdKQSxrQ0FBcUJBLFVBQVVBO2dCQUMzQ0E7O2dCQUVZQSxJQUFJQSxDQUFDQSxtQ0FBOEJBLE1BQVVBO29CQUV6Q0EsWUFBVUEsc0NBQWdCQTtvQkFDMUJBLDJCQUFzQkEsTUFBTUE7OztnQkFHaENBLDBCQUF1QkE7Ozs7d0JBRW5CQSxJQUFJQSxDQUFDQSxrQ0FBNkJBOzRCQUU5QkEsMEJBQXFCQSxVQUFhQSxLQUFJQTs7d0JBRTFDQSw4QkFBaUJBLGNBQWlCQSxJQUFJQSxnQ0FBZUEsUUFBUUE7Ozs7Ozs7O2dCQUdqRUE7O3FEQUcyQkEsR0FBR0E7Z0JBRTlCQSxXQUFXQSxBQUFPQTtnQkFDbEJBLE9BQU9BLHNDQUFpQ0EsUUFBUUEsa0NBQXFCQSxlQUFlQTs7OEJBR3JFQSxXQUFrQkE7OztnQkFFakNBLElBQUlBLENBQUNBLGtDQUE2QkE7b0JBRTlCQTs7O2dCQUdKQSwwQkFBK0JBLDhCQUFpQkE7Ozs7d0JBRTVDQSxJQUFJQSxzQkFBc0JBOzRCQUV0QkE7Ozs7Ozs7OzttQ0FLWUEsV0FBa0JBOzs7Z0JBRXRDQSxJQUFJQSxDQUFDQSxrQ0FBNkJBO29CQUU5QkEsT0FBT0EsZ0NBQWlCQSxBQUFlQTsrQkFBTUE7Ozs7Z0JBR2pEQSxZQUFZQSxLQUFJQTtnQkFDaEJBLDBCQUErQkEsOEJBQWlCQTs7Ozt3QkFFNUNBLFVBQVVBLGdDQUFlQSxBQUFhQTs7dUNBQU1BLHdCQUFzQkE7Ozs7Ozs7Ozs7Z0JBR3RFQSxPQUFPQSxvQ0FBbUJBOzt1Q0FHRkEsR0FBR0E7O2dCQUUzQkEsZUFBZUE7O2dCQUVmQSwwQkFBb0JBLDRCQUF1Q0E7Ozs7d0JBRXZEQSxjQUFjQSw4QkFBaUJBO3dCQUMvQkEsOEJBQWlCQSxLQUFPQSxLQUFJQSw4RUFBd0JBLDRCQUEwREEsZUFBUUEsQUFBeUNBO3VDQUFLQSxvQ0FBY0E7Ozs7Ozs7OztnQkFHdExBLFdBQVdBLEFBQU9BO2dCQUNsQkEsT0FBT0Esa0NBQXFCQSxhQUFhQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgQ0VIXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFdmVudEhhbmRsZXIgOiBJRXZlbnRIYW5kbGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBEaWN0aW9uYXJ5PFR5cGUsIEhhc2hTZXQ8b2JqZWN0Pj4gX2luc3RhbmNlc0RpY3Rpb25hcnkgPSBuZXcgRGljdGlvbmFyeTxUeXBlLCBIYXNoU2V0PG9iamVjdD4+KCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRGljdGlvbmFyeTxUeXBlLCBNZXRob2RJbmZvW10+IF9tZXRob2REaWN0aW9uYXJ5ID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgTWV0aG9kSW5mb1tdPigpO1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IERpY3Rpb25hcnk8c3RyaW5nLCBIYXNoU2V0PE1ldGhvZEluc3RhbmNlPj4gX21ldGhvZEluc3RhbmNlcyA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgSGFzaFNldDxNZXRob2RJbnN0YW5jZT4+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYWJsZTxvYmplY3Q+IEFjcXVpcmUoc3RyaW5nIGV2ZW50TmFtZSwgcGFyYW1zIG9iamVjdFtdIHBhcmFtZXRlcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighX21ldGhvZEluc3RhbmNlcy5Db250YWluc0tleShldmVudE5hbWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG1ldGhvZEluc3RhbmNlIGluIF9tZXRob2RJbnN0YW5jZXNbZXZlbnROYW1lXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeWllbGQgcmV0dXJuIG1ldGhvZEluc3RhbmNlLkFjcXVpcmUocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbnB1YmxpYyBJRW51bWVyYWJsZTxUPiBBY3F1aXJlPFQ+KHN0cmluZyBldmVudE5hbWUsIHBhcmFtcyBvYmplY3RbXSBwYXJhbWV0ZXJzKVxyXG57XHJcbiAgICByZXR1cm5cclxuICAgICAgICBmcm9tIG9iaiBpbiBBY3F1aXJlKGV2ZW50TmFtZSwgcGFyYW1ldGVycylcclxuICAgICAgICB3aGVyZSBvYmogaXMgVFxyXG4gICAgICAgIHNlbGVjdCAoVClvYmo7XHJcbn1wdWJsaWMgVGFzazxJRW51bWVyYWJsZTxvYmplY3Q+PiBBY3F1aXJlQXN5bmMoc3RyaW5nIGV2ZW50TmFtZSwgcGFyYW1zIG9iamVjdFtdIHBhcmFtZXRlcnMpXHJcbntcclxuICAgIHJldHVybiBUYXNrLlJ1bjxJRW51bWVyYWJsZTxvYmplY3Q+PigoRnVuYzxJRW51bWVyYWJsZTxvYmplY3Q+PikoKCkgPT4gQWNxdWlyZShldmVudE5hbWUsIHBhcmFtZXRlcnMpKSk7XHJcbn1wdWJsaWMgVGFzazxJRW51bWVyYWJsZTxUPj4gQWNxdWlyZUFzeW5jPFQ+KHN0cmluZyBldmVudE5hbWUsIHBhcmFtcyBvYmplY3RbXSBwYXJhbWV0ZXJzKVxyXG57XHJcbiAgICByZXR1cm4gVGFzay5SdW48SUVudW1lcmFibGU8VD4+KChGdW5jPElFbnVtZXJhYmxlPFQ+PikoKCkgPT4gQWNxdWlyZTxUPihldmVudE5hbWUsIHBhcmFtZXRlcnMpKSk7XHJcbn1cclxuICAgICAgICBwdWJsaWMgYm9vbCBBZGRFdmVudGFibGU8VD4oSUV2ZW50YWJsZTxUPiBldmVudGFibGUpIHdoZXJlIFQgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YoVCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSBldmVudGFibGUuSW5zdGFuY2U7XHJcbiAgICAgICAgICAgIGlmICghX2luc3RhbmNlc0RpY3Rpb25hcnkuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9pbnN0YW5jZXNEaWN0aW9uYXJ5LkFkZCh0eXBlLCBuZXcgSGFzaFNldDxvYmplY3Q+KCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX2luc3RhbmNlc0RpY3Rpb25hcnlbdHlwZV0uQ29udGFpbnMoaW5zdGFuY2UpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9pbnN0YW5jZXNEaWN0aW9uYXJ5W3R5cGVdLkFkZChpbnN0YW5jZSk7XHJcbk1ldGhvZEluZm9bXSBtZXRob2RzO1xuXHJcbiAgICAgICAgICAgIGlmICghX21ldGhvZERpY3Rpb25hcnkuVHJ5R2V0VmFsdWUodHlwZSwgb3V0IG1ldGhvZHMpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2RzID0gdHlwZS5HZXRNZXRob2RzKEJpbmRpbmdGbGFncy5QdWJsaWMgfCBCaW5kaW5nRmxhZ3MuSW5zdGFuY2UgfCBCaW5kaW5nRmxhZ3MuRGVjbGFyZWRPbmx5KTtcclxuICAgICAgICAgICAgICAgIF9tZXRob2REaWN0aW9uYXJ5LkFkZCh0eXBlLCBtZXRob2RzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG1ldGhvZCBpbiBtZXRob2RzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9tZXRob2RJbnN0YW5jZXMuQ29udGFpbnNLZXkobWV0aG9kLk5hbWUpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIF9tZXRob2RJbnN0YW5jZXMuQWRkKG1ldGhvZC5OYW1lLCBuZXcgSGFzaFNldDxNZXRob2RJbnN0YW5jZT4oKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfbWV0aG9kSW5zdGFuY2VzW21ldGhvZC5OYW1lXS5BZGQobmV3IE1ldGhvZEluc3RhbmNlKG1ldGhvZCwgaW5zdGFuY2UpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIElFdmVudEhhbmRsZXIuSGFzSW5zdGFuY2U8VD4oSUV2ZW50YWJsZTxUPiBldmVudGFibGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZihUKTtcclxuICAgICAgICAgICAgcmV0dXJuIF9pbnN0YW5jZXNEaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KHR5cGUpID8gX2luc3RhbmNlc0RpY3Rpb25hcnlbdHlwZV0uQ29udGFpbnMoZXZlbnRhYmxlLkluc3RhbmNlKSA6IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgSW52b2tlKHN0cmluZyBldmVudE5hbWUsIHBhcmFtcyBvYmplY3RbXSBwYXJhbWV0ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFfbWV0aG9kSW5zdGFuY2VzLkNvbnRhaW5zS2V5KGV2ZW50TmFtZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG1ldGhvZEluc3RhbmNlIGluIF9tZXRob2RJbnN0YW5jZXNbZXZlbnROYW1lXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZEluc3RhbmNlLkludm9rZShwYXJhbWV0ZXJzKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFRhc2sgSW52b2tlQXN5bmMoc3RyaW5nIGV2ZW50TmFtZSwgcGFyYW1zIG9iamVjdFtdIHBhcmFtZXRlcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIV9tZXRob2RJbnN0YW5jZXMuQ29udGFpbnNLZXkoZXZlbnROYW1lKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRhc2suUnVuPGJvb2xbXT4oKEZ1bmM8Ym9vbFtdPikoKCkgPT4gbmV3IGJvb2xbXSB7IH0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRhc2tzID0gbmV3IExpc3Q8VGFzazxib29sPj4oKTtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG1ldGhvZEluc3RhbmNlIGluIF9tZXRob2RJbnN0YW5jZXNbZXZlbnROYW1lXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFza3MuQWRkKFRhc2suUnVuPGJvb2w+KChGdW5jPGJvb2w+KSgoKSA9PiBtZXRob2RJbnN0YW5jZS5JbnZva2UocGFyYW1ldGVycykpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBUYXNrLldoZW5BbGw8Ym9vbD4odGFza3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgUmVtb3ZlRXZlbnRhYmxlPFQ+KElFdmVudGFibGU8VD4gZXZlbnRhYmxlKSB3aGVyZSBUIDogY2xhc3NcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IGV2ZW50YWJsZS5JbnN0YW5jZTtcclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBrZXkgaW4gU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5Ub0FycmF5PHN0cmluZz4oX21ldGhvZEluc3RhbmNlcy5LZXlzKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9sZExpc3QgPSBfbWV0aG9kSW5zdGFuY2VzW2tleV07XHJcbiAgICAgICAgICAgICAgICBfbWV0aG9kSW5zdGFuY2VzW2tleV0gPSBuZXcgSGFzaFNldDxNZXRob2RJbnN0YW5jZT4oU3lzdGVtLkxpbnEuRW51bWVyYWJsZS5XaGVyZTxFdmVudEhhbmRsZXIuTWV0aG9kSW5zdGFuY2U+KG9sZExpc3QsKEZ1bmM8RXZlbnRIYW5kbGVyLk1ldGhvZEluc3RhbmNlLGJvb2w+KSh4ID0+IHguSW5zdGFuY2UgIT0gaW5zdGFuY2UpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZW9mKFQpO1xyXG4gICAgICAgICAgICByZXR1cm4gX2luc3RhbmNlc0RpY3Rpb25hcnlbdHlwZV0uUmVtb3ZlKGluc3RhbmNlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xhc3MgTWV0aG9kSW5zdGFuY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludGVybmFsIE1ldGhvZEluc3RhbmNlKE1ldGhvZEluZm8gbWV0aG9kLCBvYmplY3QgaW5zdGFuY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1ldGhvZCA9IG1ldGhvZCA/PyAoKFN5c3RlbS5GdW5jPE1ldGhvZEluZm8+KSgoKT0+e3Rocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJtZXRob2RcIik7fSkpKCk7XHJcbiAgICAgICAgICAgICAgICBJbnN0YW5jZSA9IGluc3RhbmNlID8/ICgoU3lzdGVtLkZ1bmM8b2JqZWN0PikoKCk9Pnt0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiaW5zdGFuY2VcIik7fSkpKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludGVybmFsIG9iamVjdCBJbnN0YW5jZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgICAgIGludGVybmFsIE1ldGhvZEluZm8gTWV0aG9kIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5pbnRlcm5hbCBvYmplY3QgQWNxdWlyZShvYmplY3RbXSBwYXJhbWV0ZXJzKVxyXG57XHJcbiAgICByZXR1cm4gTWV0aG9kLkludm9rZShJbnN0YW5jZSwgcGFyYW1ldGVycyk7XHJcbn1pbnRlcm5hbCBib29sIEludm9rZShvYmplY3RbXSBwYXJhbWV0ZXJzKVxyXG57XHJcbmJvb2wgdmFsOyAgICByZXR1cm4gKHZhbCA9IEFjcXVpcmUocGFyYW1ldGVycykgaXMgYm9vbCA/IChib29sKUFjcXVpcmUocGFyYW1ldGVycykgOiBCcmlkZ2UuU2NyaXB0LldyaXRlPGJvb2w+KFwibnVsbFwiKSkgIT0gbnVsbD8gdmFsIDogZmFsc2U7XHJcbn0gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBDRUhcclxue1xyXG4gICAgcHVibGljIGludGVyZmFjZSBJRXZlbnRhYmxlPFQ+IDogSURpc3Bvc2FibGUgd2hlcmUgVCA6IGNsYXNzXHJcbiAgICB7XHJcbiAgICAgICAgVCBJbnN0YW5jZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgY2xhc3MgRXZlbnRhYmxlPFQ+IDogSUV2ZW50YWJsZTxUPiB3aGVyZSBUIDogY2xhc3NcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElFdmVudEhhbmRsZXIgX2hhbmRsZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFdmVudGFibGUoSUV2ZW50SGFuZGxlciBoYW5kbGVyKSA6IHRoaXMoaGFuZGxlciwgdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEV2ZW50YWJsZShJRXZlbnRIYW5kbGVyIGhhbmRsZXIsIGJvb2wgZW5hYmxlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9oYW5kbGVyID0gaGFuZGxlcjtcclxuXHJcbiAgICAgICAgICAgIGlmIChlbmFibGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfaGFuZGxlci5BZGRFdmVudGFibGU8VD4odGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbnB1YmxpYyB2b2lkIEludm9rZShzdHJpbmcgZXZlbnROYW1lKVxyXG57XHJcbiAgICBfaGFuZGxlci5JbnZva2UoZXZlbnROYW1lKTtcclxufVxyXG4gICAgICAgIHB1YmxpYyBib29sIEVuYWJsZWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVyLkhhc0luc3RhbmNlPFQ+KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgc2V0XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGRpc3Bvc2VkVmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfaGFuZGxlci5BZGRFdmVudGFibGU8VD4odGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9oYW5kbGVyLlJlbW92ZUV2ZW50YWJsZTxUPih0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgVCBJbnN0YW5jZSB7IGdldDsgfVxyXG5cclxuICAgICAgICAjcmVnaW9uIElEaXNwb3NhYmxlIFN1cHBvcnRcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBib29sIGRpc3Bvc2VkVmFsdWUgPSBmYWxzZTsgLy8gVG8gZGV0ZWN0IHJlZHVuZGFudCBjYWxsc1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBEaXNwb3NlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIERpc3Bvc2UodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgdmlydHVhbCB2b2lkIERpc3Bvc2UoYm9vbCBkaXNwb3NpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIWRpc3Bvc2VkVmFsdWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9oYW5kbGVyLlJlbW92ZUV2ZW50YWJsZTxUPih0aGlzKTtcclxuXHJcbiAgICAgICAgICAgICAgICBkaXNwb3NlZFZhbHVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgI2VuZHJlZ2lvbiBJRGlzcG9zYWJsZSBTdXBwb3J0XHJcbiAgICB9XHJcbn0iXQp9Cg==
