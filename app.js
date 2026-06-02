
const canvas=document.getElementById('board');
const ctx=canvas.getContext('2d');

function resize(){
 canvas.width=canvas.parentElement.clientWidth;
 canvas.height=canvas.parentElement.clientHeight;
}
resize(); window.addEventListener('resize',resize);

let tool='pen', drawing=false, startX=0, startY=0;

const boardIdEl=document.getElementById('boardId');
let boardId=location.hash.replace('#','');
if(!boardId){
 boardId=Math.random().toString(36).slice(2,8);
 location.hash=boardId;
}
boardIdEl.textContent=boardId;

document.querySelectorAll('[data-tool]').forEach(b=>{
 b.onclick=()=>tool=b.dataset.tool;
});

document.getElementById('newBoard').onclick=()=>{
 location.hash=Math.random().toString(36).slice(2,8);
 location.reload();
};

document.getElementById('clearBtn').onclick=()=>ctx.clearRect(0,0,canvas.width,canvas.height);

canvas.addEventListener('pointerdown',e=>{
 drawing=true;
 startX=e.offsetX; startY=e.offsetY;

 if(tool==='text'){
   const t=prompt('Введите текст');
   if(t) ctx.fillText(t,startX,startY);
   drawing=false;
   return;
 }
 ctx.beginPath();
 ctx.moveTo(startX,startY);
});

canvas.addEventListener('pointermove',e=>{
 if(!drawing) return;

 if(tool==='pen'){
   ctx.globalCompositeOperation='source-over';
   ctx.strokeStyle=document.getElementById('colorPicker').value;
   ctx.lineWidth=document.getElementById('penSize').value;
   ctx.lineTo(e.offsetX,e.offsetY);
   ctx.stroke();
 }

 if(tool==='eraser'){
   ctx.globalCompositeOperation='destination-out';
   ctx.lineWidth=document.getElementById('eraserSize').value;
   ctx.lineTo(e.offsetX,e.offsetY);
   ctx.stroke();
 }
});

canvas.addEventListener('pointerup',e=>{
 if(!drawing) return;

 if(tool==='line'){
   ctx.beginPath();
   ctx.moveTo(startX,startY);
   ctx.lineTo(e.offsetX,e.offsetY);
   ctx.stroke();
 }

 if(tool==='rect'){
   ctx.strokeRect(startX,startY,e.offsetX-startX,e.offsetY-startY);
 }

 if(tool==='circle'){
   const r=Math.hypot(e.offsetX-startX,e.offsetY-startY);
   ctx.beginPath();
   ctx.arc(startX,startY,r,0,Math.PI*2);
   ctx.stroke();
 }

 drawing=false;
});
