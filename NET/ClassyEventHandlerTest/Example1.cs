using ClassyEventHandler;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;

namespace ClassyEventHandlerTest
{
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
}