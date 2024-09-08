import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../services/GlobalApi";
import MovieCard from "./MovieCard";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import HrMovieCard from "./HrMovieCard";

function MovieList({ genreId, index_ }) {

    const [movieList, setMovieList] = useState([]);
    const elementRef = useRef(null);
    useEffect(() => {
        getMovieByGenreId();
    }, []);

    const getMovieByGenreId = () => {
        GlobalApi.getMovieByGenreId(genreId).then(res => {
            // console.log(res.data.results);
            setMovieList(res.data.results);
        })
    }

    const slideRight = (element) => {
        element.scrollLeft += 500;
    }
    const slideLeft = (element) => {
        element.scrollLeft -= 500;
    }

    return (
        <div className="relative">
            <IoChevronBackOutline onClick={() => slideLeft(elementRef.current)} className={`text-[50px] text-white p-2 z-10 cursor-pointer hidden md:block absolute ${index_ % 3 === 0 ? 'mt-[70px]' : 'mt-[150px]'}`} />
            <div ref={elementRef} className="flex overflow-x-auto gap-8 scrollbar-none scroll-smooth pt-4 px-3 pb-4">
                {movieList.map((item) => (
                    <>
                        {index_ % 3 === 0 ? <HrMovieCard movie={item} /> : <MovieCard movie={item} />}
                    </>
                ))}
            </div>
            <IoChevronForwardOutline onClick={() => slideRight(elementRef.current)} className={`text-[50px] text-white hidden md:block p-2 cursor-pointer z-10 top-0 absolute ${index_ % 3 === 0 ? 'mt-[70px]' : 'mt-[150px]'} right-0`} />
        </div>
    )
}

export default MovieList;