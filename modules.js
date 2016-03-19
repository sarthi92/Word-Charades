//Movie Strings & Controls
var str2;
var str3;
var pos=[];
var i,j;
var flag;
var max=10;
var count;
    
//State Controls    
var life;
var win;
    
//Audio Links:
var sWin=new Audio('win.wav');
var sLose=new Audio('lose.wav');
var rSnd=new Audio('rsound.wav');
var wSnd=new Audio('wsound.wav');

//Big Buttons
var startbutton=document.getElementById("start");
var handoffbutton=document.getElementById("handoff");
var insbutton=document.getElementById("instruct");
var setbutton=document.getElementById("settings");
    
//Play Panels
var placeholder=document.getElementById("moviespace");
var selection=document.getElementById("selection");
var lifeline=document.getElementById("lives");
var result=document.getElementById("final");

//Info Panels
var sett=document.getElementById("sett");
var inss=document.getElementById("inss");

function movieSelect()
{
    //Select Movie Randomly
    str2=data[Math.floor(Math.random()*263)];
    
    //Generate Placeholder
    str3="";
    for(i=0;i<str2.length;++i)
    {
        if(str2[i]!=' ')
            str3+="-";
        else
            str3+=str2[i];
    }
}
function returnResult(val)
{
        if(val=='!')
        {
            genState(0);
            return;
        }
        //Return if Won/Fetch Fail/Lost
        if(win==1||life==0){return 2;}
        
        if(val=='~'&&life!=1)
        {
            return 2; 
        }
        if(val=='~'&&life==1)
        {
            count=0;
          for(i=65;i<=90;++i){
              for(j=0;j<str2.length;++j)
                  {
                if(String.fromCharCode(i)==str2[j]){break;}
                  }
             if(j==str2.length)
             { document.getElementById(String.fromCharCode(i)).className="adisa";
                ++count;
                document.getElementById(String.fromCharCode(i)).disabled=true;}
              if(count==5){break;}
          }
            document.getElementById('~').className="adisp";
            document.getElementById('~').disabled=true;
          return 2;
        }
        //Check if Letter Match/Mismatch
        flag=0;
        for(i=0;i<str2.length;++i)
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
            result.innerHTML="YOU LOSE";
            sLose.play();
        }
        if(flag==0){return 0;}
        //Modify Placeholder for Letter Match
        str3="";
        for(i=0;i<str2.length;++i)
        {
            flag=0;
            for(j=0;j<pos.length;++j)
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
        } placeholder.innerHTML=str3;
        //Won Codition
        if(str2==str3)
        {
            win=1;
            result.innerHTML="YOU WIN";
            sWin.play();
        }
        return 1;
}
function initiate(val)
    {
        //Obtain Letter-button Response
        i=returnResult(val);
        if(i==1)
        {
            document.getElementById(val).className="adisp";
            document.getElementById(val).disabled=true;
            rSnd.play(); 
            lifeline.innerHTML="LIFE: "+life.toString();
        }
        else if(i==0)
        {
            document.getElementById(val).className="adisa";
            document.getElementById(val).disabled=true;
            wSnd.play(); 
            lifeline.innerHTML="LIFE: "+life.toString();
        }
        else
        {
            return;
        }
    }
function genState(load){
    switch(load)
        {
            case 0:
                startbutton.style.display="block";
                handoffbutton.style.display="block";
                insbutton.style.display="block";
                setbutton.style.display="block";
                placeholder.style.display="none";
                selection.style.display="none";
                lifeline.style.display="none";
                result.style.display="none";
                inss.style.display="none";
                sett.style.display="none";
                break;
                
            case 1:
                startbutton.style.display="block";
                handoffbutton.style.display="none";
                insbutton.style.display="none";
                setbutton.style.display="none";
                placeholder.style.display="block";
                selection.style.display="block";
                lifeline.style.display="block";
                result.style.display="block";
                inss.style.display="none";
                sett.style.display="none";
                break;
                
            case 2:
                startbutton.style.display="none";
                handoffbutton.style.display="block";
                insbutton.style.display="none";
                setbutton.style.display="none";
                placeholder.style.display="block";
                selection.style.display="block";
                lifeline.style.display="block";
                result.style.display="block";
                inss.style.display="none";
                sett.style.display="none";
                break;
                
            case 3:
                startbutton.style.display="none";
                handoffbutton.style.display="none";
                insbutton.style.display="block";
                setbutton.style.display="none";
                placeholder.style.display="none";
                selection.style.display="none";
                lifeline.style.display="none";
                result.style.display="none";
                inss.style.display="block";
                sett.style.display="none";
                break;
                
            case 4:
                startbutton.style.display="none";
                handoffbutton.style.display="none";
                insbutton.style.display="none";
                setbutton.style.display="block";
                placeholder.style.display="none";
                selection.style.display="none";
                lifeline.style.display="none";
                result.style.display="none";
                inss.style.display="none";
                sett.style.display="block";
                break;
        }
}
function spgo(){
    life=max;
    win=0;
    genState(1);
    movieSelect();
    pos=[];
    placeholder.innerHTML=str3;
    document.getElementById('~').className="alpha50";
    document.getElementById('~').disabled=false;
    for(i=65;i<=90;++i)
    {
        document.getElementById(String.fromCharCode(i)).disabled=false;
        document.getElementById(String.fromCharCode(i)).className="alpha";
    } 
    lifeline.innerHTML="LIFE: "+life.toString();
    result.innerHTML=" ";
}
function mpgo(){
    life=max;
    win=0;
    genState(2);
    
    //Input Movie
    str2=prompt("Enter your movie","Titanic");
    //Generate Placeholder
    str3="";
    for(i=0;i<str2.length;++i)
    {
        if(str2[i]!=' ')
            str3+="-";
        else
            str3+=str2[i];
    }
    pos=[];
    placeholder.innerHTML=str3;
    document.getElementById('~').className="alpha50";
    document.getElementById('~').disabled=false;
    for(i=65;i<=90;++i)
    {
        document.getElementById(String.fromCharCode(i)).disabled=false;
        document.getElementById(String.fromCharCode(i)).className="alpha";
    } 
    lifeline.innerHTML="LIFE: "+life.toString();
    result.innerHTML=" ";
}
function insgo(){
    genState(3);
}
function setgo(){
    genState(4);
}
function seteasy(){max=10;genState(0);}
function sethard(){max=7;genState(0);}
function onsound()
{
    sWin=new Audio('win.wav');
    sLose=new Audio('lose.wav');
    rSnd=new Audio('rsound.wav');
    wSnd=new Audio('wsound.wav');
    genState(0);
}
function offsound()
{
    sWin=new Audio('');
    sLose=new Audio('');
    rSnd=new Audio('');
    wSnd=new Audio('');
    genState(0);
}
genState(0);
