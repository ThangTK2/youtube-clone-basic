import './youtube.scss'
import {BsSearchHeart } from 'react-icons/bs'
import {CiKeyboard} from 'react-icons/ci'
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment'//thư viện dùng để thao tác xử lý datetime 
import Navigation from './Navigation/Navigation'
import useCrollY from './Scroll'

const Youtube = () =>{
    const [scrollY] = useCrollY();

    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState('');

    useEffect (() =>{

    }, [])
    //get with axios
    const handleSearchYoutube = async() =>{
        let res = await axios({
            url:'https://www.googleapis.com/youtube/v3/search',
            params:{
                part: 'snippet',
                maxResults: 50,
                key: 'AIzaSyCa66T3ZUGNXtEDReP_ZiLCOVZY_yeD3uc',
                type: 'video',
                q: query 
            }
        })
        if(res && res.data && res.data.items){
            let raw = res.data.items;
            let result = [];
            if(raw && raw.length > 0){
                raw.map(item => {
                    let object = {};
                    object.id = item.id.videoId;
                    object.title = item.snippet.title;
                    object.createdAt = item.snippet.publishedAt;
                    object.author = item.snippet.channelTitle;
                    object.description = item.snippet.description;

                    result.push(object);
                })
            } 
            setVideos(result)
        }
    }

    return(
        <>
            <Navigation />
            <div className="youtube-container" >
            <div className="yt-search" style={scrollY < 50 ? {background: '#0f0f0f'} : {background: 'pink'}}>
                <input type="text" placeholder='Search' value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={scrollY < 50 ? {background: '#0f0f0f'} : {background: 'pink', border: 'white 1px solid'}}
                />
                <CiKeyboard className='ic1'/>
                <BsSearchHeart className='ic2' onClick={handleSearchYoutube} />
            </div>

            {videos && videos.length > 0 &&
            videos.map(item =>{
                return(
                    <div className='yt-result' key={item.id}>
                        <div className='left'>
                            {/* iframe: nhúng trang web này vào trang web khác */}
                            <iframe className='iframe' src={`https://www.youtube.com/embed/${item.id}`} title='item.title' frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                        <div className='right'>
                            <div className='title'>
                                {item.title}
                            </div>
                            <div className='created-at'>
                                Created At: {moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss A')}
                            </div>
                            <div className='author'>
                                Author: {item.author}
                            </div>
                            <div className='description'>
                                Description: {item.description}
                            </div>
                    </div>
            </div>
                )
            })
            }
        </div>
        </>
        
    )
}
export default Youtube;

