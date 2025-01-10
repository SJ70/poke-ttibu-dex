import '../index.css';
import React, { useState } from 'react';
import { SEALS_INFO } from '../const/sealsInfo';
import { SERIES_INFO } from '../const/seriesInfo';

function Seals() {

  // todo 초기에 서버에서 사용자의 씰 현황를 받아 옴
  const [isCollectedAtServer, setIsCollectedAtServer] = useState(Array(SEALS_INFO.length).fill(false));
  const [isCollected, setIsCollected] = useState([...isCollectedAtServer]);

  const [seals, setSeals] = useState(SEALS_INFO);

  const [selectedSeries, setSelectedSeries] = useState(Array(SERIES_INFO.length).fill(true));
  const [selectedSort, setSelectedSort] = useState("series");

  const [rowCnt, setRowCnt] = useState(5);
  const [columnCnt, setColumnCnt] = useState(5);
  const [pageIdx, setPageIdx] = useState(1);
  const [pageCnt, setPageCnt] = useState(calcPageCnt(SEALS_INFO.length, rowCnt, columnCnt));

  return (
    <div>
      <SelectSeries />

      <label>
        <input
          type='radio'
          value='series'
          checked={selectedSort === 'series'}
          onChange={(event) => {
            setSelectedSort(event.target.value);
            let sortedSeals = seals.sort((a, b) => a.idx - b.idx);
            setSeals(sortedSeals);
          }}
        />
        시리즈 순
      </label>
      <label>
        <input
          type='radio'
          value='no'
          checked={selectedSort === 'no'}
          onChange={(event) => {
            setSelectedSort(event.target.value);
            let sortedSeals = seals.sort((a, b) => {
              if (a.no === null && b.no !== null) return 1;
              if (b.no === null && a.no !== null) return -1;
              return a.no - b.no;
            });
            setSeals(sortedSeals);
          }}
        />
        도감 번호 순
      </label>
      <label>
        <input
          type='radio'
          value='name'
          checked={selectedSort === 'name'}
          onChange={(event) => {
            setSelectedSort(event.target.value);
            let sortedSeals = seals.sort((a, b) => {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return a.idx - b.idx;
            });
            setSeals(sortedSeals);
          }}
        />
        이름 순
      </label>

      <label>행렬 크기 : </label>
      <input type = "number" value = {rowCnt} 
        onChange = {(event) => {
          let value = validateRange(event.target.value, 1, 15);
          setRowCnt(value); 
          let pageCnt = calcPageCnt(seals.length, value, columnCnt);
          setPageCnt(pageCnt);
          setPageIdx(Math.min(pageIdx, pageCnt));
        }} 
      />
      <span> x </span>
      <input type = "number" value = {columnCnt} 
        onChange = {(event) => {
          let value = validateRange(event.target.value, 1, 15);
          setColumnCnt(value); 
          let pageCnt = calcPageCnt(seals.length, rowCnt, value);
          setPageCnt(pageCnt);
          setPageIdx(Math.min(pageIdx, pageCnt));
        }} 
      />

      <SealTable />
      
      <button onClick = {() => setPageIdx(Math.max(pageIdx - 1, 1))}>
        {'<'} 
      </button>
      <input type = "number" value = {pageIdx} 
        onChange = {(event) => {
          let value = validateRange(event.target.value, 1, pageCnt);
          setPageIdx(value);
        }}
      />
      <span> / {pageCnt}</span>
      <button onClick = {() => setPageIdx(Math.min(pageIdx + 1, pageCnt))}> 
        {'>'}
      </button>

      <button onClick = {() => {
        let diffs = [];
        for (let i=0; i<SEALS_INFO.length; i++) {
          if (isCollectedAtServer[i] !== isCollected[i]) {
            diffs.push({
              idx: i,
              count: isCollected[i] - isCollectedAtServer[i],
            });
          }
        }
        setIsCollectedAtServer(isCollected);
        // todo 서버에 diffs를 전송
      }}>
        저장
      </button>

    </div>
  )

  function SelectSeries() {
    let rows = [];
    for (let i=0; i<SERIES_INFO.length; i++) {
      rows.push(
        <div key = {i}>
          <input 
            type = "checkbox" 
            checked = {selectedSeries[i]} 
            onChange = {(event) => {
              let checked = event.target.checked;
              selectedSeries[i] = checked;
              setSelectedSeries([...selectedSeries]);

              let newSeals = SEALS_INFO.filter(seal => selectedSeries[seal.series]);
              switch (selectedSort) {
                case 'idx' :
                  newSeals = newSeals.sort((a, b) => a.idx - b.idx);
                  break;
                case 'no' : 
                  newSeals = newSeals.sort((a, b) => {
                    if (a.no === null && b.no !== null) return 1;
                    if (b.no === null && a.no !== null) return -1;
                    return a.no - b.no;
                  });
                break;
                case 'name' :
                  newSeals = newSeals.sort((a, b) => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return a.idx - b.idx;
                  });
                break;
                default : break;
              }
              setSeals(newSeals);

              let pageCnt = calcPageCnt(seals.length, rowCnt, columnCnt);
              setPageCnt(pageCnt);
              setPageIdx(Math.min(pageIdx, pageCnt));
            }}
          />
          {SERIES_INFO[i].title}, {SERIES_INFO[i].release} 출시
        </div>
      );
    }
    return <div>{rows}</div>;
  }

  function SealTable() {
    let rows = [];
    let startIdx = rowCnt * columnCnt * (pageIdx - 1);
    for (let i=0; i<rowCnt; i++) {
      let cols = [];
      for (let j=0; j<columnCnt; j++) {
        let idx = startIdx + i * columnCnt + j;
        let seal = seals[idx];
        cols.push(
          <td id={idx} key={idx} >
            <div onClick={() => {
              isCollected[idx] = !isCollected[idx];
              setIsCollected([...isCollected]);
            }}>
              <img src={`/images/seals/${seal.code}.png`} alt={seal.name}/>
              <p> no. {seal.no} </p>
              <p> {seal.name} </p>
              <p> {SERIES_INFO[seal.series].title} </p>
              {isCollected[idx] ? '획득' : '미획득'}
            </div>
          </td>
        )
      }
      rows.push(
        <tr id={i} key={i}>
          {cols}
        </tr>
      )
    }
  
    return <table><tbody>{rows}</tbody></table>;
  }

}

function validateRange(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

function calcPageCnt(sealCnt, rowCnt, columnCnt) {
  return Math.ceil(sealCnt / (rowCnt * columnCnt));
}

export default Seals;