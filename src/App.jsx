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

  const customSort = (sortParam = 'alphabet') => {
    return () => {
      let sortedData = [...data];

      switch (sortParam) {
        case 'alphabet':
          sortedData.sort((a, b) => a.localeCompare(b));

          break;

        case 'length':
          sortedData.sort((a, b) => a.length - b.length);

          break;

        case 'reverse':
          sortedData.reverse();

          if (reversedStatus === false) {
            setReversedStatus(true);
          } else {
            setReversedStatus(false);
          }

          break;

        default:
          sortedData = goodsFromServer;
          setReversedStatus(false);

          break;
      }

      setData(sortedData);
    };
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={customSort('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={customSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversedStatus === false ? 'is-light' : ''}`}
          onClick={customSort('reverse')}
        >
          Reverse
        </button>

        {reversedStatus === true && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={customSort('reset')}
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
