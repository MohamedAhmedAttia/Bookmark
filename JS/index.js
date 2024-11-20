var allBookmarks = [];
if (localStorage.getItem('allBookmarks')) {
    allBookmarks = JSON.parse(localStorage.getItem('allBookmarks'));
    DisplayBookmarks(allBookmarks);
}

var Bookmark_Name = document.getElementById('BookmarkName');
var Bookmark_URL = document.getElementById('BookmarkURL');
var addBtn =document.getElementById('add');
var updateBtn =document.getElementById('update');

function addUrl() {
    var Bookmark = {
        URLName: Bookmark_Name.value,
        URLLink: Bookmark_URL.value,
    };

    if (validation(Bookmark_Name) && validation(Bookmark_URL)) {
        allBookmarks.push(Bookmark);
        localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
        clearData();
        DisplayBookmarks(allBookmarks);
    }
}

function clearData() {
    Bookmark_Name.value = null;
    Bookmark_URL.value = null;
}

function DisplayBookmarks(list) {
    var display = '';
    for (var i = 0; i < list.length; i++) {
        display += `
            <tr class="bg-white font-edu fw-medium">
                <td>${i + 1}</td>
                <td>${list[i].URLName}</td>
                <td><a href="https://${list[i].URLLink}" target="_blank"><button class="btn btn-success"><i class="fa-regular fa-eye"></i> Visit</button></a></td>
                <td> <button class="btn btn-warning " onclick="updateForm(${i})"><i class="fa-solid fa-pen"></i> Update</button></td>
                <td><button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-regular fa-trash-can"></i> Delete</button></td>
            </tr>`;
    }
    document.getElementById('allBookmarks').innerHTML = display;
}

function deleteBookmark(index) {
    allBookmarks.splice(index, 1);
    localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks));
    DisplayBookmarks(allBookmarks);
}

function validation(element) {
    var regex = {
        BookmarkName: /^[a-zA-Z0-9\s]{3,}$/,
        BookmarkURL: /^((http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,}\.(com|net|org|io|gov|edu|info|biz)\b([-a-zA-Z0-9@:%_\+.~#?&=`]*))$/
    };

    if (regex[element.id].test(element.value)) {
        element.nextElementSibling.classList.remove('d-block');
        element.nextElementSibling.classList.add('d-none');
        element.classList.remove('is-invalid');
        element.classList.add('is-valid');
        return true;
    } else {
        element.nextElementSibling.classList.add('d-block');
        element.nextElementSibling.classList.remove('d-none');
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        return false;
    }
}

var updateIndex;
function updateForm(index){
    updateIndex=index;
    Bookmark_Name.value=allBookmarks[index].URLName;
    Bookmark_URL.value=allBookmarks[index].URLLink;
    addBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
}
function update(){    
    var Bookmark={
        name:Bookmark_Name.value,
        URL:Bookmark_URL.value,
    }
    allBookmarks[updateIndex].URLName=Bookmark.name;
    allBookmarks[updateIndex].URLLink=Bookmark.URL;
    localStorage.setItem("allBookmarks", JSON.stringify(allBookmarks))
    DisplayBookmarks(allBookmarks);
    clearData();
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
}