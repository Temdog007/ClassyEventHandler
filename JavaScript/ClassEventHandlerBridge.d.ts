/// <reference path="./bridge.d.ts" />

declare namespace CEH {
    interface IEventable$1<T> extends System.IDisposable {
    }

    interface IEventComponent {
        CEH$IEventComponent$Acquire$1(eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<any> | null;
        Acquire$1(eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<any> | null;
        CEH$IEventComponent$Acquire<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<T> | null;
        Acquire<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<T> | null;
        CEH$IEventComponent$AcquireAsync$1(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<any>> | null;
        AcquireAsync$1(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<any>> | null;
        CEH$IEventComponent$AcquireAsync<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<T>> | null;
        AcquireAsync<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<T>> | null;
        CEH$IEventComponent$HasInstance<T>(T: {prototype: T}, t: T | null): boolean;
        HasInstance<T>(T: {prototype: T}, t: T | null): boolean;
        CEH$IEventComponent$Invoke(eventName: string | null, parameters: any[] | null): void;
        Invoke(eventName: string | null, parameters: any[] | null): void;
        CEH$IEventComponent$InvokeAsync(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task | null;
        InvokeAsync(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task | null;
    }

    interface Eventable$1<TEventType> extends CEH.IEventComponent,CEH.IEventable$1<TEventType> {
        Enabled: boolean;
        Acquire$1(eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<any> | null;
        Acquire<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<T> | null;
        AcquireAsync$1(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<any>> | null;
        AcquireAsync<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<T>> | null;
        HasInstance<T>(T: {prototype: T}, t: T | null): boolean;
        Invoke(eventName: string | null, parameters: any[] | null): void;
        InvokeAsync(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task | null;
        Dispose(): void;
    }
    interface Eventable$1Func extends Function {
        <TEventType>($TEventType: Bridge.TypeRef<TEventType>): {
            prototype: Eventable$1<TEventType>;
            ctor: {
                new (handler: CEH.IEventHandler | null): Eventable$1<TEventType>
            };
            $ctor1: {
                new (handler: CEH.IEventHandler | null, enabled: boolean): Eventable$1<TEventType>
            };
        }
    }
    var Eventable$1: Eventable$1Func;

    interface IEventHandler extends CEH.IEventComponent {
        CEH$IEventHandler$Add<T>(T: {prototype: T}, t: T | null): boolean;
        Add<T>(T: {prototype: T}, t: T | null): boolean;
        CEH$IEventHandler$Remove<T>(T: {prototype: T}, t: T | null): boolean;
        Remove<T>(T: {prototype: T}, t: T | null): boolean;
    }

    interface EventHandler extends CEH.IEventHandler {
        Acquire$1(eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<any> | null;
        Acquire<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Collections.Generic.IEnumerable$1<T> | null;
        AcquireAsync$1(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<any>> | null;
        AcquireAsync<T>(T: {prototype: T}, eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task$1<System.Collections.Generic.IEnumerable$1<T>> | null;
        Add<T>(T: {prototype: T}, t: T | null): boolean;
        Invoke(eventName: string | null, parameters: any[] | null): void;
        InvokeAsync(eventName: string | null, parameters: any[] | null): System.Threading.Tasks.Task | null;
        Remove<T>(T: {prototype: T}, t: T | null): boolean;
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
