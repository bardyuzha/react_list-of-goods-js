import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [data, setData] = useState(goodsFromServer);
  const [reversedStatus, setReversedStatus] = useState(false);
  const [sortingParam, setSortingParam] = useState('');

  const customSort = (sortParam = 'alphabet') => {
    return () => {
      let sortedData = [...data];

      switch (sortParam) {
        case 'alphabet':
          sortedData.sort((a, b) => a.localeCompare(b));

          if (reversedStatus) {
            sortedData.reverse();
          }

          setSortingParam(sortParam);
          setData(sortedData);

          break;

        case 'length':
          sortedData.sort((a, b) => a.length - b.length);

          if (reversedStatus) {
            sortedData.reverse();
          }

          setSortingParam(sortParam);
          setData(sortedData);

          break;

        default:
          sortedData = goodsFromServer;
          setReversedStatus(false);
          setSortingParam(sortParam);
          setData(sortedData);

          break;
      }
    };
  };

  const toggleReversedStatus = () => {
    setReversedStatus(!reversedStatus);
    setData([...data].reverse());
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortingParam === 'alphabet' ? '' : 'is-light'}`}
          onClick={customSort('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortingParam === 'length' ? '' : 'is-light'}`}
          onClick={customSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversedStatus ? '' : 'is-light'}`}
          onClick={toggleReversedStatus}
        >
          Reverse
        </button>

        {(reversedStatus || sortingParam !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={customSort('')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {data.map(el => (
          <li key={el} data-cy="Good">
            {el}
          </li>
        ))}
      </ul>
    </div>
  );
};
