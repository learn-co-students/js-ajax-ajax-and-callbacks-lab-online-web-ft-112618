const githubRoot = "https://api.github.com"


function searchRepositories() {
  let searchTerms = document.querySelector('#searchTerms').value.replace(/\s/g, '+')

  $.get(githubRoot + '/search/repositories?q=' + searchTerms, function(response) {
    Handlebars.registerPartial('authorPartial', document.querySelector('#author-partial-template').innerHTML)
    let repoTemplate = Handlebars.compile(document.querySelector('#repository-template').innerHTML)
    $('#results').html(repoTemplate(response.items))
  }).fail(e => displayError())
}

function showCommits(el) {
  let repository = el.dataset.repository
  let owner = el.dataset.owner
  $.get(githubRoot + `/repos/${owner}/${repository}/commits`, function(response) {
    Handlebars.registerPartial('authorPartial', document.querySelector('#author-partial-template').innerHTML)
    let commitsTemplate = Handlebars.compile(document.querySelector('#commits-template').innerHTML)
    $('#details').html(commitsTemplate(response))
  }).fail(e => displayError())
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

$(document).ready(function (){

});
