using CEH;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;
using System.Threading.Tasks;
using EventHandler = CEH.EventHandler;

namespace ClassyEventHandlerTest
{
    [TestClass]
    public class EventHandlerTest
    {
        [TestMethod]
        public void A_Acquire()
        {
            // Arrange
            var ee = new EventHandler();
            new A(ee);

            // Act
            var result = ee.Acquire("Update");

            // Assert
            CollectionAssert.AreEqual(result.ToArray(), new object[] { null });
        }

        [TestMethod]
        public async Task A_Acquire_Async()
        {
            // Arrange
            var ee = new EventHandler();
            new A(ee);

            // Act
            var result = await ee.AcquireAsync("Update");

            // Assert
            CollectionAssert.AreEqual(result.ToArray(), new object[] { null });
        }

        [TestMethod]
        public void A_Acquire_T()
        {
            // Arrange
            var ee = new EventHandler();
            new A(ee);

            // Act
            ee.Invoke("Update");
            var result1 = ee.Acquire<bool>("GetUpdate");
            var result2 = ee.Acquire<int>("GetUpdate");

            // Assert
            CollectionAssert.AreEqual(result1.ToArray(), new bool[] { });
            CollectionAssert.AreEqual(result2.ToArray(), new int[] { 1 });
        }

        [TestMethod]
        public async Task A_Acquire_T_Async()
        {
            // Arrange
            var ee = new EventHandler();
            new A(ee);

            // Act
            await ee.InvokeAsync("Update");
            var result1 = await ee.AcquireAsync<bool>("GetUpdate");
            var result2 = await ee.AcquireAsync<int>("GetUpdate");

            // Assert
            CollectionAssert.AreEqual(result1.ToArray(), new bool[] { });
            CollectionAssert.AreEqual(result2.ToArray(), new int[] { 1 });
        }

        [TestMethod]
        public void A_Invoke()
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
        public async Task A_Invoke_Async()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee);

            // Act
            await ee.InvokeAsync("Update");

            // Assert
            Assert.IsTrue(a.Enabled);
            Assert.AreEqual(1, a.UpdateCalled);
        }

        [TestMethod]
        public async Task A_Invoke_Async_Parameters()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee);

            // Act
            await ee.InvokeAsync("SetName", "Test");

            // Assert
            Assert.AreEqual("Test", a.Name);
        }

        [TestMethod]
        public void A_Invoke_Disabled()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee, false);

            // Act
            ee.Invoke("Update");

            // Assert
            Assert.IsFalse(a.Enabled);
            Assert.AreEqual(0, a.UpdateCalled);
        }

        [TestMethod]
        public void A_Invoke_Dispose()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee);

            // Act
            ee.Invoke("Update");
            a.Dispose();
            a.Enabled = true;
            ee.Invoke("Update");

            // Assert
            Assert.IsFalse(a.Enabled);
            Assert.AreEqual(1, a.UpdateCalled);
        }

        [TestMethod]
        public void A_Invoke_InScope()
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
        public void A_Invoke_NotPublic()
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
        public void A_Invoke_Parameters()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee);

            // Act
            ee.Invoke("SetName", "Test");

            // Assert
            Assert.AreEqual("Test", a.Name);
        }

        [TestMethod]
        public void A_Invoke_Property()
        {
            // Arrange
            var ee = new EventHandler();
            var a = new A(ee);

            // Act
            ee.Invoke("Update");
            var result = ee.Acquire("UpdateCalled");

            // Assert
            Assert.AreEqual(1, a.UpdateCalled);
            CollectionAssert.AreNotEqual(new[] { true }, result.ToArray());
        }

        [TestMethod]
        public void A_Invoke_Static()
        {
            // Arrange
            var ee = new EventHandler();
            new A(ee);

            // Act
            var result = ee.Acquire<bool>("StaticUpdate");

            // Assert
            CollectionAssert.AreNotEqual(new[] { true }, result.ToArray());
        }

        [TestMethod]
        public void AB_Invoke_EndEarly()
        {
            // Arrange
            var ee = new EventHandler();
            var b = new B(ee);
            var a = new A(ee);

            // Act
            ee.Invoke("PartialUpdate");

            // Assert
            Assert.AreEqual(0, a.UpdateCalled);
            Assert.AreEqual(10, b.UpdateCalled);
        }

        [TestMethod]
        public void B_Invoke()
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

            public A(IEventHandler handler, bool enabled) : base(handler, enabled)
            {
            }

            public override A Instance => this;

            public string Name { get; protected set; } = string.Empty;
            public int UpdateCalled { get; protected set; }

            public static bool StaticUpdate() => true;

            public int GetUpdate() => UpdateCalled;

            public virtual bool PartialUpdate()
            {
                Update();
                return false;
            }

            public virtual void SetName(string newName) => Name = newName;

            public virtual void Update() => ++UpdateCalled;

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

            public B(IEventHandler handler, bool enabled) : base(handler, enabled)
            {
            }

            public override bool PartialUpdate()
            {
                Update();
                return true;
            }

            public override void Update() => UpdateCalled += 10;
        }
    }
}