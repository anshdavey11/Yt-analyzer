import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const API_KEY = "AIzaSyA0eRBjYsbJSmiNiDMERlYoUjHXLRGULsc"; // Replace with your key
const REGION_CODE = "US"; // Change as needed

export default function ShowTrendingVideos() {
  const [videos, setVideos] = useState([]);
  const [videoCategories,setVideoCategories]=useState([]);
  const[categoryCount,setCategoryCount]=useState([]);
  const[mostId,seMostId]=useState([]);
  const[mostPopularCategory,setMostPopularCategory]=useState([]);
  const[mostLikedCategory,setMostLikedCategory]=useState([]);
  const[mostCommentedCategory,setMostCommentedCategory]=useState([]);
  let location=useLocation();
  let code=location.state.region.code;
  let countryName=location.state.region.name;

   


useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/videoCategories",
          {
            params: {
              part: "snippet",
              regionCode: code,
            //   maxResults: 10,
              key: API_KEY,
            },
          }
        );
        // setVideos(response.data.items);
        console.log(res.data.items);
        setVideoCategories(res.data.items);    
        console.log(location.state);
            
      } catch (err) {
        console.error("Failed to fetch trending videos:", err);
      }
    }
    
    fetchTrending();
  }, []);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              part: "snippet,statistics,contentDetails,topicDetails",
              chart: "mostPopular",
              regionCode: code,
              maxResults: 15,
              key: API_KEY,
            },
          }
        );
        setVideos(response.data.items);
        console.log(response.data.items);    
        console.log(location.state);
        
        
            
      } catch (err) {
        console.error("Failed to fetch trending videos:", err);
      }
    }

    fetchTrending();
  }, []);
//   console.log(videos);
  function fetchCategories(videos){
        for(let i=0;i<videos.length;i++){
            // mostId.push();
            // let obj={
            //     "categoryIdVideo":videos[i].snippet.categoryId,
            //     "category":
            // }
            for(let j=0;j<videoCategories.length;j++){
                if(videos[i].snippet.categoryId === videoCategories[j].id){
                    mostId.push({
                        categoryId:videos[i].snippet.categoryId,
                        title:videoCategories[j].snippet.title,
                        noOfViews:videos[i].statistics.viewCount,
                        likesCount:videos[i].statistics.likeCount,
                        commentCount:videos[i].statistics.commentCount
                    })
                    break;
                }
            }
        }
        mostId.sort((a,b)=>b.noOfViews-a.noOfViews);
        console.log(mostId);
    }
//   const trendingTop={videos};
    useEffect(()=>{
        fetchCategories(videos);
        // console.log(mostId);
    },[videos]);
    
    // let categoryCount=[];
    function countMostTrendingCategory(videos){
        for(let i=0;i<mostId.length;i++){
            const titleName=mostId[i].title;
            const existing=categoryCount.find(item=> item.title === titleName);
            if(existing){
                existing.categoryCountNumber += 1;
            }else{
                categoryCount.push({
                    title:titleName,
                    categoryCountNumber:1,
                })
            }
        }
        
        categoryCount.sort((a,b)=> b.categoryCountNumber-a.categoryCountNumber);
        console.log(categoryCount);
    }

    useEffect(()=>{
        countMostTrendingCategory(videos);
    },[videos])



  const chartData = {
    labels: videos.map((v) => v.snippet.title.slice(0, 20) + "..."),
    datasets: [
      {
        label: "Views",
        data: videos.map((v) => Number(v.statistics.viewCount)),
        backgroundColor: "#F9AB00",
        borderRadius: 8,
      },
    ],
  };

  useEffect(()=>{
    for(let i=0;i<mostId.length;i++){
        if(mostPopularCategory.includes(mostId[i].title)){

        }else{
            mostPopularCategory.push(mostId[i].title);
        }
    }
    console.log(mostPopularCategory);
    console.log(mostId);
    
    
},[videos])

    useEffect((videos)=>{
        // setMostLikedCategory(mostId);
        for(let i=0;i<mostId.length;i++){
            if(mostLikedCategory.includes(mostId[i].title)){

            }else{
                mostLikedCategory.push(mostId[i].title);
        }
        }
        mostLikedCategory.sort((a,b)=>a.noOfLikes-b.noOfLikes);
        console.log(mostLikedCategory);
    },[videos])


    useEffect(() => {
  const temp = [];

  for (let i = 0; i < mostId.length; i++) {
    const exists = temp.find(item => item.title === mostId[i].title);
    if (!exists) {
      temp.push({
        title: mostId[i].title,
        noOfComments: Number(mostId[i].commentCount || 0),
      });
    }
  }

  temp.sort((a, b) => b.noOfComments - a.noOfComments);

  setMostCommentedCategory(temp);
  console.log(temp);
}, [videos, mostId]);
     

  return (
    <div className="w-full h-full bg-gray-100 flex">
        <div className="p-6 max-w-[70%] bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Trending Videos in {countryName}</h1>

      {videos.length > 0 ? (
        <>
          <Bar data={chartData} />

          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((video) => (
              <li key={video.id} className="p-4 border-1 border-gray-100 hover:border-gray-300 rounded-xl shadow">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt="thumbnail"
                  className="mb-2 rounded w-[85%] h-[70%] mt-[1%]"
                />
                <h2 className="text-lg font-semibold">
                  t({video.snippet.title})
                </h2>
                <p className="text-sm text-gray-600">
                  Channel: {video.snippet.channelTitle}
                </p>
                <p className="text-sm">Views: {video.statistics.viewCount}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center">Loading trending videos...</p>
      )}
    </div>
    <div className="w-[28%] h-[200vh] bg-gray-100">
        <br />
        <h1 className="font-bold text-center mt-[1rem]">Top Trending Categories (Youtube Trending)</h1>
        <br />
        <div className="w-[80%] h-[30%] mx-auto bg-white rounded-2xl flex justify-center items-center">
           <div className="w-[90%] h-[90%]">
                {
            categoryCount.map((c, index) => (
                 <h1 key={index} className="text-[21px] mb-[0.5rem] ml-[0.5rem] mt-[0.8rem]">{index+1} - {c.title}</h1>
            ))
            }
            </div>
        </div>
            <br /><br /><br />
        <h1 className="font-bold text-center mt-[1rem]">Top Most Popular Categories (Views Wise)</h1>
        <br />
        <div className="w-[80%] h-[30%] mx-auto bg-white rounded-2xl flex justify-center items-center">
            <div className="w-[90%] h-[90%]">
                {
            mostPopularCategory.map((c, index) => (
                index<9 && <h1 key={index} className="text-[21px] mb-[0.5rem] ml-[0.5rem] mt-[0.8rem]">{index+1} - {c}</h1>
            ))
            }
            </div>
           
        </div><br /><br /><br />
        <h1 className="font-bold text-center mt-[1rem]">Top Liked Categories (Like count Wise)</h1>
        <br />
        <div className="w-[80%] h-[30%] mx-auto bg-white rounded-2xl flex justify-center items-center">
            <div className="w-[90%] h-[90%]">
                {
            mostLikedCategory.map((c, index) => (
                index<9 && <h1 key={index} className="text-[21px] mb-[0.5rem] ml-[0.5rem] mt-[0.8rem]">{index+1} - {c}</h1>
            ))
            }
            </div>
           
        </div>
        <br /><br /><br />
        <h1 className="font-bold text-center mt-[1rem]">Categories with most Engagement</h1>
        <br />
        <div className="w-[80%] h-[30%] mx-auto bg-white rounded-2xl flex justify-center items-center">
            <div className="w-[90%] h-[90%]">
                {
            mostCommentedCategory.map((c, index) => (
                index<9 && <h1 key={index} className="text-[21px] mb-[0.5rem] ml-[0.5rem] mt-[0.8rem]">{index+1} - {c.title}</h1>
            ))
            }
            </div>
           
        </div>
    </div>
    
    </div>
    
  );
}
