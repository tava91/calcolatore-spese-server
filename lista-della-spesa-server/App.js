
/*
const events = [
  'change',
  'click',
  'submit',
  'resize',
  'scroll',
  'mouseover',
  'mouseout',
  'keyup',
]

const Bindings = []

const Model = {
    mail:'',
    password:'',
    set:(data) =>{
      let newState = {
        ...Model,
        ...data
      }
      Object.keys(data).forEach(key => updateBindings(key))
      return newState;
    }
}

const Controller = () => {
  return{
    setMail: e => {
      Model.set({mail:e.target.value})
    },
    setPassword: e => {
      Model.set({password:e.target.value})
    },
  }
}

const updateBindings = (prop) =>{
  Bindings.forEach(
    item => {
      let node = document.querySelector(`[data-bind='${item.bind}']`)
      if(node.innerText){
        node.innerText = item.value
        .replace(
          '${'+prop+'}',
          Model[prop]
        )
      }
      else{
        node.value = item.value
        .replace(
          '${'+prop+'}',
          Model[prop]
        )
      }
    }
  )
}

document.querySelectorAll(`[data-bind]`).forEach(node=>{
  let bind = node.dataset.bind;
  Bindings.push({
    node:node,
    bind:bind,
    value: node.innerText || node.value
  })
})

events.forEach(evnt =>{
  document.querySelectorAll(`[data-${evnt}]`)
    .forEach(
      item => item[`on${evnt}`] = e => {
        Controller()[item.dataset[evnt]](e)
      }
    )
})

Object.keys(Model).forEach(key => updateBindings(key))
*/

//////////////////////////


document.querySelector('button').onclick = async _ =>{
  
  let response = await fetch('./server.js',{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      mail:document.getElementById(`email`).value,
      password:document.getElementById(`password`).value,
    })
  }).then(response=>response.json)
  
  response.then((success)=>{
    console.log(success)
  })
  
  response.catch((error)=>{
    console.log(error)
  })  
}




