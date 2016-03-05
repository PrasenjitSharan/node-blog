var articleCounter = 1;

function ArticleProvider() { };

ArticleProvider.prototype.dummyData = [];

ArticleProvider.prototype.findAll = function (callback) {
  callback(null, this.dummyData);
};

ArticleProvider.prototype.findById = function (id, callback) {
  var result = null;

  for (var i = 0; i < this.dummyData.lenght; i++) {
    if (this.dummyData[i]._id === id) {
      result = this.dummyData[i];
      break;
    }
  }

  callback(null, result);
};

ArticleProvider.prototype.save = function (articles, callback) {
  var article = null;

  if (typeof (articles.length) === "undefined") {
    articles = [articles];
  }

  for (var i = 0; i < articles.length; i++) {
    article = articles[i];
    article._id = articleCounter++;
    article.created_at = new Date();

    if (article.comments === undefined) {
      article.comments = [];
    }

    for (var j = 0; j < article.comments.length; j++) {
      article.comments[j].created_at = new Date();
    }

    this.dummyData.push(article);
  }

  callback(null, articles);
}

/* Dummy data */
new ArticleProvider().save([
  {title: 'Post One', body: 'Body one', comments: [{author: 'Bob', comment:
    'Who loves it?'}, {author: 'Dave', comment: 'I do.'}]},
  { title: 'Post Two', body: 'Body Two' },
  { title: 'Post Three', body: 'Body Three' }
], function (error, articles) { });

exports.ArticleProvider = ArticleProvider;