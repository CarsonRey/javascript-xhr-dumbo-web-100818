//
// function showRepositories(event, data) {
//   //this is set to the XMLHttpRequest object that fired the event
//   console.log(this.responseText);
// }
//
// // The responseText is json that we get from the request. It's an array of information from the response.
//
// function getRepositories(){
//   const req = new XMLHttpRequest();
//   req.addEventListener("load", showRepositories);
//   req.open("GET", "https://api.github.com/users/octocat/repos");
//   req.send();
// }

// why/how are we loading the response text before the actual "GET" request?? Is it because we have the event listener an argument of 'load'? As in once loaded -- or once the request has been opened -- show the response text?


// function showRepositories(event, data) {
//   console.log(this.responseText);
//   let repoList = "<ul>";
//   for (var i = 0; i < this.responseText.length; i++) {
//     repoList += "<li>" + this.responseText[i]["name"] + "</li>";
//   }
//   repoList += "</ul>";
//   document.getElementById("repositories").innerHTML = repoList;
// }

// We're setting a variable equal to a ul tag so we can automate writing html when we load the repositories. We loop over each index of the responseText, grabbing the name of the repo, and nest them in 'li' tags. On each loop, everything being nested in 'li' tags added after the ul tag that we initially defined. In the end, we close the 'ul' tag by adding it the same way we did 'li' tags in the loop.

// Now that we have all of this HTML, we have to put it somewhere, so we get the div that we gave an id of 'repositories' and set it's inner html to the result of this loop.


// function showRepositories(event, data) {
//   var repos = JSON.parse(this.responseText);
//   console.log(repos);
//   const repoList = `<ul>${repos
//     .map(r => "<li>" + r.name + "</li>")
//     .join("")}</ul>`;
//   document.getElementById("repositories").innerHTML = repoList;
// }
//



function getRepositories(){
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", "https://api.github.com/users/octocat/repos");
  req.send();
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r =>
        "<li>" +
        r.name +
        ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}


function getCommits(el) {

  console.log(el);
  console.log(el.dataset);
  // .dataset is a method native to JS and cannot be assigned but will give info about the html element it is prepended by. Usually we tack on an attribute following the 'dataset' keyword to find out information about said said HTML. In HTML, the data we want is prepended by data-[info] and is stored within the opening tag. Multiple word info is displayed like this: data-these-are-words -- and called on like this: HTML.dataset.theseAreWords
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showCommits);
  req.open("GET", "https://api.github.com/repos/octocat/" + name + "/commits");
  req.send();
}

// JSON is just implicitly passed from function to function? As in we don't

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        "<li><strong>" +
        commit.commit.author.name +
        "</strong> - " +
        commit.commit.message +
        "</li>"
    )
    .join("")}</ul>`;
  document.getElementById("commits").innerHTML = commitsList;
}
