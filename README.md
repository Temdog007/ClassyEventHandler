# Classy Event Handler
A event handler written in C#

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

#### Inheritence
```c#
[TestClass]
public class Example2
{
    private abstract class Pet : Eventable<Pet>
    {
        public Pet(IEventHandler handler) : base(handler)
        {
        }

        public override Pet Instance => this;

        public abstract bool IsHungry { get; }

        public abstract bool Feed(string food);

        public abstract object MakeSound();
    }

    private class Cat : Pet
    {
        private bool _isHungry = true;

        public Cat(IEventHandler handler) : base(handler)
        {
        }

        public override bool IsHungry => _isHungry;

        public override bool Feed(string food)
        {
            if (food == "Cat Food" && IsHungry)
            {
                _isHungry = false;
                return true;
            }

            return false;
        }

        public override object MakeSound() => IsHungry ? "Meow" : null;
    }

    private class Dog : Pet
    {
        public Dog(IEventHandler handler) : base(handler)
        {
        }

        public override bool IsHungry => true; // Dogs are always hungry

        public int TimesFed { get; private set; }

        public override bool Feed(string food)
        {
            if (food == "Dog Food")
            {
                ++TimesFed;
                return true;
            }

            return false;
        }

        public override object MakeSound() => "Bark";
    }

    [TestMethod]
    public void Scenario()
    {
        var ee = new EventHandler();
        var cat1 = new Cat(ee);
        var cat2 = new Cat(ee);
        var dog = new Dog(ee);

        // Who's hungry?
        var animalSounds = ee.Acquire<string>("MakeSound"); // acquire only strings from event return values
        CollectionAssert.AreEqual(new[] { "Meow", "Meow", "Bark" }, animalSounds.ToArray());
        Assert.IsTrue(cat1.IsHungry);
        Assert.IsTrue(cat2.IsHungry);
        Assert.IsTrue(dog.IsHungry);
        Assert.AreEqual(0, dog.TimesFed);

        // Give dog food
        ee.Invoke("Feed", "Dog Food");

        animalSounds = ee.Acquire<string>("MakeSound");
        CollectionAssert.AreEqual(new[] { "Meow", "Meow", "Bark" }, animalSounds.ToArray());
        Assert.IsTrue(cat1.IsHungry);
        Assert.IsTrue(cat2.IsHungry);
        Assert.IsTrue(dog.IsHungry);
        Assert.AreEqual(1, dog.TimesFed);

        // Give cat food
        ee.Invoke("Feed", "Cat Food");

        CollectionAssert.AreEqual(new[] { "Meow", "Bark" }, animalSounds.ToArray());
        Assert.IsFalse(cat1.IsHungry);
        Assert.IsTrue(cat2.IsHungry);
        Assert.IsTrue(dog.IsHungry);
    }
}
```
