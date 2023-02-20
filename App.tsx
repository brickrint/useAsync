import * as React from 'react';
import { useAsync } from './useAsync';
import './style.css';

export default function App() {
  const { run, isLoading } = useAsync();

  const runAsync = React.useCallback(async () => {
    try {
      const res = await run(
        fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) =>
          response.json()
        )
      );
      console.log({ res });
    } catch (err) {
      console.log('err', err.message);
    }
  }, []);

  React.useEffect(() => {
    runAsync();
  }, [runAsync]);

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
