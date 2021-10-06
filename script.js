let array=[];
let url="https://api.covid19api.com/countries";
fetch(url)
.then((response)=> response.json())
.then((data)=>
{
    // console.log(data);
    
    let i=0;
    for(let x in data)
    {
        array[i]=data[x].Country;
        i++;
    }
    
    //  console.log(array);
    var countryname=document.getElementById("selectcountry");
    for(let i=0;i<array.length;i++)
    {
        var opt=document.createElement("option");
        opt.setAttribute("value",array[i]);
        opt.innerHTML=array[i];
        countryname.append(opt);
    }

})
.catch((error)=>console.log("not fetch"));


async function display()
{
    try{

   
    let countryname=document.getElementById("selectcountry").value;
    let rescont=await fetch(`https://api.covid19api.com/dayone/country/${countryname}`);
    // console.log(rescont);
    let rescontdata=await rescont.json();
    // console.log(rescontdata);
   
    let date=document.getElementById("day").value;
    // console.log(date);
    let currentvalue=0;

    for(let i=0;i<rescontdata.length;i++)
    {
        if(rescontdata[i].Date.includes(date))
        {
            currentvalue=i;
        }
    }
   
    for(let j=currentvalue-4;j<=currentvalue+5;j++)
    {
        //console.log(rescontdata[j])
        let active=rescontdata[j].Active;
        let death=rescontdata[j].Deaths;
        let recover=rescontdata[j].Recovered;
        let datetime=rescontdata[j].Date;
        let date= calculate(datetime);
        tablecontent(date,active,recover,death);
    }
    }
    catch(e)
    {
        window.alert("Data is not updated on that date.\n Give previous day date")   
    }
   
}


function calculate(datetime)
{
    // console.log(datetime);
    let s=datetime.split(/[a-z,A-Z]/g);
    return s[0];
}

function tablecontent(date,active,recover,death)
{
    // console.log(date,active+"  "+death+"  "+recover);
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    let td4=document.createElement("td");
    let tr =document.createElement("tr");
    let tbody=document.getElementById("tablecontent");
    td1.innerHTML=date
    td2.innerHTML=active;
    td3.innerHTML=recover;
    td4.innerHTML=death;
    tr.append(td1,td2,td3,td4);
    tbody.append(tr);
}