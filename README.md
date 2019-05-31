# Classy Event Handler
A event handler written in C# and TypeScript

## Purpose
This event handler allows for the creation of objects where every public method is automatically an event handler. An `EventHandler` will Invoke events and the appropriate public method will called for each instance of an object that extends an `IEventable<T>` that is present.

### Interfaces
- `IEventHandler`
- `IEventable<T>`

### Objects
- `EventHandler`
  - Calls the public methods of all enabled `IEventable<T>` objects that match the appropriate event name
- `Eventable`
  - Automatically adds itself to this EventHandler
  - Can be enabled or disabled
  - Can call `Dispose` to permentaly disable

### Examples

#### Simple
```c#
 [TestClass]
public class Example1
{
    private class Cat : Eventable<Cat>
    {
        public Cat(IEventHandler handler) : base(handler)
        {
        }

        public override Cat Instance => this;
        
        public bool IsSleeping { get; private set; } = true;

        public void LoudSound() => IsSleeping = false;
    }

    [TestMethod]
    public void Scenario()
    {
        var ee = new EventHandler();
        var cat = new Cat(ee);

        Assert.IsTrue(cat.IsSleeping);
        ee.Invoke("LoudSound");
        Assert.IsFalse(cat.IsSleeping);
    }

    [TestMethod]
    public async Task AsyncScenario()
    {
        var ee = new EventHandler();
        var cat = new Cat(ee);

        Assert.IsTrue(cat.IsSleeping);
        await ee.InvokeAsync("LoudSound");
        Assert.IsFalse(cat.IsSleeping);
    }

    [TestMethod]
    public void DependencyInjectionScenario()
    {
        var services = new ServiceCollection();
        services.AddSingleton<IEventHandler, EventHandler>();
        var provider = services.BuildServiceProvider();

        var cat = ActivatorUtilities.CreateInstance<Cat>(provider);

        Assert.IsTrue(cat.IsSleeping);
        provider.GetService<IEventHandler>().Invoke("LoudSound");
        Assert.IsFalse(cat.IsSleeping);
    }
}
```
