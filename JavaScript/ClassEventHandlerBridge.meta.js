Bridge.assembly("ClassEventHandlerBridge", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = ["CEH","System","System.Collections.Generic","System.Threading.Tasks","System.Reflection"];
    $m("CEH.IEventable$1", function (T) { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"Instance","t":16,"rt":T,"g":{"ab":true,"a":2,"n":"get_Instance","t":8,"rt":T,"fg":"\"CEH$IEventable$1$\" + Bridge.getTypeAlias(T) + \"$Instance\""},"fn":"\"CEH$IEventable$1$\" + Bridge.getTypeAlias(T) + \"$Instance\""},{"a":1,"backing":true,"n":"<Instance>k__BackingField","t":4,"rt":T,"sn":"\"CEH$IEventable$1$\" + Bridge.getTypeAlias(T) + \"$Instance\""}]}; }, $n);
    $m("CEH.Eventable$1", function (TEventType) { return {"att":1048705,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[0].IEventHandler],"pi":[{"n":"handler","pt":$n[0].IEventHandler,"ps":0}],"sn":"ctor"},{"a":2,"n":".ctor","t":1,"p":[$n[0].IEventHandler,$n[1].Boolean],"pi":[{"n":"handler","pt":$n[0].IEventHandler,"ps":0},{"n":"enabled","pt":$n[1].Boolean,"ps":1}],"sn":"$ctor1"},{"a":2,"n":"Acquire","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"Acquire$1","rt":$n[2].IEnumerable$1(System.Object),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"Acquire","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"tpc":1,"tprm":["T"],"sn":"Acquire","rt":$n[2].IEnumerable$1(System.Object),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"AcquireAsync","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"AcquireAsync$1","rt":$n[3].Task$1(System.Collections.Generic.IEnumerable$1(System.Object)),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"AcquireAsync","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"tpc":1,"tprm":["T"],"sn":"AcquireAsync","rt":$n[3].Task$1(System.Collections.Generic.IEnumerable$1(System.Object)),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"Dispose","t":8,"sn":"Dispose","rt":$n[1].Void},{"v":true,"a":3,"n":"Dispose","t":8,"pi":[{"n":"disposing","pt":$n[1].Boolean,"ps":0}],"sn":"Dispose$1","rt":$n[1].Void,"p":[$n[1].Boolean]},{"a":2,"n":"HasInstance","t":8,"pi":[{"n":"t","pt":System.Object,"ps":0}],"tpc":1,"tprm":["T"],"sn":"HasInstance","rt":$n[1].Boolean,"p":[System.Object],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"Invoke","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"Invoke","rt":$n[1].Void,"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"InvokeAsync","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"InvokeAsync","rt":$n[3].Task,"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"Enabled","t":16,"rt":$n[1].Boolean,"g":{"a":2,"n":"get_Enabled","t":8,"rt":$n[1].Boolean,"fg":"Enabled","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},"s":{"a":2,"n":"set_Enabled","t":8,"p":[$n[1].Boolean],"rt":$n[1].Void,"fs":"Enabled"},"fn":"Enabled"},{"ab":true,"a":2,"n":"Instance","t":16,"rt":TEventType,"g":{"ab":true,"a":2,"n":"get_Instance","t":8,"rt":TEventType,"fg":"Instance"},"fn":"Instance"},{"a":1,"n":"_handler","t":4,"rt":$n[0].IEventHandler,"sn":"_handler","ro":true},{"a":1,"n":"disposedValue","t":4,"rt":$n[1].Boolean,"sn":"disposedValue","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"backing":true,"n":"<Instance>k__BackingField","t":4,"rt":TEventType,"sn":"Instance"}]}; }, $n);
    $m("CEH.EventHandler", function () { return {"nested":[$n[0].EventHandler.MethodInstance],"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Acquire","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"Acquire$1","rt":$n[2].IEnumerable$1(System.Object),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"Acquire","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"tpc":1,"tprm":["T"],"sn":"Acquire","rt":$n[2].IEnumerable$1(System.Object),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"AcquireAsync","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"AcquireAsync$1","rt":$n[3].Task$1(System.Collections.Generic.IEnumerable$1(System.Object)),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"AcquireAsync","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"tpc":1,"tprm":["T"],"sn":"AcquireAsync","rt":$n[3].Task$1(System.Collections.Generic.IEnumerable$1(System.Object)),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"Add","t":8,"pi":[{"n":"t","pt":System.Object,"ps":0}],"tpc":1,"tprm":["T"],"sn":"Add","rt":$n[1].Boolean,"p":[System.Object],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":2,"n":"Invoke","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"Invoke","rt":$n[1].Void,"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"InvokeAsync","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"InvokeAsync","rt":$n[3].Task,"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"a":2,"n":"Remove","t":8,"pi":[{"n":"t","pt":System.Object,"ps":0}],"tpc":1,"tprm":["T"],"sn":"Remove","rt":$n[1].Boolean,"p":[System.Object],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"_instancesDictionary","t":4,"rt":$n[2].Dictionary$2(System.Type,System.Collections.Generic.HashSet$1(System.Object)),"sn":"_instancesDictionary","ro":true},{"a":1,"n":"_methodDictionary","t":4,"rt":$n[2].Dictionary$2(System.Type,System.Array.type(System.Reflection.MethodInfo)),"sn":"_methodDictionary","ro":true},{"a":1,"n":"_methodInstances","t":4,"rt":$n[2].Dictionary$2(System.String,System.Collections.Generic.HashSet$1(CEH.EventHandler.MethodInstance)),"sn":"_methodInstances","ro":true}]}; }, $n);
    $m("CEH.EventHandler.MethodInstance", function () { return {"td":$n[0].EventHandler,"att":1048579,"a":1,"m":[{"a":4,"n":".ctor","t":1,"p":[$n[4].MethodInfo,$n[1].Object],"pi":[{"n":"method","pt":$n[4].MethodInfo,"ps":0},{"n":"instance","pt":$n[1].Object,"ps":1}],"sn":"ctor"},{"a":4,"n":"Acquire","t":8,"pi":[{"n":"parameters","pt":$n[1].Array.type(System.Object),"ps":0}],"sn":"Acquire","rt":$n[1].Object,"p":[$n[1].Array.type(System.Object)]},{"a":4,"n":"Invoke","t":8,"pi":[{"n":"parameters","pt":$n[1].Array.type(System.Object),"ps":0}],"sn":"Invoke","rt":$n[1].Boolean,"p":[$n[1].Array.type(System.Object)],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":4,"n":"Instance","t":16,"rt":$n[1].Object,"g":{"a":4,"n":"get_Instance","t":8,"rt":$n[1].Object,"fg":"Instance"},"fn":"Instance"},{"a":4,"n":"Method","t":16,"rt":$n[4].MethodInfo,"g":{"a":4,"n":"get_Method","t":8,"rt":$n[4].MethodInfo,"fg":"Method"},"fn":"Method"},{"a":1,"backing":true,"n":"<Instance>k__BackingField","t":4,"rt":$n[1].Object,"sn":"Instance"},{"a":1,"backing":true,"n":"<Method>k__BackingField","t":4,"rt":$n[4].MethodInfo,"sn":"Method"}]}; }, $n);
    $m("CEH.IEventComponent", function () { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"Acquire","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"CEH$IEventComponent$Acquire$1","rt":$n[2].IEnumerable$1(System.Object),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"ab":true,"a":2,"n":"Acquire","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"tpc":1,"tprm":["T"],"sn":"CEH$IEventComponent$Acquire","rt":$n[2].IEnumerable$1(System.Object),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"ab":true,"a":2,"n":"AcquireAsync","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"CEH$IEventComponent$AcquireAsync$1","rt":$n[3].Task$1(System.Collections.Generic.IEnumerable$1(System.Object)),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"ab":true,"a":2,"n":"AcquireAsync","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"tpc":1,"tprm":["T"],"sn":"CEH$IEventComponent$AcquireAsync","rt":$n[3].Task$1(System.Collections.Generic.IEnumerable$1(System.Object)),"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"ab":true,"a":2,"n":"HasInstance","t":8,"pi":[{"n":"t","pt":System.Object,"ps":0}],"tpc":1,"tprm":["T"],"sn":"CEH$IEventComponent$HasInstance","rt":$n[1].Boolean,"p":[System.Object],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"ab":true,"a":2,"n":"Invoke","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"CEH$IEventComponent$Invoke","rt":$n[1].Void,"p":[$n[1].String,$n[1].Array.type(System.Object)]},{"ab":true,"a":2,"n":"InvokeAsync","t":8,"pi":[{"n":"eventName","pt":$n[1].String,"ps":0},{"n":"parameters","ip":true,"pt":$n[1].Array.type(System.Object),"ps":1}],"sn":"CEH$IEventComponent$InvokeAsync","rt":$n[3].Task,"p":[$n[1].String,$n[1].Array.type(System.Object)]}]}; }, $n);
    $m("CEH.IEventHandler", function () { return {"att":161,"a":2,"m":[{"ab":true,"a":2,"n":"Add","t":8,"pi":[{"n":"t","pt":System.Object,"ps":0}],"tpc":1,"tprm":["T"],"sn":"CEH$IEventHandler$Add","rt":$n[1].Boolean,"p":[System.Object],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"ab":true,"a":2,"n":"Remove","t":8,"pi":[{"n":"t","pt":System.Object,"ps":0}],"tpc":1,"tprm":["T"],"sn":"CEH$IEventHandler$Remove","rt":$n[1].Boolean,"p":[System.Object],"box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}}]}; }, $n);
});
