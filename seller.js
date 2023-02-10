let ulist=document.getElementById('ul')
let li=document.createElement('li')
li.className='ul-item'

let msg=document.getElementById('msg')
var total=0;

document.getElementById('my_form').addEventListener('submit', disp);

window.addEventListener('DOMContentLoaded', () => {

    
    axios.get("https://crudcrud.com/api/9e33043bfcd5490f9416d6a2b5eb93e5/products")
        .then((response) => {
            console.log(response)
            for (var i=0; i<response.data.length; i++) {
                showUserOnScreen(response.data[i])
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

function disp(e){
    e.preventDefault();

    let sp=e.target.sp.value;
    let product=e.target.product.value;
    
    const obj={
        sp, product
    }

    axios.post('https://crudcrud.com/api/9e33043bfcd5490f9416d6a2b5eb93e5/products', obj)
        .then((response) => {
            showUserOnScreen(response.data)
            
        })
        .catch((err) => {
            console.log(err)
        })

    // showUserOnScreen(obj)

}

function showUserOnScreen(obj){
    
    // console.log(obj._id)
    total += parseInt(obj.sp)
    // msg.textContent=total
    document.getElementById('msg').textContent=total

    let parentEl=document.getElementById('ul')
    let childEl=document.createElement('li')
    

    
    
    let del=document.createElement('input')
    del.type='button'
    del.value='Delete'
    
    var delItem = del.onclick=()=>{

        total -= parseInt(obj.sp)
        // msg.textContent=total
        document.getElementById('msg').textContent=total
        // obj.total=obj.total-obj.sp

        axios.delete(`https://crudcrud.com/api/9e33043bfcd5490f9416d6a2b5eb93e5/products/${obj._id}`)
            .then((respone) => {
                parentEl.removeChild(childEl)
            }).catch((err) => {
                console.log(err)
            })
        
    }
    
    childEl.textContent=obj.sp+' | '+obj.product
    parentEl.appendChild(parentEl.appendChild(childEl))

    childEl.appendChild(del)

    
    

}
