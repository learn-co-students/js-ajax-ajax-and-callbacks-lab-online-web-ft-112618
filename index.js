$(document).ready(function (){
});

function searchRepositories() {
  const searchTerm = document.getElementById('searchTerms').value
  const url = `https://api.github.com/search/repositories?q=${searchTerm}`
  $.get(url, repos => {
    displayRepositories(repos)
  }).fail(function(error) {
    displayError()
  })
}

function displayRepositories(repos) {
  let repoResults = document.getElementById('results')
  repos.items.forEach((r, i) => {
    repoResults.innerHTML +=
    `<h4>${i+1} ${r.name} </h4>` +
    '<p>' + r.description + '</p>' +
    '<p>' + r.html_url + '</p>' +
    '<p>' + r.owner.login + '</p>' +
    `<a href="${r.html_url}">${r.name}</a><br>` +
    `<a href="#" onclick="showCommits(this)" data-repository="${r.name}" data-owner="${r.owner.login}">Show commits</a></li>`
  })
}

function showCommits(el) {

  const url = `https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`
  $.get(url, commits => {
    displayCommits(commits)
  }).fail(function(error) {
    displayError()
  })

}
function displayCommits(commits) {
  let commitResults = document.getElementById('details')
  for (var i = 0, len = commits.length; i < len; i++) {
    commitResults.innerHTML +=
    `<h4>${i+1} ${commits[i].commit.message} </h4>` +
    '<p>' + commits[i].sha + '</p>' +
    '<p>' + commits[i].author.login + '</p>' +
    `<img src=${commits[i].author.avatar_url} height="32" width="32">`
  }
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}
