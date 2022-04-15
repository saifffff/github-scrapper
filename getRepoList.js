const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const getIssuesObj = require("./getIssues");


function getRepoList(folderPath,url){
    console.log(url);
    //we have url of a topic here
    // 1 - get an array of names of all topics and log the names
    // 2 - get list of each topics url 
    // 3 - pass url to getIssues("link") function
    request(url,cb);
    function cb(err,res,html){
        if(err){console.error(err);}else{
           // console.log("this is in cb and path is "+folderPath);
            handleHTML(html);
        }
    }

    function handleHTML(html){
        let $ = cheerio.load(html);
        let repoObjectsList = $(".border.rounded.color-shadow-small.color-bg-subtle.my-4");
        //console.log(repoObjectsList.length); // we getting 30 per page
        //we only require top 5 so lets get top 5 
        for(let i = 0; i < 5; i++){
            // get name 
            let repoNameObj = $(repoObjectsList[i]).find("h3 a");
            //console.log(repoName.length);
            let repoName = ""+$(repoNameObj[0]).text().trim()+"_"+$(repoNameObj[1]).text().trim();
            // get link
            let repoLink = $(repoObjectsList[i]).find('h3  a[data-ga-click="Explore, go to repository, location:explore feed"]').attr("href");
            repoLink = "https://github.com"+repoLink;
            // names and links of top five repo
            console.log("Repo name - "+repoName);
            let forFilePathName = repoName.split("_");
            let FileNameStr = forFilePathName[1].trim();
            let filePath = path.join(folderPath,FileNameStr);
            //console.log(filePath);
           // console.log("Repo Link - "+repoLink);
           getIssuesObj.getIssues(repoName,repoLink,filePath);
        //    return;
        }
    
    
     }
}







module.exports = {
    getRepoList:getRepoList,
};