using ClassyEventHandler;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Threading.Tasks;

namespace ClassyEventHandlerTest
{
    [TestClass]
    public class EventHandlerTest
    {
        [TestMethod]
        public void A_TestEvent()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee);

            // Act
            ee.Invoke("Update");

            // Assert
            Assert.IsTrue(a.Enabled);
            Assert.AreEqual(1, a.UpdateCalled);
        }

        [TestMethod]
        public async Task A_TestEventAsync()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee);

            // Act
            var results = await ee.InvokeAsync("Update");

            // Assert
            CollectionAssert.AreEqual(new bool[] { false }, results);
            Assert.AreEqual(1, a.UpdateCalled);
        }

        [TestMethod]
        public void A_TestEventDisabled()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee);

            // Act
            a.Enabled = false;
            ee.Invoke("Update");

            // Assert
            Assert.IsFalse(a.Enabled);
            Assert.AreEqual(0, a.UpdateCalled);
        }

        [TestMethod]
        public void A_TestEventInScope()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee);

            // Act
            using (a)
            {
                ee.Invoke("Update");
            }
            ee.Invoke("Update");

            // Assert
            Assert.IsFalse(a.Enabled);
            Assert.AreEqual(1, a.UpdateCalled);
        }

        [TestMethod]
        public void A_TestEventNotPublic()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee);

            // Act
            ee.Invoke("NotPublicUpdate");

            // Assert
            Assert.IsTrue(a.Enabled);
            Assert.AreEqual(0, a.UpdateCalled);
        }

        [TestMethod]
        public void AB_TestEventEndEarly()
        {
            // Arrange
            var ee = new EventHandler();
            var b = new B(ee);
            var a = new A(ee);

            // Act
            ee.Invoke("Update");

            // Assert
            Assert.AreEqual(0, a.UpdateCalled);
            Assert.AreEqual(10, b.UpdateCalled);
        }

        [TestMethod]
        public void B_TestEvent()
        {
            // Arrange
            var ee = new EventHandler();
            var b = new B(ee);

            // Act
            ee.Invoke("Update");

            // Assert
            Assert.IsTrue(b.Enabled);
            Assert.AreEqual(10, b.UpdateCalled);
        }

        private class A : Eventable<A>
        {
            public A(IEventHandler handler) : base(handler)
            {
            }

            public override A Instance => this;

            public int UpdateCalled { get; protected set; }

            public virtual bool Update()
            {
                ++UpdateCalled;
                return false;
            }

            private int NotPublicUpdate()
            {
                return ++UpdateCalled;
            }
        }

        private class B : A
        {
            public B(IEventHandler handler) : base(handler)
            {
            }

            public override bool Update()
            {
                UpdateCalled += 10;
                return true;
            }
        }
    }
}