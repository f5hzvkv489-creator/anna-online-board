
let data = JSON.parse(localStorage.getItem('annaboard') || '{"folders":[],"boards":{}}');
let currentBoard = null;

function saveData(){
 localStorage.setItem('annaboard', JSON.stringify(data));
}

function render(){
 const tree = document.getElementById('tree');
 tree.innerHTML='';

 data.folders.forEach(folder=>{
   const f=document.createElement('div');
   f.className='item folder';
   f.textContent='📁 '+folder.name;
   tree.appendChild(f);

   folder.boards.forEach(id=>{
      const b=document.createElement('div');
      b.className='item';
      b.textContent='📝 '+data.boards[id].name;
      b.onclick=()=>openBoard(id);
      tree.appendChild(b);
   });
 });
}

function openBoard(id){
 currentBoard=id;
 document.getElementById('currentName').textContent=data.boards[id].name;
 document.getElementById('boardArea').value=data.boards[id].content || '';
}

document.getElementById('newFolder').onclick=()=>{
 const name=prompt('Название папки');
 if(!name) return;
 data.folders.push({name,boards:[]});
 saveData(); render();
};

document.getElementById('newBoard').onclick=()=>{
 if(data.folders.length===0){
   alert('Сначала создайте папку');
   return;
 }
 const name=prompt('Название доски');
 if(!name) return;
 const id='b_'+Date.now();
 data.boards[id]={name,content:''};
 data.folders[0].boards.push(id);
 saveData(); render();
};

document.getElementById('saveBtn').onclick=()=>{
 if(!currentBoard) return;
 data.boards[currentBoard].content=document.getElementById('boardArea').value;
 saveData();
 alert('Сохранено');
};

render();
