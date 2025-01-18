import { useEffect, useState } from 'react';
import '../index.css';
import './market.css';
import { SEALS_INFO } from '../const/sealsInfo';
import { SERIES_INFO } from '../const/seriesInfo';

function Market() {

  const [findingSeals, setFindingSeals] = useState([]);
  const [requiredSeals, setRequiredSeals] = useState([]);
  const [foundSellers, setFoundSellers] = useState([]);
  const collectedSeals = [];

  useEffect(() => {
    document.getElementById("search").value = '';
    setFindingSeals([]);
  }, [requiredSeals]);

  return (
    <div>
      <div className='search'>
        <input id='search' type='text' placeholder='검색어' onChange={(event) => {
          let word = event.target.value;
          if (word.trim() === "") {
            setFindingSeals([]);
            return;
          }
          let seals = SEALS_INFO.filter(seal => seal.name.includes(word) || seal.no === Number(word));
          setFindingSeals(seals);
        }}>
        </input>
        <div className='select-uncollected btn' onClick={() => {
          let seals = SEALS_INFO.filter(seal => !collectedSeals.includes(seal));
          setRequiredSeals(seals);
        }}>
          없는 씰 모두 선택
        </div>
      </div>
      <FoundSeals />
      <FoundSellers />
    </div>
  )

  function FoundSeals() {
    let arr = [];
    for (let seal of findingSeals) {
      arr.push(
        <div key={seal.code} className='found-seal' onClick={() =>  setRequiredSeals([seal])}>
          <img src={`/images/seals/${seal.code}.png`} alt={seal.name} />
          <div className='found-seal-info'>
            <div className={seal.no === null ? 'invisible' : 'seal-no'}>
              {((String)(seal.no)).padStart(4, '0')}
            </div>
            <div className='seal-name'>{seal.name}</div>
            <div className='seal-series'>{SERIES_INFO[seal.series].title}</div>
          </div>
        </div>
      );
    }
    return (
      <div className={findingSeals.length === 0 ? 'invisible' : 'found-seals'}>
        {arr}
      </div>
    );
  }

  function FoundSellers() {
    let rows = [];
    for (let user of foundSellers) {
      rows.push(
        <tr key={user.id} onClick={() => {
          // 해당 사용자의 상점 페이지로 이동
        }}>
          <td>user.nickname</td>
          <td>user.sellingWhatINeed</td>
          <td>user.recentLogin</td>
        </tr>
      );
    }
    return (
      <table className='found-sellers'>
        <tr>
          <th className='seller-name'>판매자</th>
          <th className='selling-what-i-need'>판매 중인 내가 없는 씰</th>
          <th className='seller-recent-login'>최근 접속</th>
        </tr>
        {
          rows
        }
      </table>
    );
  }

}

export default Market;
