import '../index.css';
import './seals.css';
import React, { useEffect, useState } from 'react';
import { SEALS_INFO } from '../const/sealsInfo';
import { SERIES_INFO } from '../const/seriesInfo';
import { loadSeals, updateSeal } from '../localStorage/localStorage';

function Seals() {

  const [collectedSeals, setCollectedSeals] = useState(loadSeals());

  const [seals, setSeals] = useState(SEALS_INFO);

  const [selectedSeries, setSelectedSeries] = useState(Array(SERIES_INFO.length).fill(true));
  const [selectedSort, setSelectedSort] = useState("series");

  const [rowCnt, setRowCnt] = useState(5);
  const [columnCnt, setColumnCnt] = useState(5);
  const [pageIdx, setPageIdx] = useState(1);
  const [pageCnt, setPageCnt] = useState(calcPageCnt(SEALS_INFO.length, rowCnt, columnCnt));

  // pageCnt 관리
  useEffect(() => {
    let pageCnt = calcPageCnt(seals.length, rowCnt, columnCnt);
    setPageCnt(pageCnt);
    setPageIdx(Math.min(Math.max(1, pageIdx), pageCnt));
  }, [seals, rowCnt, columnCnt])

  return (
    <div>

      <div className='control-bar'>

        <div className='search'>
          <input type='text' placeholder='검색어' onChange={(event) => {
            let word = event.target.value;
            let selectedSeals = SEALS_INFO.filter(seal => selectedSeries[seal.series]);
            let foundSeals = selectedSeals.filter(seal => seal.name.includes(word) || seal.no === Number(word));
            let sortedSeals = sortSeals(foundSeals, selectedSort);
            setSeals(sortedSeals)
          }}>
          </input>
        </div>

        <div className='gray-btn drop-down'>
          <span className="material-symbols-outlined">
            grid_on
          </span>
          <ResizeTable />
        </div>

        <div className='gray-btn drop-down'>
          <span className="material-symbols-outlined">
            filter_alt
          </span>
          <SelectSeries />
        </div>

        <div className='gray-btn drop-down'>
          <span className="material-symbols-outlined">
            sort
          </span>
          <div className='sort drop-down-elements'>
            <SortRadio value={'series'} text={'시리즈 순'} />
            <SortRadio value={'no'} text={'번호 순'} />
            <SortRadio value={'name'} text={'이름 순'} />
          </div>
        </div>
        
      </div>

      <div className='table-wrapper'>
        <SealTable />
      </div>
      
      <PageControl />

    </div>
  )

  function SelectSeries() {
    let rows = [];
    for (let i=0; i<SERIES_INFO.length; i++) {
      rows.push(
        <label className='series' key = {i}>
          <input 
            type = "checkbox" 
            checked = {selectedSeries[i]} 
            onChange = {(event) => {
              let checked = event.target.checked;
              selectedSeries[i] = checked;
              setSelectedSeries([...selectedSeries]);

              let selectedSeals = SEALS_INFO.filter(seal => selectedSeries[seal.series]);
              let sortedSeals = sortSeals(selectedSeals, selectedSort);
              setSeals(sortedSeals);
            }}
          />
          <p className='series-title'>
            {SERIES_INFO[i].title}
          </p>
          <p className='series-release'>
            {SERIES_INFO[i].release} 출시
          </p>
        </label>
      );
    }
    return <div className='select-series drop-down-elements'>{rows}</div>;
  }

  function SortRadio({value, text}) {
    return (
      <label className='sort-radio'>
        <input
          type='radio'
          value={value}
          checked={selectedSort === value}
          onChange={(event) => {
            setSelectedSort(event.target.value);
            let sortedSeals = sortSeals(seals, event.target.value);
            setSeals(sortedSeals);
          }}
        />
        {text}
      </label>
    );
  }

  function sortSeals(selectedSeals, sort) {
    let sortedSeals;
    switch (sort) {
      case 'series' :
        sortedSeals = selectedSeals.sort((a, b) => {
          if (a === undefined && b === undefined) return 0;
          if (a === undefined) return 1;
          if (b === undefined) return -1;
          return a.idx - b.idx;
        });
        break;
      case 'no' : 
        sortedSeals = selectedSeals.sort((a, b) => {
          if (a === undefined && b === undefined) return 0;
          if (a === undefined) return 1;
          if (b === undefined) return -1;
          if (a.no === null && b.no !== null) return 1;
          if (b.no === null && a.no !== null) return -1;
          return a.no - b.no;
        });
        break;
      case 'name' :
        sortedSeals = selectedSeals.sort((a, b) => {
          if (a === undefined && b === undefined) return 0;
          if (a === undefined) return 1;
          if (b === undefined) return -1;
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
          return a.idx - b.idx;
        });
        break;
      default : 
        break;
    }
    return sortedSeals;
  }

  function ResizeTable() {

    return (
      <div className='resize drop-down-elements'>
        <div className='resize-div'>
          <div className='row-column-cnt'>행의 수 : {rowCnt}</div>
          <div className='gray-btn little-btn'>
            <span className="material-symbols-outlined" onClick={() => {
              let value = validateRange(rowCnt - 1, 1, 15);
              setRowCnt(value); 
            }}>
              remove
            </span>
          </div>
          <div className='gray-btn little-btn'>
            <span className="material-symbols-outlined" onClick={() => {
              let value = validateRange(rowCnt + 1, 1, 15);
              setRowCnt(value); 
            }}>
              add
            </span>
          </div>
        </div>
        <div className='resize-div'>
          <div className='row-column-cnt'>열의 수 : {columnCnt}</div>
          <div className='gray-btn little-btn'>
            <span className="material-symbols-outlined" onClick={() => {
              let value = validateRange(columnCnt - 1, 1, 15);
              setColumnCnt(value); 
            }}>
              remove
            </span>
          </div>
          <div className='gray-btn little-btn'>
            <span className="material-symbols-outlined" onClick={() => {
              let value = validateRange(columnCnt + 1, 1, 15);
              setColumnCnt(value); 
            }}>
              add
            </span>
          </div>
        </div>
      </div>
    );
  }

  function SealTable() {

    function TableElement({idx, seal}) {
      return (
        <div 
          className = {collectedSeals[idx] ? 'seal-cell' : 'seal-cell uncollected'} 
          onClick = {() => {
            const bool = !collectedSeals[idx]
            collectedSeals[idx] = bool;
            updateSeal(seal.idx, bool);
            setCollectedSeals([...collectedSeals]);
          }}
        >
          <img src={`/images/seals/${seal.code}.png`} alt={seal.name} />
          {/* <p> no. {seal.no} </p>
          <p> {seal.name} </p>
          <p> {SERIES_INFO[seal.series].title} </p> */}
        </div>
      );
    }
    function EmptyElement() {
      return (
        <div className='seal-cell uncollected'>
          <img src={`/images/seals/null.png`} alt={'empty'} />
        </div>
      );
    }

    let rows = [];
    let startIdx = rowCnt * columnCnt * (pageIdx - 1);
    for (let i=0; i<rowCnt; i++) {
      let cols = [];
      for (let j=0; j<columnCnt; j++) {
        let idx = startIdx + i * columnCnt + j;
        let seal = seals[idx];
        cols.push(
          <td id={idx} key={idx} >
            {
              (seal !== undefined)
              ? <TableElement idx = {idx} seal = {seal}/>
              : <EmptyElement />
            }
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

  function PageControl() {
    function PageBtn({idx, isSide}) {
      let classNames = ['page-btn'];
      if (idx < 1 || idx > pageCnt) {
        classNames.push('invisible');
      }
      if (pageIdx === idx) {
        classNames.push('current-idx')
      }
      if (isSide) {
        if ((idx === 1 && pageIdx < 4) || (idx === pageCnt && pageIdx > pageCnt - 3)) {
          classNames.push('invisible');
        }
      }
      return (
        <div className={classNames.join(' ')} onClick = {() => setPageIdx(idx)}>
          {idx}
        </div>
      );
    }

    return (
      <div className='page-control'>
        <div className='gray-btn' onClick = {() => setPageIdx(Math.max(pageIdx - 1, Math.min(pageCnt, 1)))}>
          <span className="material-symbols-outlined">
            arrow_back
          </span>
        </div>
        <div className='page-btns'>
          <PageBtn idx={1} isSide={true}/>
          <div className={pageIdx <= 4 ? 'invisible':''}>
            ...
          </div>
          <PageBtn idx={pageIdx - 2} isSide={false}/>
          <PageBtn idx={pageIdx - 1} isSide={false}/>
          <PageBtn idx={pageIdx}     isSide={false}/>
          <PageBtn idx={pageIdx + 1} isSide={false}/>
          <PageBtn idx={pageIdx + 2} isSide={false}/>
          <div className={pageIdx >= pageCnt - 3 ? 'invisible':''}>
            ...
          </div>
          <PageBtn idx={pageCnt} isSide={true}/>
        </div>
        <div className='gray-btn' onClick = {() => setPageIdx(Math.min(pageIdx + 1, pageCnt))}>
          <span className="material-symbols-outlined">
            arrow_forward
          </span>
        </div>
      </div>
    );
  }
}

function validateRange(value, min, max) {
  return Math.max(Math.min(value, max), min);
}

function calcPageCnt(sealCnt, rowCnt, columnCnt) {
  return Math.ceil(sealCnt / (rowCnt * columnCnt));
}

export default Seals;