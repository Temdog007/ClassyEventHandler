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

    Bridge.define("CEH.IEventComponent", {
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

    Bridge.define("CEH.Eventable$1", function (TEventType) { return {
        inherits: [CEH.IEventComponent,CEH.IEventable$1(TEventType)],
        fields: {
            _handler: null,
            disposedValue: false
        },
        props: {
            Enabled: {
                get: function () {
                    return this._handler.CEH$IEventComponent$HasInstance(TEventType, this.Instance);
                },
                set: function (value) {
                    if (this.disposedValue) {
                        return;
                    }

                    if (value) {
                        this._handler.CEH$IEventHandler$Add(TEventType, this.Instance);
                    } else {
                        this._handler.CEH$IEventHandler$Remove(TEventType, this.Instance);
                    }
                }
            }
        },
        alias: [
            "Acquire$1", "CEH$IEventComponent$Acquire$1",
            "Acquire", "CEH$IEventComponent$Acquire",
            "AcquireAsync$1", "CEH$IEventComponent$AcquireAsync$1",
            "AcquireAsync", "CEH$IEventComponent$AcquireAsync",
            "HasInstance", "CEH$IEventComponent$HasInstance",
            "Invoke", "CEH$IEventComponent$Invoke",
            "InvokeAsync", "CEH$IEventComponent$InvokeAsync",
            "Dispose", "System$IDisposable$Dispose"
        ],
        ctors: {
            init: function () {
                this.disposedValue = false;
            },
            ctor: function (handler) {
                CEH.Eventable$1(TEventType).$ctor1.call(this, handler, true);
            },
            $ctor1: function (handler, enabled) {
                this.$initialize();
                this._handler = handler;

                if (enabled) {
                    this._handler.CEH$IEventHandler$Add(TEventType, this.Instance);
                }
            }
        },
        methods: {
            Acquire$1: function (eventName, parameters) {
                if (parameters === void 0) { parameters = []; }
                return this._handler.CEH$IEventComponent$Acquire$1(eventName, parameters);
            },
            Acquire: function (T, eventName, parameters) {
                if (parameters === void 0) { parameters = []; }
                return this._handler.CEH$IEventComponent$Acquire(T, eventName, parameters);
            },
            AcquireAsync$1: function (eventName, parameters) {
                if (parameters === void 0) { parameters = []; }
                return this._handler.CEH$IEventComponent$AcquireAsync$1(eventName, parameters);
            },
            AcquireAsync: function (T, eventName, parameters) {
                if (parameters === void 0) { parameters = []; }
                return this._handler.CEH$IEventComponent$AcquireAsync(T, eventName, parameters);
            },
            HasInstance: function (T, t) {
                return this._handler.CEH$IEventComponent$HasInstance(T, t);
            },
            Invoke: function (eventName, parameters) {
                if (parameters === void 0) { parameters = []; }
                this._handler.CEH$IEventComponent$Invoke(eventName, parameters);
            },
            InvokeAsync: function (eventName, parameters) {
                if (parameters === void 0) { parameters = []; }
                return this._handler.CEH$IEventComponent$InvokeAsync(eventName, parameters);
            },
            Dispose: function () {
                this.Dispose$1(true);
            },
            Dispose$1: function (disposing) {
                if (!this.disposedValue) {
                    this._handler.CEH$IEventHandler$Remove(TEventType, this.Instance);

                    this.disposedValue = true;
                }
            }
        }
    }; });

    Bridge.define("CEH.IEventHandler", {
        inherits: [CEH.IEventComponent],
        $kind: "interface"
    });

    Bridge.define("CEH.EventHandler", {
        inherits: [CEH.IEventHandler],
        fields: {
            _instancesDictionary: null,
            _methodDictionary: null,
            _methodInstances: null
        },
        alias: [
            "Acquire$1", "CEH$IEventComponent$Acquire$1",
            "Acquire", "CEH$IEventComponent$Acquire",
            "AcquireAsync$1", "CEH$IEventComponent$AcquireAsync$1",
            "AcquireAsync", "CEH$IEventComponent$AcquireAsync",
            "Add", "CEH$IEventHandler$Add",
            "Invoke", "CEH$IEventComponent$Invoke",
            "InvokeAsync", "CEH$IEventComponent$InvokeAsync",
            "Remove", "CEH$IEventHandler$Remove"
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
            Add: function (T, t) {
                var $t;
                var type = T;

                if (!this._instancesDictionary.containsKey(type)) {
                    this._instancesDictionary.add(type, new (System.Collections.Generic.HashSet$1(System.Object)).ctor());
                }

                if (this._instancesDictionary.getItem(type).contains(t)) {
                    return false;
                }

                this._instancesDictionary.getItem(type).add(t);
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
                        this._methodInstances.getItem(method.n).add(new CEH.EventHandler.MethodInstance(method, t));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                return true;
            },
            CEH$IEventComponent$HasInstance: function (T, t) {
                var type = T;
                return this._instancesDictionary.containsKey(type) ? this._instancesDictionary.getItem(type).contains(t) : false;
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
            Remove: function (T, t) {
                var $t;
                $t = Bridge.getEnumerator(System.Linq.Enumerable.from(this._methodInstances.Keys).ToArray());
                try {
                    while ($t.moveNext()) {
                        var key = $t.Current;
                        var oldList = this._methodInstances.getItem(key);
                        this._methodInstances.setItem(key, new (System.Collections.Generic.HashSet$1(CEH.EventHandler.MethodInstance)).$ctor1(System.Linq.Enumerable.from(oldList).where(function (x) {
                                return !Bridge.referenceEquals(x.Instance, t);
                            })));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }

                var type = T;
                var set = { };
                return this._instancesDictionary.tryGetValue(type, set) ? set.v.remove(t) : false;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJDbGFzc0V2ZW50SGFuZGxlckJyaWRnZS5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiLi4vTkVUL0V2ZW50SGFuZGxlci5jcyIsIi4uL05FVC9FdmVudGFibGUuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFpSW9DQSxRQUFtQkE7OztnQkFFdkNBLGNBQVNBLFVBQVVBLEFBQUNBLEFBQTBCQTtvQkFBS0EsTUFBTUEsSUFBSUE7O2dCQUM3REEsZ0JBQVdBLGtDQUFZQSxBQUFDQSxBQUFzQkE7b0JBQUtBLE1BQU1BLElBQUlBOzs7OzsrQkFNckRBO2dCQUVwQkEsT0FBT0EscUNBQWNBLHlDQUFVQTs7OEJBQ2JBO2dCQUV0QkE7Z0JBQWFBLE9BQU9BLENBQUNBLE9BQU1BLHVCQUFRQSwrQkFBc0JBLHFDQUFNQSwwQkFBUUEsaURBQWNBLFVBQXNDQSxPQUFNQTs7Ozs7Ozs7Ozs7Ozs7b0JDOUd6SEEsT0FBT0EsMERBQWlDQTs7O29CQU14Q0EsSUFBSUE7d0JBRUFBOzs7b0JBR0pBLElBQUlBO3dCQUVBQSxnREFBeUJBOzt3QkFJekJBLG1EQUE0QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBbkNmQTs4REFBOEJBOzs4QkFJOUJBLFNBQXVCQTs7Z0JBRXBDQSxnQkFBV0E7O2dCQUVYQSxJQUFJQTtvQkFFQUEsZ0RBQXlCQTs7Ozs7aUNBK0JOQSxXQUFrQkE7O2dCQUVqREEsT0FBT0EsNENBQWlCQSxXQUFXQTs7K0JBQ1JBLEdBQUdBLFdBQWtCQTs7Z0JBRWhEQSxPQUFPQSw2Q0FBb0JBLFdBQVdBOztzQ0FDS0EsV0FBa0JBOztnQkFFN0RBLE9BQU9BLGlEQUFzQkEsV0FBV0E7O29DQUNGQSxHQUFHQSxXQUFrQkE7O2dCQUUzREEsT0FBT0Esa0RBQXlCQSxXQUFXQTs7bUNBQ3RCQSxHQUFHQTtnQkFHeEJBLE9BQU9BLGlEQUF3QkE7OzhCQUNmQSxXQUFrQkE7O2dCQUVsQ0EseUNBQWdCQSxXQUFXQTs7bUNBQ05BLFdBQWtCQTs7Z0JBRXZDQSxPQUFPQSw4Q0FBcUJBLFdBQVdBOzs7Z0JBVS9CQTs7aUNBRzJCQTtnQkFFM0JBLElBQUlBLENBQUNBO29CQUVEQSxtREFBNEJBOztvQkFFNUJBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NENEdEZrRUEsS0FBSUE7eUNBRVZBLEtBQUlBO3dDQUVRQSxLQUFJQTs7OztpQ0FFakRBLFdBQWtCQTs7Ozs7Ozs7Ozs7Ozs7OzRDQUVqREEsSUFBSUEsQ0FBQ0Esa0NBQTZCQTs7Ozs7Ozs7d0NBRTlCQTs7O3dDQUdKQSwwQkFBK0JBLDhCQUFpQkE7Ozs7Ozs7Ozs7Ozs7O3dDQUU1Q0Esc0JBQWFBLHVCQUF1QkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkFHdEJBLEdBQUdBLFdBQWtCQTs7Z0JBRS9DQSxPQUNnQkEsMkNBQVFBLFdBQVdBLG1CQUExQkE7K0JBQ0NBOzhCQUREQTsyQkFFRUEsWUFBR0E7OztzQ0FDNkJBLFdBQWtCQTs7Z0JBRTdEQSxPQUFPQSxnQ0FBOEJBLEFBQTRCQTsyQkFBTUEsZUFBUUEsV0FBV0E7OztvQ0FDcERBLEdBQUdBLFdBQWtCQTs7Z0JBRTNEQSxPQUFPQSxnQ0FBeUJBLEFBQXVCQTsyQkFBTUEsZ0JBQVdBLFdBQVdBOzs7MkJBRS9EQSxHQUFHQTs7Z0JBRWZBLFdBQVdBLEFBQU9BOztnQkFFbEJBLElBQUlBLENBQUNBLHNDQUFpQ0E7b0JBRWxDQSw4QkFBeUJBLE1BQU1BLEtBQUlBOzs7Z0JBR3ZDQSxJQUFJQSxrQ0FBcUJBLGVBQWVBO29CQUVwQ0E7OztnQkFHSkEsa0NBQXFCQSxVQUFVQTtnQkFDM0NBOztnQkFFWUEsSUFBSUEsQ0FBQ0EsbUNBQThCQSxNQUFVQTtvQkFFekNBLFlBQVVBLHNDQUFnQkE7b0JBQzFCQSwyQkFBc0JBLE1BQU1BOzs7Z0JBR2hDQSwwQkFBdUJBOzs7O3dCQUVuQkEsSUFBSUEsQ0FBQ0Esa0NBQTZCQTs0QkFFOUJBLDBCQUFxQkEsVUFBYUEsS0FBSUE7O3dCQUUxQ0EsOEJBQWlCQSxjQUFpQkEsSUFBSUEsZ0NBQWVBLFFBQVFBOzs7Ozs7OztnQkFHakVBOzt1REFHNkJBLEdBQUdBO2dCQUVoQ0EsV0FBV0EsQUFBT0E7Z0JBQ2xCQSxPQUFPQSxzQ0FBaUNBLFFBQVFBLGtDQUFxQkEsZUFBZUE7OzhCQUdyRUEsV0FBa0JBOzs7Z0JBRWpDQSxJQUFJQSxDQUFDQSxrQ0FBNkJBO29CQUU5QkE7OztnQkFHSkEsMEJBQStCQSw4QkFBaUJBOzs7O3dCQUU1Q0EsSUFBSUEsc0JBQXNCQTs0QkFFdEJBOzs7Ozs7Ozs7bUNBS1lBLFdBQWtCQTs7O2dCQUV0Q0EsSUFBSUEsQ0FBQ0Esa0NBQTZCQTtvQkFFOUJBLE9BQU9BLGdDQUFpQkEsQUFBZUE7K0JBQU1BOzs7O2dCQUdqREEsWUFBWUEsS0FBSUE7Z0JBQ2hCQSwwQkFBK0JBLDhCQUFpQkE7Ozs7d0JBRTVDQSxVQUFVQSxnQ0FBZUEsQUFBYUE7O3VDQUFNQSx3QkFBc0JBOzs7Ozs7Ozs7O2dCQUd0RUEsT0FBT0Esb0NBQW1CQTs7OEJBR1hBLEdBQUdBOztnQkFFbEJBLDBCQUFvQkEsNEJBQXVDQTs7Ozt3QkFFdkRBLGNBQWNBLDhCQUFpQkE7d0JBQy9CQSw4QkFBaUJBLEtBQU9BLEtBQUlBLDhFQUF3QkEsNEJBQTBEQSxlQUFRQSxBQUF5Q0E7dUNBQUtBLG9DQUFjQTs7Ozs7Ozs7O2dCQUd0TEEsV0FBV0EsQUFBT0E7Z0JBQzlCQTtnQkFDWUEsT0FBT0Esc0NBQWlDQSxNQUFVQSxPQUFPQSxhQUFXQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlJlZmxlY3Rpb247XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgQ0VIXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBFdmVudEhhbmRsZXIgOiBJRXZlbnRIYW5kbGVyXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBEaWN0aW9uYXJ5PFR5cGUsIEhhc2hTZXQ8b2JqZWN0Pj4gX2luc3RhbmNlc0RpY3Rpb25hcnkgPSBuZXcgRGljdGlvbmFyeTxUeXBlLCBIYXNoU2V0PG9iamVjdD4+KCk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgRGljdGlvbmFyeTxUeXBlLCBNZXRob2RJbmZvW10+IF9tZXRob2REaWN0aW9uYXJ5ID0gbmV3IERpY3Rpb25hcnk8VHlwZSwgTWV0aG9kSW5mb1tdPigpO1xyXG5cclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IERpY3Rpb25hcnk8c3RyaW5nLCBIYXNoU2V0PE1ldGhvZEluc3RhbmNlPj4gX21ldGhvZEluc3RhbmNlcyA9IG5ldyBEaWN0aW9uYXJ5PHN0cmluZywgSGFzaFNldDxNZXRob2RJbnN0YW5jZT4+KCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBJRW51bWVyYWJsZTxvYmplY3Q+IEFjcXVpcmUoc3RyaW5nIGV2ZW50TmFtZSwgcGFyYW1zIG9iamVjdFtdIHBhcmFtZXRlcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoIV9tZXRob2RJbnN0YW5jZXMuQ29udGFpbnNLZXkoZXZlbnROYW1lKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeWllbGQgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBtZXRob2RJbnN0YW5jZSBpbiBfbWV0aG9kSW5zdGFuY2VzW2V2ZW50TmFtZV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHlpZWxkIHJldHVybiBtZXRob2RJbnN0YW5jZS5BY3F1aXJlKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5wdWJsaWMgSUVudW1lcmFibGU8VD4gQWNxdWlyZTxUPihzdHJpbmcgZXZlbnROYW1lLCBwYXJhbXMgb2JqZWN0W10gcGFyYW1ldGVycylcclxue1xyXG4gICAgcmV0dXJuXHJcbiAgICAgICAgZnJvbSBvYmogaW4gQWNxdWlyZShldmVudE5hbWUsIHBhcmFtZXRlcnMpXHJcbiAgICAgICAgd2hlcmUgb2JqIGlzIFRcclxuICAgICAgICBzZWxlY3QgKFQpb2JqO1xyXG59cHVibGljIFRhc2s8SUVudW1lcmFibGU8b2JqZWN0Pj4gQWNxdWlyZUFzeW5jKHN0cmluZyBldmVudE5hbWUsIHBhcmFtcyBvYmplY3RbXSBwYXJhbWV0ZXJzKVxyXG57XHJcbiAgICByZXR1cm4gVGFzay5SdW48SUVudW1lcmFibGU8b2JqZWN0Pj4oKEZ1bmM8SUVudW1lcmFibGU8b2JqZWN0Pj4pKCgpID0+IEFjcXVpcmUoZXZlbnROYW1lLCBwYXJhbWV0ZXJzKSkpO1xyXG59cHVibGljIFRhc2s8SUVudW1lcmFibGU8VD4+IEFjcXVpcmVBc3luYzxUPihzdHJpbmcgZXZlbnROYW1lLCBwYXJhbXMgb2JqZWN0W10gcGFyYW1ldGVycylcclxue1xyXG4gICAgcmV0dXJuIFRhc2suUnVuPElFbnVtZXJhYmxlPFQ+PigoRnVuYzxJRW51bWVyYWJsZTxUPj4pKCgpID0+IEFjcXVpcmU8VD4oZXZlbnROYW1lLCBwYXJhbWV0ZXJzKSkpO1xyXG59XHJcbiAgICAgICAgcHVibGljIGJvb2wgQWRkPFQ+KFQgdCkgd2hlcmUgVCA6IGNsYXNzXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZihUKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghX2luc3RhbmNlc0RpY3Rpb25hcnkuQ29udGFpbnNLZXkodHlwZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9pbnN0YW5jZXNEaWN0aW9uYXJ5LkFkZCh0eXBlLCBuZXcgSGFzaFNldDxvYmplY3Q+KCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoX2luc3RhbmNlc0RpY3Rpb25hcnlbdHlwZV0uQ29udGFpbnModCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX2luc3RhbmNlc0RpY3Rpb25hcnlbdHlwZV0uQWRkKHQpO1xyXG5NZXRob2RJbmZvW10gbWV0aG9kcztcblxyXG4gICAgICAgICAgICBpZiAoIV9tZXRob2REaWN0aW9uYXJ5LlRyeUdldFZhbHVlKHR5cGUsIG91dCBtZXRob2RzKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kcyA9IHR5cGUuR2V0TWV0aG9kcyhCaW5kaW5nRmxhZ3MuUHVibGljIHwgQmluZGluZ0ZsYWdzLkluc3RhbmNlIHwgQmluZGluZ0ZsYWdzLkRlY2xhcmVkT25seSk7XHJcbiAgICAgICAgICAgICAgICBfbWV0aG9kRGljdGlvbmFyeS5BZGQodHlwZSwgbWV0aG9kcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBtZXRob2QgaW4gbWV0aG9kcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFfbWV0aG9kSW5zdGFuY2VzLkNvbnRhaW5zS2V5KG1ldGhvZC5OYW1lKSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBfbWV0aG9kSW5zdGFuY2VzLkFkZChtZXRob2QuTmFtZSwgbmV3IEhhc2hTZXQ8TWV0aG9kSW5zdGFuY2U+KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgX21ldGhvZEluc3RhbmNlc1ttZXRob2QuTmFtZV0uQWRkKG5ldyBNZXRob2RJbnN0YW5jZShtZXRob2QsIHQpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBib29sIElFdmVudENvbXBvbmVudC5IYXNJbnN0YW5jZTxUPihUIHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZihUKTtcclxuICAgICAgICAgICAgcmV0dXJuIF9pbnN0YW5jZXNEaWN0aW9uYXJ5LkNvbnRhaW5zS2V5KHR5cGUpID8gX2luc3RhbmNlc0RpY3Rpb25hcnlbdHlwZV0uQ29udGFpbnModCkgOiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEludm9rZShzdHJpbmcgZXZlbnROYW1lLCBwYXJhbXMgb2JqZWN0W10gcGFyYW1ldGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmICghX21ldGhvZEluc3RhbmNlcy5Db250YWluc0tleShldmVudE5hbWUpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBtZXRob2RJbnN0YW5jZSBpbiBfbWV0aG9kSW5zdGFuY2VzW2V2ZW50TmFtZV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChtZXRob2RJbnN0YW5jZS5JbnZva2UocGFyYW1ldGVycykpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBUYXNrIEludm9rZUFzeW5jKHN0cmluZyBldmVudE5hbWUsIHBhcmFtcyBvYmplY3RbXSBwYXJhbWV0ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFfbWV0aG9kSW5zdGFuY2VzLkNvbnRhaW5zS2V5KGV2ZW50TmFtZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBUYXNrLlJ1bjxib29sW10+KChGdW5jPGJvb2xbXT4pKCgpID0+IG5ldyBib29sW10geyB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB0YXNrcyA9IG5ldyBMaXN0PFRhc2s8Ym9vbD4+KCk7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBtZXRob2RJbnN0YW5jZSBpbiBfbWV0aG9kSW5zdGFuY2VzW2V2ZW50TmFtZV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhc2tzLkFkZChUYXNrLlJ1bjxib29sPigoRnVuYzxib29sPikoKCkgPT4gbWV0aG9kSW5zdGFuY2UuSW52b2tlKHBhcmFtZXRlcnMpKSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gVGFzay5XaGVuQWxsPGJvb2w+KHRhc2tzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIFJlbW92ZTxUPihUIHQpIHdoZXJlIFQgOiBjbGFzc1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIGtleSBpbiBTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLlRvQXJyYXk8c3RyaW5nPihfbWV0aG9kSW5zdGFuY2VzLktleXMpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2xkTGlzdCA9IF9tZXRob2RJbnN0YW5jZXNba2V5XTtcclxuICAgICAgICAgICAgICAgIF9tZXRob2RJbnN0YW5jZXNba2V5XSA9IG5ldyBIYXNoU2V0PE1ldGhvZEluc3RhbmNlPihTeXN0ZW0uTGlucS5FbnVtZXJhYmxlLldoZXJlPEV2ZW50SGFuZGxlci5NZXRob2RJbnN0YW5jZT4ob2xkTGlzdCwoRnVuYzxFdmVudEhhbmRsZXIuTWV0aG9kSW5zdGFuY2UsYm9vbD4pKHggPT4geC5JbnN0YW5jZSAhPSB0KSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZihUKTtcclxuSGFzaFNldDxvYmplY3Q+IHNldDtcbiAgICAgICAgICAgIHJldHVybiBfaW5zdGFuY2VzRGljdGlvbmFyeS5UcnlHZXRWYWx1ZSh0eXBlLCBvdXQgc2V0KSA/IHNldC5SZW1vdmUodCkgOiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2xhc3MgTWV0aG9kSW5zdGFuY2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludGVybmFsIE1ldGhvZEluc3RhbmNlKE1ldGhvZEluZm8gbWV0aG9kLCBvYmplY3QgaW5zdGFuY2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1ldGhvZCA9IG1ldGhvZCA/PyAoKFN5c3RlbS5GdW5jPE1ldGhvZEluZm8+KSgoKT0+e3Rocm93IG5ldyBBcmd1bWVudE51bGxFeGNlcHRpb24oXCJtZXRob2RcIik7fSkpKCk7XHJcbiAgICAgICAgICAgICAgICBJbnN0YW5jZSA9IGluc3RhbmNlID8/ICgoU3lzdGVtLkZ1bmM8b2JqZWN0PikoKCk9Pnt0aHJvdyBuZXcgQXJndW1lbnROdWxsRXhjZXB0aW9uKFwiaW5zdGFuY2VcIik7fSkpKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludGVybmFsIG9iamVjdCBJbnN0YW5jZSB7IGdldDsgcHJpdmF0ZSBzZXQ7IH1cclxuXHJcbiAgICAgICAgICAgIGludGVybmFsIE1ldGhvZEluZm8gTWV0aG9kIHsgZ2V0OyBwcml2YXRlIHNldDsgfVxyXG5pbnRlcm5hbCBvYmplY3QgQWNxdWlyZShvYmplY3RbXSBwYXJhbWV0ZXJzKVxyXG57XHJcbiAgICByZXR1cm4gTWV0aG9kLkludm9rZShJbnN0YW5jZSwgcGFyYW1ldGVycyk7XHJcbn1pbnRlcm5hbCBib29sIEludm9rZShvYmplY3RbXSBwYXJhbWV0ZXJzKVxyXG57XHJcbmJvb2wgdmFsOyAgICByZXR1cm4gKHZhbCA9IEFjcXVpcmUocGFyYW1ldGVycykgaXMgYm9vbCA/IChib29sKUFjcXVpcmUocGFyYW1ldGVycykgOiBCcmlkZ2UuU2NyaXB0LldyaXRlPGJvb2w+KFwibnVsbFwiKSkgIT0gbnVsbD8gdmFsIDogZmFsc2U7XHJcbn0gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgQ0VIXHJcbntcclxuICAgIHB1YmxpYyBpbnRlcmZhY2UgSUV2ZW50YWJsZTxUPiA6IElEaXNwb3NhYmxlIHdoZXJlIFQgOiBjbGFzc1xyXG4gICAge1xyXG4gICAgICAgIFQgSW5zdGFuY2UgeyBnZXQ7IHByaXZhdGUgc2V0OyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IGNsYXNzIEV2ZW50YWJsZTxURXZlbnRUeXBlPiA6IElFdmVudENvbXBvbmVudCwgSUV2ZW50YWJsZTxURXZlbnRUeXBlPiB3aGVyZSBURXZlbnRUeXBlIDogY2xhc3NcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IElFdmVudEhhbmRsZXIgX2hhbmRsZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBFdmVudGFibGUoSUV2ZW50SGFuZGxlciBoYW5kbGVyKSA6IHRoaXMoaGFuZGxlciwgdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRXZlbnRhYmxlKElFdmVudEhhbmRsZXIgaGFuZGxlciwgYm9vbCBlbmFibGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2hhbmRsZXIgPSBoYW5kbGVyO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVuYWJsZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9oYW5kbGVyLkFkZDxURXZlbnRUeXBlPihJbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIEVuYWJsZWRcclxue1xyXG4gICAgZ2V0XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVyLkhhc0luc3RhbmNlPFRFdmVudFR5cGU+KEluc3RhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIHNldFxyXG4gICAge1xyXG4gICAgICAgIGlmIChkaXNwb3NlZFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2hhbmRsZXIuQWRkPFRFdmVudFR5cGU+KEluc3RhbmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2hhbmRsZXIuUmVtb3ZlPFRFdmVudFR5cGU+KEluc3RhbmNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgVEV2ZW50VHlwZSBJbnN0YW5jZSB7IGdldDsgfVxyXG4jcmVnaW9uIElFdmVudENvbXBvbmVudFxyXG5wdWJsaWMgSUVudW1lcmFibGU8b2JqZWN0PiBBY3F1aXJlKHN0cmluZyBldmVudE5hbWUsIHBhcmFtcyBvYmplY3RbXSBwYXJhbWV0ZXJzKVxyXG57XHJcbiAgICByZXR1cm4gX2hhbmRsZXIuQWNxdWlyZShldmVudE5hbWUsIHBhcmFtZXRlcnMpO1xyXG59cHVibGljIElFbnVtZXJhYmxlPFQ+IEFjcXVpcmU8VD4oc3RyaW5nIGV2ZW50TmFtZSwgcGFyYW1zIG9iamVjdFtdIHBhcmFtZXRlcnMpXHJcbntcclxuICAgIHJldHVybiBfaGFuZGxlci5BY3F1aXJlPFQ+KGV2ZW50TmFtZSwgcGFyYW1ldGVycyk7XHJcbn1wdWJsaWMgVGFzazxJRW51bWVyYWJsZTxvYmplY3Q+PiBBY3F1aXJlQXN5bmMoc3RyaW5nIGV2ZW50TmFtZSwgcGFyYW1zIG9iamVjdFtdIHBhcmFtZXRlcnMpXHJcbntcclxuICAgIHJldHVybiBfaGFuZGxlci5BY3F1aXJlQXN5bmMoZXZlbnROYW1lLCBwYXJhbWV0ZXJzKTtcclxufXB1YmxpYyBUYXNrPElFbnVtZXJhYmxlPFQ+PiBBY3F1aXJlQXN5bmM8VD4oc3RyaW5nIGV2ZW50TmFtZSwgcGFyYW1zIG9iamVjdFtdIHBhcmFtZXRlcnMpXHJcbntcclxuICAgIHJldHVybiBfaGFuZGxlci5BY3F1aXJlQXN5bmM8VD4oZXZlbnROYW1lLCBwYXJhbWV0ZXJzKTtcclxufXB1YmxpYyBib29sIEhhc0luc3RhbmNlPFQ+KFQgdClcclxuICAgIHdoZXJlIFQgOiBjbGFzc1xyXG57XHJcbiAgICByZXR1cm4gX2hhbmRsZXIuSGFzSW5zdGFuY2U8VD4odCk7XHJcbn1wdWJsaWMgdm9pZCBJbnZva2Uoc3RyaW5nIGV2ZW50TmFtZSwgcGFyYW1zIG9iamVjdFtdIHBhcmFtZXRlcnMpXHJcbntcclxuICAgIF9oYW5kbGVyLkludm9rZShldmVudE5hbWUsIHBhcmFtZXRlcnMpO1xyXG59cHVibGljIFRhc2sgSW52b2tlQXN5bmMoc3RyaW5nIGV2ZW50TmFtZSwgcGFyYW1zIG9iamVjdFtdIHBhcmFtZXRlcnMpXHJcbntcclxuICAgIHJldHVybiBfaGFuZGxlci5JbnZva2VBc3luYyhldmVudE5hbWUsIHBhcmFtZXRlcnMpO1xyXG59XHJcbiAgICAgICAgI2VuZHJlZ2lvbiBJRXZlbnRDb21wb25lbnRcclxuXHJcbiAgICAgICAgI3JlZ2lvbiBJRGlzcG9zYWJsZSBTdXBwb3J0XHJcblxyXG4gICAgICAgIHByaXZhdGUgYm9vbCBkaXNwb3NlZFZhbHVlID0gZmFsc2U7IC8vIFRvIGRldGVjdCByZWR1bmRhbnQgY2FsbHNcclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgRGlzcG9zZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBEaXNwb3NlKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIHZpcnR1YWwgdm9pZCBEaXNwb3NlKGJvb2wgZGlzcG9zaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKCFkaXNwb3NlZFZhbHVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfaGFuZGxlci5SZW1vdmU8VEV2ZW50VHlwZT4oSW5zdGFuY2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGRpc3Bvc2VkVmFsdWUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAjZW5kcmVnaW9uIElEaXNwb3NhYmxlIFN1cHBvcnRcclxuICAgIH1cclxufSJdCn0K
