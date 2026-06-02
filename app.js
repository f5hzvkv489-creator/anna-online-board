
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const wrapper = document.querySelector('.worksheet-wrapper');

let tool = 'pen';
let drawing = false;

function resizeCanvas(){
    canvas.width = wrapper.scrollWidth;
    canvas.height = wrapper.scrollHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function setPen(){
    tool = 'pen';
}

function setEraser(){
    tool = 'eraser';
}

function clearBoard(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

canvas.addEventListener('pointerdown',(e)=>{
    if(e.pointerType !== 'pen' && e.pointerType !== 'mouse') return;

    drawing = true;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
});

canvas.addEventListener('pointermove',(e)=>{

    if(!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if(tool === 'pen'){
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 3;
    } else {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 24;
    }

    ctx.lineTo(x,y);
    ctx.stroke();
});

window.addEventListener('pointerup',()=>{
    drawing = false;
});
