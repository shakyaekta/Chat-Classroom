const socket = io();

  const form = document.getElementById('form');
  const input = document.getElementById('input');
  const messages = document.getElementById('messages');
  var audio=new Audio('./ding.mp3');


  const name= prompt("Please Enter Your Name to Join Classroom")
  const append=(msg,position)=>{
    const item = document.createElement('div');
    item.textContent = msg;
    item.classList.add(position)
    messages.append(item); 
    window.scrollTo(0, document.body.scrollHeight);

  }

  
  socket.emit('new-user-joined',name);
  socket.on('user-joined',(msg)=>{
    append(`${msg} joined the classroom`,'center');
  })
  socket.on('leave',(msg)=>{
    append(`${msg} leave the classroom`,'center');
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (input.value) {
      socket.emit('chat message', input.value,name)
      const item = document.createElement('div');
      item.textContent = `You ${input.value}`;
      item.classList.add('msg');
      item.classList.add('right');
      messages.append(item); 
      window.scrollTo(0, document.body.scrollHeight);
      input.value = '';
  }
})

  socket.on('chat message', (value,name) => {
    const item = document.createElement('div');
    item.textContent =`${name} ${value}`;
    item.classList.add('msg');
    item.classList.add('left');
    messages.append(item); 
    audio.play()
    window.scrollTo(0, document.body.scrollHeight);
  })

  
  
