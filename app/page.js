"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [ayah, setAyah] = useState({});
  const [translation, setTranslation] = useState({});
  const [surahName, setSurahName] = useState("");
  const [ayahNum, setAyahNum] = useState("");
  const [surahNum, setSurahNum] = useState("");
  const [juzNum, setJuzNum] = useState("");
  const [loading, setLoading] = useState(false);

  const getRandomAyah = async () => {
    const randomId = Math.floor(Math.random() * 6236) + 1; // Ayah numbers start from 1
    setLoading(true);

    try {
      const [ayahRes, transRes] = await Promise.all([
        axios.get(`https://api.alquran.cloud/v1/ayah/${randomId}/ur.jalandhri`),
        axios.get(`https://api.alquran.cloud/v1/ayah/${randomId}/ur.ahmedali`)
      ]);

      const ayahData = ayahRes.data.data;
      const transData = transRes.data.data;

      setAyah(ayahData);
      setTranslation(transData);
      setSurahName(ayahData.surah.name);
      setAyahNum(ayahData.numberInSurah);
      setSurahNum(ayahData.surah.number);
      setJuzNum(ayahData.juz);
    } catch (error) {
      console.error("Error fetching Ayah", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getRandomAyah();
  }, []);

  return (
    <div className="p-5 gap-2 flex flex-col justify-start items-center w-full">
      <div className="w-full flex flex-col justify-center items-center rounded-lg text-white bg-gray-800 py-4 px-6">
        <h2 className="text-gray-500">Surah</h2>
        <h2 className="text-xl">{surahName}</h2>
      </div>

      <div className="w-full flex gap-1 flex-col justify-center items-center rounded-lg text-white bg-gray-800 py-4 px-6">
        <h1 className="text-gray-500">Ayah</h1>
        <h1 className="text-3xl text-end leading-normal">{ayah.text}</h1>
        <h1 className="text-gray-500 mt-2">Tarjuma</h1>
        <h1 className="text-lg text-end leading-normal">{translation.text}</h1>
      </div>

      <div className="w-full flex flex-row justify-around items-center rounded-lg text-white bg-gray-800 py-4 px-6">
        <div className="flex gap-2"><h2 className="text-gray-500">Ayah:</h2><h2>{ayahNum}</h2></div>      
        <div className="flex gap-2"><h2 className="text-gray-500">Surah:</h2><h2>{surahNum}</h2></div>
        <div className="flex gap-2"><h2 className="text-gray-500">Para:</h2><h2>{juzNum}</h2></div>
      </div>

      <button 
        onClick={getRandomAyah} 
        disabled={loading}
        className="bg-gray-600 px-4 py-4 text-lg w-full text-center rounded-lg text-white hover:cursor-pointer disabled:opacity-50"
      >
        {loading ? "Loading..." : "Generate"}
      </button>
    </div>
  );
};

export default Page;
