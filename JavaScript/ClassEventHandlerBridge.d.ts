/// <reference path="./bridge.d.ts" />

declare namespace CEH {
    interface IEventable$1<T> extends System.IDisposable {
    }

    interface IEventHandler {
        CEH$IEventHandler$Acquire$1(eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<any> | null;
        Acquire$1(eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<any> | null;
        CEH$IEventHandler$Acquire<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<T> | null;
        Acquire<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<T> | null;
        CEH$IEventHandler$AcquireAsync$1(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<any>> | null;
        AcquireAsync$1(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<any>> | null;
        CEH$IEventHandler$AcquireAsync<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<T>> | null;
        AcquireAsync<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<T>> | null;
        CEH$IEventHandler$AddEventable<T>(T: {prototype: T}, eventable: CEH.IEventable$1<T> | null): boolean;
        AddEventable<T>(T: {prototype: T}, eventable: CEH.IEventable$1<T> | null): boolean;
        CEH$IEventHandler$HasInstance<T>(T: {prototype: T}, eventable: CEH.IEventable$1<T> | null): boolean;
        HasInstance<T>(T: {prototype: T}, eventable: CEH.IEventable$1<T> | null): boolean;
        CEH$IEventHandler$Invoke(eventName: string | null, parameters: any[] | null): void;
        Invoke(eventName: string | null, parameters: any[] | null): void;
        CEH$IEventHandler$InvokeAsync(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task | null;
        InvokeAsync(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task | null;
        CEH$IEventHandler$RemoveEventable<T>(T: {prototype: T}, eventable: CEH.IEventable$1<T> | null): boolean;
        RemoveEventable<T>(T: {prototype: T}, eventable: CEH.IEventable$1<T> | null): boolean;
    }

    interface Eventable$1<T> extends CEH.IEventable$1<T> {
        Enabled: boolean;
        Invoke(eventName: string | null): void;
        Dispose(): void;
    }
    interface Eventable$1Func extends Function {
        <T>($T: Bridge.TypeRef<T>): {
            prototype: Eventable$1<T>;
            ctor: {
                new (handler: CEH.IEventHandler | null): Eventable$1<T>
            };
            $ctor1: {
                new (handler: CEH.IEventHandler | null, enabled: boolean): Eventable$1<T>
            };
        }
    }
    var Eventable$1: Eventable$1Func;

    interface EventHandler extends CEH.IEventHandler {
        Acquire$1(eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<any> | null;
        Acquire<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<T> | null;
        AcquireAsync$1(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<any>> | null;
        AcquireAsync<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<T>> | null;
        AddEventable<T>(T: {prototype: T}, eventable: CEH.IEventable$1<T> | null): boolean;
        Invoke(eventName: string | null, parameters: any[] | null): void;
        InvokeAsync(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task | null;
        RemoveEventable<T>(T: {prototype: T}, eventable: CEH.IEventable$1<T> | null): boolean;
    }
    interface EventHandlerFunc extends Function {
        prototype: EventHandler;
        MethodInstance: CEH.EventHandler.MethodInstanceFunc;
        new (): EventHandler;
    }
    var EventHandler: EventHandlerFunc;
    module EventHandler {
        interface MethodInstance {
        }
        interface MethodInstanceFunc extends Function {
            prototype: MethodInstance;
        }
    }
}
