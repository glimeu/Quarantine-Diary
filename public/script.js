/* eslint-disable quote-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
$(document).ready(async () => {
  feather.replace();

  $('button#continue').on('click', () => {
    $('div#information').css('display', 'none');
  });

  const url = 'http://192.168.0.108:3333/api';

  class Comments {
    constructor(baseURL) {
      this.currentPage = 1;
      this.totalPages = NaN;
      this.comments = [];
      this.baseURL = baseURL;
    }

    async load(page) {
      const result = await fetch(`${this.baseURL}/comments?page=${(page || 1)}`,
        { method: 'GET' })
        .then((response) => response.json());

      result.docs.map((doc) => {
        this.comments.push(doc);
      });
      this.currentPage = Number(result.page);
      this.totalPages = result.pages;

      return result.docs;
    }

    async show() {
      await this.load();

      const commentsElement = $('ul#comments');
      this.comments.map((comment) => {
        const html = commentsElement.html();
        commentsElement.html(`${html}<li id="${comment._id}" class="comment"><h2>${comment.user}</h2><p>${comment.message}</p><span>#${comment.commentId}</span></li>`);
      });

      const btnMore = $('button#load-more');

      if (this.currentPage === this.totalPages) {
        btnMore.css('display', 'none');
      }
    }

    async loadMore() {
      let newComments;
      if (this.currentPage !== this.totalPages) {
        newComments = await this.load(this.currentPage + 1);
      }

      const commentsElement = $('ul#comments');
      newComments.map((comment) => {
        const html = commentsElement.html();
        commentsElement.html(`${html}<li id="${comment._id}" class="comment"><h2>${comment.user}</h2><p>${comment.message}</p><span>#${comment.commentId}</span></li>`);
      });

      const btnMore = $('button#load-more');

      if (this.currentPage === this.totalPages) {
        btnMore.css('display', 'none');
      }
    }

    async showNew(comment) {
      const newComment = await fetch(`${this.baseURL}/comments`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment),
        })
        .then((response) => response.json());

      const commentsElement = $('ul#comments');
      const html = commentsElement.html();
      commentsElement.html(`${html}<li id="${newComment._id}" class="comment"><h2>${newComment.user}</h2><p>${newComment.message}</p><span>#${newComment.commentId}</span></li>`);

      return true;
    }
  }

  comments = new Comments(url);
  comments.show();

  $('button#load-more').on('click', () => {
    comments.loadMore();
  });

  /* Comment Area */

  const divElem = $('div.write-area');
  const xElem = $('div.wirte-area form i#x');
  globalThis.opened = false;

  divElem.on('click', (e) => {
    if (e.target.id === 'x' && opened) {
      divElem.toggleClass('open');
      opened = false;
    } else if (e.target.id !== 'x' && opened) {
      /* Não fazer nd */
    } else {
      divElem.toggleClass('open');
      opened = true;
    }
  });

  const formBtnElem = $('div.write-area form button');
  const inputElem = $('div.write-area form input');
  const textElem = $('div.write-area form textarea');

  formBtnElem.on('click', async (e) => {
    e.preventDefault();

    const newComment = {
      user: inputElem.val(),
      message: textElem.val(),
    };

    inputElem.val('');
    textElem.val('');

    formBtnElem.prop('disabled', true);
    formBtnElem.prop('disabled', await comments.showNew(newComment));
  });
});
