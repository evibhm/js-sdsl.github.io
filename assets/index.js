(function (window) {
  const editOnGithubWhiteList = ['README', 'benchmark', 'performance'];
  function getDocsifyConfig() {
    return {
      el: '#root',
      name: 'Js-sdsl',
      nameLink: {
        '/zh-cn/': '#/zh-cn/',
        '/': '#/',
      },
      maxLevel: 4,
      subMaxLevel: 2,
      auto2top: true,
      loadNavbar: true,
      autoHeader: true,
      mergeNavbar: true,
      loadSidebar: true,
      coverpage: ['/zh-cn/', '/'],
      logo: '/assets/logo-small.png',
      count: {
        countable: true,
        fontsize: '1em',
        color: 'rgb(90, 90, 90)'
      },
      pagination: {
        previousText: {
          '/zh-cn/': '上一章节',
          '/': 'Pre',
        },
        nextText: {
          '/zh-cn/': '下一章节',
          '/': 'Next',
        },
        crossChapter: true,
        crossChapterText: true,
      },
      alias: {
        '.*?/test/benchmark-result': '//js-sdsl.github.io/benchmark/README.md',
        '.*?/test/performance-test': '//js-sdsl.github.io/js-sdsl/performance.md',
        '.*?/zh-cn/test/benchmark-analyze': '//js-sdsl.github.io/benchmark/resultAnalyze.zh-CN.md',
        '.*?/test/benchmark-analyze': '//js-sdsl.github.io/benchmark/resultAnalyze.md',
        '.*?/zh-cn/README': '//js-sdsl.github.io/js-sdsl/README.zh-CN.md',
        '.*?/README': '//js-sdsl.github.io/js-sdsl/README.md',
        '.*?/zh-cn/_sidebar.md': '/zh-cn/_sidebar.md',
        '.*?/zh-cn/.*/_sidebar.md': '/zh-cn/_sidebar.md',
        '.*?/_navbar.md': '/_navbar.md',
        '.*?/_sidebar.md': '/_sidebar.md',
      },
      plugins: [
        EditOnGithubPlugin.create(
          'https://github.com/js-sdsl/js-sdsl.github.io/blob/main/',
          null,
          function (file) {
            if (editOnGithubWhiteList.some(function (str) {
              return file.indexOf(str) >= 0;
            })) {
              return '';
            } else if (file.indexOf('zh-cn') >= 0) {
              return '在 github 上编辑此页';
            } else {
              return 'Edit on github';
            }
          })
      ],
      search: {
        paths: 'auto',
        placeholder: {
          '/zh-cn/': '搜索',
          '/': 'Type to search',
        },
        noData: {
          '/zh-cn/': '找不到结果',
          '/': 'No Results',
        },
        depth: 3,
        pathNamespaces: ['/zh-cn'],
      },
      markdown: {
        renderer: {
          code: function (code, lang) {
            if (lang === 'tex') {
              return `<span class='tex'>
                        ${katex.renderToString(code)}
                      </span>`;
            }
            return this.origin.code.apply(this, arguments);
          }
        }
      },
      timeUpdater: {
        text: '<p align="right">last update time: <strong>{docsify-updated}</strong></p>',
        formatUpdated: '{YYYY}-{MM}-{DD}',
        whereToPlace: 'top',
      },
      repo: 'https://github.com/js-sdsl/js-sdsl'
    }
  }
  function changeSectionSize() {
    const minWidth = 400;
    const width = window.screen.width;
    if (width <= minWidth) {
      const zoom = width / minWidth;
      const style = document.createElement('style');
      style.innerHTML =
        `section.cover > * {
          zoom: ${zoom};
        }`;
      document.head.appendChild(style);
    }
  }
  function onUrlHashChange() {
    const urlHash = window.location.hash;
    let lang = urlHash.includes('zh-cn') ? 'zh-cn' : 'en';
    document.documentElement.setAttribute('lang', lang);
    const tableStyle = document.getElementById('table-style');
    if (urlHash.includes('performance')) {
      tableStyle.innerHTML =
        `.markdown-section table {
            display: table;
            text-align: center;
            table-layout: fixed;
          }`;
    } else {
      tableStyle.innerHTML = '';
    }
    const coverpages = window.$docsify.coverpage;
    const mathResult = coverpages.some(
      page => urlHash === `#${page}`
    );
    const mainStyle = document.getElementById('main-style');
    if (mathResult) {
      mainStyle.innerHTML =
        `body > main {
          display: none;
        }`;
    } else {
      mainStyle.innerHTML = '';
    }
  }
  changeSectionSize();
  window.$docsify = getDocsifyConfig();
  onUrlHashChange();
  window.onhashchange = onUrlHashChange;
})(window);
