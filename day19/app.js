//get element

const skill_list = document.querySelector('#skill-list');
const add_form = document.querySelector('#devs_add_form');
const edit_form = document.querySelector('#devs_edit_form');
const devs_list = document.querySelector('#devs_list');


loadingSkill();

function loadingSkill() {

    axios.get('http://localhost:6131/skill').then(data => {

        let skill_text = '';
        data.data.map(skills => {
            skill_text += `
      <option value="${skills.id}">${skills.name}</option> 
      
      `;

        });
        skill_list.insertAdjacentHTML('beforeend', skill_text);
    });
};

/**
 * load all devs data
 * 
 */

skillLoad();

function skillLoad() {
    axios.get('http://localhost:6131/developer').then(res => {

        let skill_data = ''
        res.data.map((dev, index) => {
            skill_data += `
        <tr>
        <td>${ index + 1}</td>
        <td>${ dev.name }</td>
        <td>${ dev.id }</td>
        <td>${displaySkill(dev.skillId)}</td>
        <td>${ dev.gender }</td>
        <td>${ dev.location }</td>
        <td><img style="width:40px;height:40px;object-fit:cover;"
                src="${ dev.photo }"
                alt=""></td>
        <td>
            <a href="#dev_view-data" data-bs-toggle="modal" onclick="viewData(${dev.id})" class="btn btn-info btn-sm"><i
                    class="fa fa-eye"></i></a>
            <a href="#dev_edit_data" onclick="devsDataLoader(${dev.id})" data-bs-toggle="modal"
                class="btn btn-warning btn-sm"><i class="fa fa-pencil-square"></i></a>
            <a href="#dev_delete_data" data-bs-toggle="modal" onclick="devs_data_api(${dev.id})" class="btn btn-danger btn-sm" "><i class="fa fa-trash"></i></a>
        </td>
        
        </tr>
        `
        });

        devs_list.innerHTML = skill_data;
    });

}



const main_view = document.querySelector('#main_view');
const new_devs = document.querySelector('.new-devs');
const cls_btn = document.querySelector('#cls_btn');


main_view.addEventListener('click' , function(){
 new_devs.classList.add('active');
});
cls_btn.addEventListener('click' , function(){
 new_devs.classList.remove('active');
});


/**
 * add new devs
 */

add_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = this.querySelector('#name');
    let email = this.querySelector('#email');
    let phone = this.querySelector('#phone');
    let location = this.querySelector('#location');
    let photo = this.querySelector('#photo');
    let skill = this.querySelector('#skill-list');
    let gender = this.querySelector('input[type="radio"]:checked');


    if (name.value == '' || email.value == '' || phone.value == '' || location.value == '' || skill.value == '') {
        alert('All Fields are required !')
    } else {

        axios.post('http://localhost:6131/developer', {
            id: "",
            name: name.value,
            phone: phone.value,
            email: email.value,
            location: location.value,
            photo: photo.value,
            skillId: skill.value,
            gender: gender.value,
        }).then(res => {
            name.value = '';
            phone.value = '';
            email.value = '';
            location.value = '';
            photo.value = '';
            skill.value = '';
            gender.value = '';
            email.value = '';

            skillLoad();

        });
    }

});


/**
 * view dev data
 */

// get elements
const modal_v = document.querySelector('#modal_view');

function viewData(id) {

    axios.get('http://localhost:6131/developer/' + id).then(res => {

        modal_v.innerHTML = `
        <div class="modal-title">
        <h2 class="text-center text-info">View dev's Profile data</h2>
        <div class="devs-data-full">
            <img style="width: 150px;height: 150px; object-fit: cover; margin-bottom:30px; display:block; margin: auto; border-radius:50%; box-shadow: 0px 5px 4px rgba(0,0,0,.5); border: 4px solid #ddd;" src="${res.data.photo}" alt="">
          <div class="row text-center table table-striped">
              <div class="col-md-6">
                  <h4>Id : </h4>
                  <h4>Name :</h4>
                  <h4>Email :</h4>
                  <h4>Skill :</h4>
                  <h4>Location :</h4>
                  <h4>Gender :</h4>
              </div>
              <div class="col-md-6">
                <h5>${res.data.id}</h5>
                <h5>${res.data.name}</h5>
                <h5>${res.data.email}</h5>
                <h5>${displaySkill(res.data.skillId)}</h5>
                <h5>${res.data.location}</h5>
                <h5>${res.data.gender}</h5>
              </div>
          </div>
            
        </div>
    </div>
        
`
    })

}



/**
 *  devs data delete
 * @param {*} id 
 * 
 */
//get elements


let devs_del = document.querySelector('#devs_del');




let dataId ;
function devs_data_api(id){
    dataId = id;
};

function delete_data_object(){

    axios.delete('http://localhost:6131/developer/' + dataId).then( res => {
        skillLoad();
    })
}


/**
 * edit devs data
 * @param {*} id 
 */

// get elements
function devsDataLoader(id) {

    let name = document.getElementById('ename');
    let email = document.getElementById('eemail');
    let phone = document.getElementById('ephone');
    let location = document.getElementById('elocation');
    let photo = document.getElementById('ephoto');
    let skilled = document.getElementById('eskill-list');
    let preview = document.getElementById('epreview');
    let edit_id = document.querySelector('#edit_id');


    axios.get(`http://localhost:6131/developer/${id}`).then(res => {
        name.value = res.data.name;
        email.value = res.data.email;
        phone.value = res.data.phone;
        location.value = res.data.location;
        photo.value = res.data.photo;
        edit_id.value = id;
        preview.setAttribute('src', res.data.photo)
        axios.get('http://localhost:6131/skill').then(data => {


        let skill_abc = '';
        data.data.map((skills) => {
            skill_abc += `
        <option value="${skills.id}">${skills.name}</option> 
  
       `;

        });
        skilled.insertAdjacentHTML('beforeend', skill_abc);
    });

       

    });
    
}




/**
 * send data after edit
 */

edit_form.addEventListener('submit', function (e) {
    e.preventDefault();

    let name = this.querySelector('#ename');
    let email = this.querySelector('#eemail');
    let phone = this.querySelector('#ephone');
    let location = this.querySelector('#elocation');
    let photo = this.querySelector('#ephoto');
    let edit_id = this.querySelector('#edit_id');
    let skill_editor = this.querySelector('#eskill-list');
    let gender = this.querySelector('input[type="radio"]:checked');

    console.log(skill_editor);


    axios.put(`http://localhost:6131/developer/${edit_id.value}`, {

        id: "",
        name: name.value,
        phone: phone.value,
        email: email.value,
        location: location.value,
        photo: photo.value,
        skillId: skill_editor.value,
        gender: gender.value,

    }).then(res => {
        name.value = '';
        phone.value = '';
        email.value = '';
        location.value = '';
        photo.value = '';
        skill_editor.value = '';
        gender.value = '';
        skillLoad();
    });

});