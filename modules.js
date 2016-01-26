//Movie Strings & Controls
var str1;
var str2;
var str3;
var pos=[];
var words=[];
var load=0;
    
//State Controls    
var life=10;
var win=0;
    
//Audio Links:
var sWin=new Audio('win.wav');
var sLose=new Audio('lose.wav');
var rSnd=new Audio('rsound.wav');
var wSnd=new Audio('wsound.wav');

function movieFeed()
{
    //Part 1: AJAX Fetch
    var feedRead;
    feedRead=new XMLHttpRequest();
    feedRead.open("GET","https://raw.githubusercontent.com/sarthi92/Text-Feed-Server/master/wordshare.txt",false);
    feedRead.send();
    str1=feedRead.responseText;
    
    //Part 2: Fill Movies
    load=1;
    str2="";
    for(var key=0;key<str1.length;++key)
    {
        if(str1[key]==str1[8]){words.push(str2);str2="";}
        else{str2+=str1[key];}
    }
    words.push(str2);
}
function movieSelect()
{
    //Select Movie Randomly
    str2=words[Math.floor(Math.random()*263)];
    
    //Generate Placeholder
    str3="";
    for(var i=0;i<str2.length;++i)
    {
        if(str2[i]!=' ')
            str3+="-";
        else
            str3+=str2[i];
    }
}
function returnResult(val)
    {
        //Return if Won/Fetch Fail/Lost
        if(win==1||load==0||life==0){return 2;}
        
        //Check if Letter Match/Mismatch
        var flag=0;
        for(var i=0;i<str2.length;++i)
        {
            if(str2[i]==val||str2[i]==val.toLowerCase())
            {
                flag=1;
                pos.push(i);
            }
        }
        
        //Decrease HP for Letter Mismatch
        if(flag==0)
        {
            --life;
        }
        
        //Lost Condition
        if(life==0)
        {
            document.getElementById("final").innerHTML="YOU LOSE";
            document.getElementById("start").disabled=false;
            document.getElementById("start").innerHTML="Give me New Movie";
            sLose.play();
        }
        if(flag==0){return 0;}
        
        //Modify Placeholder for Letter Match
        str3="";
        for(var i=0;i<str2.length;++i)
        {
            flag=0;
            for(var j=0;j<pos.length;++j)
            {
                if(i==pos[j])
                {
                    str3+=str2[i];
                    flag=1;
                    break;
                }
            }
            if(str2[i]!=' '&&flag==0)
            {
                str3+="-";
            }
            else if(flag==0)
            {
                str3+=str2[i];
            }
        }
        document.getElementById("moviespace").innerHTML=str3;
        
        //Won Codition
        if(str2==str3)
        {
            win=1;
            document.getElementById("final").innerHTML="YOU WIN";
            document.getElementById("start").disabled=false;
            document.getElementById("start").innerHTML="Give me New Movie";
            sWin.play();
        }
        return 1;
    }
        
function tryAgain()
{
    //Initialize Stats
    life=10;
    win=0;
    
    //Initial Fetch
    if(load==0)
    {
        movieFeed();
        document.getElementById("moviespace").style.visibility='visible';
        document.getElementById("selection").style.visibility='visible';
        document.getElementById("lives").style.visibility='visible';
        document.getElementById("final").style.visibility='visible';
    }
    document.getElementById("final").innerHTML="Instructions:<br/>Select Letters to Guess the Movie.<br/>Wrong Guess will Deplete your HP!";
    
    //Initialization Continued...
    movieSelect();
    pos=[];
    document.getElementById("start").disabled=true;
    document.getElementById("start").innerHTML="Select Letter to Check...";
    document.getElementById("moviespace").innerHTML=str3;
    
    //Initialize or Revert Letter-buttons
    for(var i=65;i<=90;++i)
    {
        document.getElementById(String.fromCharCode(i)).disabled=false;
        document.getElementById(String.fromCharCode(i)).className="alpha";
    }
    
    //Display HP (aka 100% here)
    document.getElementById("lives").innerHTML="HP: "+String(life*10);
}
function initiate(val)
    {
        //Obtain Letter-button Response
        var i=returnResult(val);
        if(i==1)
        {
            document.getElementById(val).className="adisp";
            document.getElementById(val).disabled=true;
            rSnd.play();
            document.getElementById("lives").innerHTML="HP: "+String(life*10);
        }
        else if(i==0)
        {
            document.getElementById(val).className="adisa";
            document.getElementById(val).disabled=true;
            wSnd.play();
            document.getElementById("lives").innerHTML="HP: "+String(life*10);
        }
        else
        {
            return;
        }
    }