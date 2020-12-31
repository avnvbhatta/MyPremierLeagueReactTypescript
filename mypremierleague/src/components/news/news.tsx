import * as React from 'react';
import { useEffect, useState } from 'react';
import {getTeamNews} from "../../helpers/api";
import placeHolderImage from "../../images/placeholder.png";
import Loading from "../loading/loading";
import moment from "moment";
import "./news.scss"
export interface NewsProps {
    teamID: number
}
 
interface News{
    title: string,
    thumbnail: string,
    redditURL: string,
    created: string
}
const News: React.FC<NewsProps> = ({teamID}) => {

    const [news, setNews] = useState<News[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(()=>{
        const getTeamNewsAsync = async () => {
            try {
                let response = await getTeamNews(teamID);
                let tempNewsArray: News[] = [];
                response.forEach(news => {
                    let redditURL = `http://www.reddit.com${news.data.permalink}`;
                    let {thumbnail, title, created} = news.data;
                    let tempNews: News = {
                        title: title,
                        thumbnail: thumbnail,
                        redditURL: redditURL,
                        created: created
                    }
                    tempNewsArray.push(tempNews);
                })
                setNews(tempNewsArray);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getTeamNewsAsync();
    }, [])
    return ( 

        <div className="block">
            <div className="title">News</div>
            <div className="content">
                {isLoading ? <Loading /> : 
                <>
                    {news?.map((item,idx) => {
                        return <div className="newsRow" key={idx}>
                                <img src={item.thumbnail === 'self' ? placeHolderImage : item.thumbnail} alt={item.title}/>
                                <div className="newsInfo">
                                    <div className="newsTitle"><a href={item.redditURL}>{item.title}</a></div>
                                    <div className="newsCreated">Submitted {moment.unix(parseInt(item.created)).fromNow()}</div>
                                </div>
                            </div>
                    })}

                </>

                }
                
            </div>
        </div>
            
        );
}
 
export default News;