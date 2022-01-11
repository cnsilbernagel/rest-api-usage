document.getElementById('add-user-btn').addEventListener('click', function () {
    let inputName = document.getElementById('name').value,
        inputJob = document.getElementById('job').value;

    if (inputName.length > 0) {
        addUser(inputName, inputJob);
    }
});

document.getElementById('search-user-btn').addEventListener('click', function () {
    let inputID = document.getElementById('user-id').value;

    getSingleUser(inputID);
});

const userAPIUrl = 'https://reqres.in/api/users';

/**
 * Usage of GET method.
 * 
 * @param {int} max 
 */
const getUserlist = async (max) => {
    const response = await fetch(userAPIUrl + `?per_page=${max}`);

    const myJson = await response.json();

    let res = myJson.data;

    res.forEach(user => {
        cTemplate(`${user.first_name} ${user.last_name}`, user.email, user.avatar);
    });
}

getUserlist(5);

/**
 * Usage of GET method.
 * 
 * @param {int} id 
 */
const getSingleUser = async (id) => {
    const response = await fetch(userAPIUrl + `/${id}`);

    const myJson = await response.json();
    
    console.log(myJson.data);
} 

/**
 * Usage of POST method.
 * 
 * @param {string} name
 */
const addUser = async (name, job) => {
    let data = {
        name: name,
        job: job
    };

    const response = await fetch(userAPIUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const myJson = await response.json();

    console.log(myJson);
}

/**
 * @param {string} title 
 * @param {string} email 
 * @param {string} image 
 */
 function cTemplate(title, email, image) {
    let mainContainer = document.createElement('div'),
        headlineContainer = document.createElement('div'),
        emailContainer = document.createElement('div'),
        headline = document.createElement('h2'),
        emailLink = document.createElement('a');

    mainContainer.className = 'demo-card-square mdl-card mdl-shadow--2dp';

    headlineContainer.className = 'mdl-card__title mdl-card--expand';
    headlineContainer.style.background = `url(${image}) center right 5% no-repeat #3E4EB8`;
    headline.className = 'mdl-card__title-text';
    headline.textContent = title;

    emailContainer.className = 'mdl-card__actions mdl-card--border';
    emailLink.className = 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect';
    emailLink.textContent = email;
    emailLink.href = `mailto:${email}`;

    emailContainer.appendChild(emailLink);

    headlineContainer.appendChild(headline);
    mainContainer.appendChild(headlineContainer);
    mainContainer.appendChild(emailContainer);


    let root = document.getElementById('userlist');
    root.append(mainContainer);
};
