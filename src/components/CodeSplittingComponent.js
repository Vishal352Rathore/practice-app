import { useState, Suspense, lazy } from 'react';

const LazyLoadComponent = lazy(() => {
  const x = new Promise((resolve) => {
    setTimeout(() => {
      return resolve(import("./LazyLoadComponent"));
    }, 1500)
  })
  return x;
})

function CodeSplittingComponent() {

  const [Component, setComponent] = useState(null);

  const handleClick = async () => {
    const module = await import('./DynamicComponent');
    setComponent(() => module.default)
  };

  return (
    <div>
      <h1>My React App</h1>
      <button onClick={handleClick}>Load Dynamic Component</button>
      {Component ? <Component /> : <></>}

      <Suspense fallback={<div> Lazy load is loading...</div>}>
        <LazyLoadComponent />
      </Suspense>
    </div>
  );


}

export default CodeSplittingComponent;
