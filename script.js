const authKey = "6f79d7591235472dba8561c98e6e12eb";
const eduCode = "D10";
const schoolCode = "7240183";
const mealCode = "2";
const today = new Date();
const year = today.getFullYear();
const month = ("00" + (today.getMonth() + 1)).toString().slice(-2);
const date = today.getDate();
const todayDate = `${year}${month}${date}`;
console.log("https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pIndex=1&pSize=100&KEY=" + authKey + "&ATPT_OFCDC_SC_CODE=" + eduCode + "&SD_SCHUL_CODE=" + schoolCode + "&MLSV_YMD=" + todayDate + "&MMEAL_SC_CODE=" + mealCode)


function getMeal() {
    var result = "";
    $.ajax({
        type: "GET",
        async: false,
        url: "https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&pIndex=1&pSize=100&KEY=" + authKey + "&ATPT_OFCDC_SC_CODE=" + eduCode + "&SD_SCHUL_CODE=" + schoolCode + "&MLSV_YMD=" + todayDate + "&MMEAL_SC_CODE=" + mealCode,
        success: function (response) {
            result = response;
        },
    }
    );
    return result;
}

const schoolNameText = document.querySelector("#schoolname-text");
const mealNameText = document.querySelector("#mealname-text");
const todayMealText = document.getElementById("todaymeal-innerbox");

const apiResult = JSON.parse(getMeal());
let todayMeal = "";
let schoolName = "";
let mealName = "";
if (apiResult.RESULT.CODE == "INFO-200") {
    console.log("급식정보가 없습니다.");
    todayMeal = "급식정보가 없습니다.";
    schoolName = "급식정보가 없습니다.";
    mealName = "급식정보가 없습니다.";

    schoolNameText.innerText = "오늘은 급식이 없습니다.";
    mealNameText.innerText = "집밥";
    const newDiv = document.createElement("div");
    newDiv.innerHTML = todayMeal;
    newDiv.classList.add("todaymeal-text");
    todayMealText.appendChild(newDiv);
} else {
    todayMeal = (apiResult.mealServiceDietInfo[1].row[0].DDISH_NM).split("<br/>").join("\n").split(")").join(")<br/>");
    schoolName = apiResult.mealServiceDietInfo[1].row[0].SCHUL_NM;
    mealName = apiResult.mealServiceDietInfo[1].row[0].MMEAL_SC_NM;
    console.log("급식정보가 존재합니다.");

    schoolNameText.innerText = "오늘 " + schoolName + "의 급식";
    mealNameText.innerText = mealName;
    const newDiv = document.createElement("div");
    newDiv.innerHTML = todayMeal;
    newDiv.classList.add("todaymeal-text");
    todayMealText.appendChild(newDiv);
}


