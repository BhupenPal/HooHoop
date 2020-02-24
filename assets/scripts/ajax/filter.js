MakeSelector = () => {
    let MakeAll = document.getElementById('make').getElementsByTagName('input');
    
    let MakeQuery = ''
    for(let makeCount = 0; makeCount < MakeAll.length; makeCount++){
        if(MakeAll[makeCount].checked === true){
            MakeQuery += `${MakeAll[makeCount].value},`;
        }
    }
    console.log(MakeQuery)
}