import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import { FaCircleDot } from "react-icons/fa6";
function Game() {

    const [arr, setArr] = useState([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    const [player1, setPlayer1] = useState(true);
    const [win, setWin] = useState(0);
    function check() {
        let value;
        if (player1) {
            value = 1;
        }
        else {
            value = 2;
        }
        for (let i = 0; i < arr.length; i++) {
            let count1 = 0;
            let count2 = 0;
            for (let j = 0; j < arr.length; j++) {
                if (arr[i][j] === value) {
                    count1++;
                }
                if (arr[j][i] === value) {
                    count2++;
                }
                if (count1 === 3 || count2 === 3) {
                    return true;
                }
            }
        }
        let count = 0;
        for (let i = 0, j = 0; i < arr.length && j < arr[0].length; i++, j++) {

            if (value === arr[i][j]) {
                count++;
            }
            if (count === 3) {
                return true
            }
        }
        count = 0;
        for (let i = arr.length - 1, j = 0; i >= 0 && j < arr.length; i--, j++) {

            if (value === arr[i][j]) {
                count++;
            }
            if (count === 3) {
                return true
            }
        }
        let draw = 0;
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[i][j] === 0) {
                    draw++;
                }
            }
        }
        if (draw === 0) {
            return 1;
        }
        return false;

    }
    function boxClick(i, j) {
        if (arr[i][j] === 1 || arr[i][j] === 2) {
            alert("Cannot Replace Existing Coin!")
            return;
        }
        if (player1) {
            let tempArr = arr;
            tempArr[i][j] = 1
            setArr(tempArr);
        }
        else {
            let tempArr = arr;
            tempArr[i][j] = 2;
            setArr(tempArr);
        }
        let c = check()
        if (c === 1) {
            setWin("Draw!");
        }
        else if (c) {
            if (player1) {
                setWin("Player-X Won!")
            }
            else {
                setWin("Player-O Won!")
            }
        }
        setPlayer1((prev) => !prev);

    }
    function RestartClick() {
        setWin(0);
        setArr([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
        setPlayer1(true);
    }

    return (
        <div className='relative'>
            <nav className='text-3xl sm:text-5xl sm:p-4 font-semibold p-3 fixed bg-blue-500 text-white w-[100%]' style={{ boxShadow: "2px 4px 20px grey" }}>
                <h1>Tic Tac Toe</h1>
            </nav>
            <div className='flex flex-col pt-16 px-2 justify-center place-items-center bg-blue-100 h-screen '>
                <div className='flex place-content-center gap-10 m-5 w-[100%] sm:gap-20'>
                    <h1 className='flex justify-center place-items-center text-2xl sm:text-4xl gap-1 p-2 duration-500 font-semibold' style={(player1) ? { borderBottom: "5px solid rgb(74 222 128)" } : { borderBottom: "5px solid rgb(219 234 254)" }}>Player : <ImCross className='mt-2' size={25}></ImCross></h1>
                    <h1 className='flex justify-center place-items-center text-2xl sm:text-4xl gap-1 p-2 duration-500 font-semibold' style={(!player1) ? { borderBottom: "5px solid rgb(74 222 128)" } : { borderBottom: "5px solid rgb(219 234 254)" }}>Player : <FaCircleDot className='mt-2' size={30}></FaCircleDot></h1>
                </div>
                <div className='bg-[rgb(0,0,0,0.3)] p-6 rounded-2xl  sm:p-10'>
                    <div className='p-4 bg-white rounded-2xl shadow-xl sm:p-10' style={{ boxShadow: "2px 4px 20px rgb(0,0,0,0.4" }}>
                        <div className='flex flex-col gap-2 sm:gap-4 bg-black rounded-2xl'>
                            {arr.map((row, rowIndex) => (<div key={rowIndex} className='flex gap-2 sm:gap-4 justify-between w-fit'>{row.map((item, colIndex) => (<div onClick={() => boxClick(rowIndex, colIndex)} key={colIndex} className='w-20 h-20 sm:w-36 sm:h-36 bg-white rounded-xl flex justify-center place-items-center cursor-pointer'><h1>{(arr[rowIndex][colIndex] === 1) ? <ImCross className='sm:size-20 size-12' ></ImCross> : (arr[rowIndex][colIndex] === 2 ? <FaCircleDot className='sm:size-20 size-12'></FaCircleDot> : null)}</h1></div>))}</div>))}
                        </div>
                    </div>
                </div>

            </div>
            <div>
                {(win !== 0) ? <div className='absolute top-0 flex flex-col justify-center  place-items-center text-2xl md:text-6xl z-10  bg-[rgb(0,0,0,0.7)] text-white h-lvh w-[100%] duration-500'><h1>{win}</h1><button className='text-xl bg-green-600 m-2 px-4 py-2 rounded-lg text-white hover:bg-green-500' onClick={RestartClick}>Restart</button></div> : null}

            </div>
        </div>
    )
}

export default Game
