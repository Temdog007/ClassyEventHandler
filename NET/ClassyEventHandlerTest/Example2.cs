using ClassyEventHandler;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace ClassyEventHandlerTest
{
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
}