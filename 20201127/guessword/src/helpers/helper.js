//提示输入信息重复
export function showNotifications(setter) {
    setter(true);
    setTimeout(() => {
        setter(false);
    }, 2000);
}

//显示游戏结果
export function checkWin(correct, wrong, word){
    let status = "win";
    //验证是否获胜
    word.split('').forEach(letter => {
        if(!correct.includes(letter)){
            status = "";
        }
    })
    //验证是否失败
    if(wrong.length === 6){
        status = "lose";
    }
    return status;
}