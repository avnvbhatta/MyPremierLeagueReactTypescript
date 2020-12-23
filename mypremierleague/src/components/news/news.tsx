import * as React from 'react';
import { useEffect, useState } from 'react';
import {getTeamNews} from "../../helpers/api";
import placeHolderImage from "../../images/placeholder.png"
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
                    // let thumbnail = news.data.thumbnail === 'self' ? placeHolderImage : news.data.thumbnail;
                    let thumbnail = news.data.thumbnail;
                    let title = news.data.title;
                    let created = news.data.created;

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
        <div></div>
     );
}
 
export default News;