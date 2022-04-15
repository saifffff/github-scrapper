const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const url = "https://github.com/topics";
const getRepoList = require("./getRepoList");

// 1 - create folders for each topic
request(url,cb);
function cb (err,res,html){
    if(err){console.error(err);}else{
        handleHTML(html);
    }
}

function handleHTML(html){
    let $ = cheerio.load(html);
    let topicNamesList = $(".container-lg.p-responsive.mt-6 .f3.lh-condensed.text-center.Link--primary.mb-0.mt-1");
    let topic1Name = $(topicNamesList[0]).text().trim();
    let topic2Name = $(topicNamesList[1]).text().trim();
    let topic3Name = $(topicNamesList[2]).text().trim();
    console.log(topic1Name);
    console.log(topic2Name);
    console.log(topic3Name);
    let topic1path = path.join(__dirname,topic1Name);
    let topic2path = path.join(__dirname,topic2Name);
    let topic3path = path.join(__dirname,topic3Name);
    //console.log("topic 1 path = "+topic1path);
    if(!fs.existsSync(topic1path)){
        fs.mkdirSync(topic1path);
        fs.mkdirSync(topic2path);
        fs.mkdirSync(topic3path);
    }
    let topicPathsArray = [topic1path,topic2path,topic3path];
    // get topic link
    let topicLinkListItem = $(".container-lg.p-responsive.mt-6 .col-12.col-sm-6.col-md-4.mb-4 a");
    for(let i = 0; i < topicLinkListItem.length; i++){
        let tlink = $(topicLinkListItem[i]).attr("href");
        //console.log(tlink);
        let fullLink = "https://github.com"+tlink;
       // console.log(fullLink);
        //call get repo from topic pass it the link
        let tPath = topicPathsArray[i];
        getRepoList.getRepoList(tPath,fullLink);
        // exec flows to getRepoList
        // return;
    }
}
