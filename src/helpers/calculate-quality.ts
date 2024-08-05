import { CheckApiInteraction } from "@/controllers/check-api";
import { ICheckResponse, IPost } from "@/model/interfaces";
import { banWords } from "./ban-words";

export async function calculateQuality(post:IPost){
    let wordsCounter:number=0;

    const postWordsArray:string[]=[];
    postWordsArray.push(...post.title.split(' '),...post.body.split(' '));
    postWordsArray.forEach(word => {
        if(banWords.includes(word)){
            wordsCounter++;
        }
    });

    const api=new CheckApiInteraction;
    const wrongTitleWords=await api.checkPostTitle(post);
    const wrongBodyWords=await api.checkPostBody(post);
    
    if(wrongTitleWords&&wrongBodyWords){
        wordsCounter+=wrongTitleWords.matches.length;
        wordsCounter+=wrongBodyWords.matches.length;
    }

    const corrections=wrongBodyWords!.matches.length+wrongTitleWords!.matches.length;
    
    const approvalPercent:number=100-Math.round((wordsCounter*100)/postWordsArray.length);
    return {approvalPercent, corrections};
}