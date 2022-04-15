const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfDoc = require("pdfkit");

function getIssues(repoName,repoLink,filePath){
    //console.log("i need to get issues for "+repoName+"\n And its link is - "+repoLink); 
    request(repoLink,cb);



    function cb(err,res,html){
        if(err){console.error(err);}else{
            handleHTML(html);
        }
    }


    function handleHTML(html){
        let $ = cheerio.load(html);
        let issueLink = $('a[id="issues-tab"]').attr("href");
        issueLink = "https://github.com"+issueLink;
       // console.log(issueLink);
        getIssueData(issueLink);
    
    }
    function getIssueData(issueLink){
        request(issueLink,cb2);
    }
    
    function cb2(err,res,html){
        if(err){console.error(err);}else{
            handleIssue(html);
        }
    }
    
    function handleIssue(issuehtml){
        let $ = cheerio.load(issuehtml);
        let allIssuesObj = $('.js-navigation-container.js-active-navigation-container .Box-row.Box-row--focus-gray.p-0.mt-0.js-navigation-item.js-issue-row');
        let issuesArray = [];
        for(let i = 0; i < allIssuesObj.length; i++){
            let issueHeadingObj = $(allIssuesObj[i]).find('a');
            let issueHeading = $(issueHeadingObj[0]).text();
            //console.log(">> "+issueHeading);
            issuesArray[i] = issueHeading;
    
        }
        console.log("?? "+filePath);
        //fs.writeFileSync(filePath,JSON.stringify(issuesArray));
        //console.log(issuesArray.length);
        let textData = JSON.stringify(issuesArray);
        let pdfFile = new pdfDoc;
        pdfFile.pipe(fs.createWriteStream(filePath+".pdf"));
        pdfFile.text(textData);
        pdfFile.end();

        
    
    }



}









module.exports = {
    getIssues:getIssues,
}