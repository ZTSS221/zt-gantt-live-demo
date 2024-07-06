// Import stylesheets
import './style.css';
import 'zt-gantt/public/gantt.css';
import 'zt-gantt/public/gantt.js';
// import 'zt-gantt/public/theme/dark.css';
import { ztGantt } from 'zt-gantt';

(function (w) {
  // Write Javascript code!
  const appDiv = document.getElementById('app');

  let data = [
    { id: 1, text: 'Project 1', parent: 0, progress: 30 },
    {
      id: 2,
      text: 'Task #2',
      start_date: '06-05-2023',
      end_date: '06-05-2023',
      parent: 1,
      progress: 50,
    },
    {
      id: 23,
      text: 'Final Milestone',
      start_date: '06-17-2023',
      end_date: '06-17-2023',
      parent: 1,
      type: 'milestone',
    },
    {
      id: 3,
      text: 'Task #3',
      start_date: '06-06-2023',
      end_date: '06-07-2023',
      parent: 1,
      progress: 60,
    },
    {
      id: 5,
      text: 'SubTask #5',
      start_date: '06-04-2023',
      end_date: '06-06-2023',
      parent: 3,
      progress: 20,
    },
    {
      id: 6,
      text: 'SubTask #6',
      start_date: '06-06-2023',
      end_date: '06-09-2023',
      parent: 3,
      progress: 10,
    },
    {
      id: 7,
      text: 'SubTask #7',
      start_date: '06-08-2023',
      end_date: '06-11-2023',
      parent: 3,
      progress: 50,
    },
    {
      id: 4,
      text: 'Task #4',
      start_date: '06-13-2023',
      end_date: '06-16-2023',
      parent: 1,
      progress: 90,
    },
    { id: 8, text: 'Project 2', parent: 0, progress: 80 },
    {
      id: 12,
      text: 'Task #12',
      start_date: '06-03-2023',
      end_date: '06-05-2023',
      parent: 8,
      progress: 50,
    },
    {
      id: 25,
      text: 'Next Milestone',
      start_date: '06-20-2023',
      end_date: '06-20-2023',
      parent: 8,
      type: 'milestone',
    },
    {
      id: 13,
      text: 'Task #13',
      start_date: '06-04-2023',
      end_date: '06-07-2023',
      parent: 8,
    },
    {
      id: 14,
      text: 'Task #14',
      start_date: '06-05-2023',
      end_date: '06-09-2023',
      parent: 8,
    },
    {
      id: 15,
      text: 'Task #15',
      start_date: '06-07-2023',
      end_date: '06-08-2023',
      parent: 8,
    },
    { id: 9, text: 'Project 3', parent: 0, progress: 10 },
    {
      id: 16,
      text: 'Task #16',
      start_date: '06-05-2023',
      end_date: '06-09-2023',
      parent: 9,
    },
    {
      id: 17,
      text: 'Task #17',
      start_date: '06-06-2023',
      end_date: '06-08-2023',
      parent: 9,
    },
    { id: 10, text: 'Project 4', parent: 0, progress: 40 },
    {
      id: 18,
      text: 'Task #18',
      start_date: '06-08-2023',
      end_date: '06-16-2023',
      parent: 10,
    },
    {
      id: 19,
      text: 'Task #19',
      start_date: '06-02-2023',
      end_date: '06-09-2023',
      parent: 10,
    },
    {
      id: 20,
      text: 'Task #20',
      start_date: '06-11-2023',
      end_date: '06-13-2023',
      parent: 10,
    },
    { id: 11, text: 'Project 5', parent: 0, progress: 100 },
    {
      id: 21,
      text: 'Task #21',
      start_date: '06-04-2023',
      end_date: '06-10-2023',
      parent: 11,
    },
    {
      id: 22,
      text: 'Task #22',
      start_date: '06-06-2023',
      end_date: '06-12-2023',
      parent: 11,
    },
  ];

  let ZT_Gantt = new ztGantt(appDiv);

  ZT_Gantt.options.columns = [
    {
      name: 'text',
      width: 245,
      min_width: 80,
      max_width: 300,
      tree: true,
      label: 'Task Name',
      resize: true,
      template: (task) => {
        return `<span>${task.text}</span>`;
      },
    },
    {
      name: 'progress',
      width: 245,
      min_width: 80,
      max_width: 300,
      tree: false,
      label: 'Progress',
      resize: true,
      align: 'center',
      template: (task) => {
        return `<span>${task.progress || 0}</span>`;
      },
    },
  ];

  ZT_Gantt.options.date_format = '%m-%d-%Y';
  ZT_Gantt.options.localLang = 'en';
  ZT_Gantt.options.data = data;
  ZT_Gantt.options.collapse = false;
  ZT_Gantt.options.weekends = ['Sat', 'Sun'];
  ZT_Gantt.options.fullWeek = true;
  ZT_Gantt.options.todayMarker = true;
  ZT_Gantt.options.addLinks = true;
  ZT_Gantt.options.taskColor = true;
  ZT_Gantt.options.links = [
    { id: 1, source: 2, target: 23, type: 1 },
    { id: 2, source: 3, target: 6, type: 2 },
    { id: 3, source: 4, target: 23, type: 3 },
    { id: 4, source: 12, target: 15 },
  ];
  ZT_Gantt.options.weekStart = 1; // set the start of the week
  ZT_Gantt.options.sidebarWidth = 300;
  ZT_Gantt.options.scales = [
    {
      unit: 'week',
      step: 1,
      format: (t) => {
        const { startDate: a, endDate: n, weekNum: i } = weekStartAndEnd(t);
        return ` ${ZT_Gantt.formatDateToString(
          '%j %M',
          a
        )} - ${ZT_Gantt.formatDateToString('%j %M', n)}, ${a.getFullYear()}`;
      },
    },
    { unit: 'day', step: 1, format: '%d %D' },
  ];

  ZT_Gantt.options.zoomLevel = 'day';

  // zoom config
  ZT_Gantt.options.zoomConfig = {
    levels: [
      {
        name: 'hour',
        scale_height: 27,
        min_col_width: 550,
        scales: [
          { unit: 'day', step: 1, format: '%d %M' },
          { unit: 'hour', step: 1, format: '%H' },
        ],
      },
      {
        name: 'day',
        scale_height: 27,
        min_col_width: 80,
        scales: [
          { unit: 'week', step: 1, format: '%W' },
          { unit: 'day', step: 1, format: '%d %M' },
        ],
      },
      {
        name: 'week',
        scale_height: 45,
        min_col_width: 50,
        scales: [
          { unit: 'month', step: 1, format: '%M' },
          {
            unit: 'week',
            step: 1,
            format: (t) => {
              const {
                startDate: a,
                endDate: n,
                weekNum: i,
              } = weekStartAndEnd(t);
              return ` ${ZT_Gantt.formatDateToString(
                '%j %M',
                a
              )} - ${ZT_Gantt.formatDateToString(
                '%j %M',
                n
              )}, ${a.getFullYear()}`;
            },
          },
        ],
      },
      {
        name: 'month',
        scale_height: 30,
        min_col_width: 120,
        scales: [
          { unit: 'year', step: 1, format: '%Y' },
          { unit: 'month', step: 1, format: '%M' },
        ],
      },
      {
        name: 'quarter',
        scale_height: 25,
        min_col_width: 90,
        scales: [
          { unit: 'year', step: 1, format: '%Y' },
          { unit: 'quarter', step: 1, format: 'Q%q' },
          { unit: 'month', format: '%M' },
        ],
      },
      {
        name: 'year',
        scale_height: 30,
        min_col_width: 30,
        scales: [
          { unit: 'year', step: 3, format: '2022 - 2024' },
          { unit: 'year', step: 1, format: '%Y' },
        ],
      },
    ],
  };

  ZT_Gantt.options.scale_height = 30;
  ZT_Gantt.options.row_height = 24;
  ZT_Gantt.options.minColWidth = 80;
  ZT_Gantt.options.addTaskOnDrag = true;
  ZT_Gantt.options.taskProgress = true;

  // Gantt layout to implement columns in right side
  // ZT_Gantt.options.rightGrid = [
  // {
  //     name: "text",
  //     width: 245,
  //     min_width: 80,
  //     max_width: 300,
  //     tree: true,
  //     label: "Task Name",
  //     resize: true,
  //     template: (task) => {
  //       return `<span>${task.text}</span>`;
  //     },
  //   },
  // ];

  function weekStartAndEnd(t) {
    const e = t.getDay();
    let a, n;
    0 === e
      ? ((a = ZT_Gantt.add(t, -6, 'day')), (n = t))
      : ((a = ZT_Gantt.add(t, -1 * e + 1, 'day')),
        (n = ZT_Gantt.add(t, 7 - e, 'day')));
    return {
      startDate: a,
      endDate: n,
      weekNum: ZT_Gantt.formatDateToString('%W', t),
    };
  }

  ZT_Gantt.options.startDate = '2023-06-01T11:46:17.775Z';
  ZT_Gantt.options.endDate = '2023-06-30T11:46:17.775Z';

  ZT_Gantt.templates.tooltip_text = function (start, end, task) {
    return `<b>${task.parent === 0 ? 'Project' : 'Task'}:</b>
      ${task.text}
      <br/><b>Start date:</b>
      ${ZT_Gantt.formatDateToString('%d-%m-%y %H:%i', start)}
      <br/><b>End date:</b>
      ${ZT_Gantt.formatDateToString('%d-%m-%y %H:%i', end)}<br/>
      <b>Duration:</b> ${task.duration} ${task.duration > 1 ? 'Days' : 'Day'}`;
  };

  ZT_Gantt.templates.taskbar_text = function (start, end, task) {
    if (task.parent == 0) {
      return `Project : ${task.text}`;
    } else if (task.type === 'milestone') {
      return task.text;
    } else {
      return `Task : ${task.text}`;
    }
  };

  ZT_Gantt.templates.grid_folder = (task) => {
    var name = task?.text?.trim().split(' ');
    var firstname = name?.[0];
    var lastname = name?.[1] ? name?.[1] : '';
    var intials =
      firstname?.charAt(0)?.toUpperCase() + lastname?.charAt(0)?.toUpperCase();
    return `<div></div>`;
  };

  ZT_Gantt.templates.grid_file = (task) => {
    if (task.parent != 0) {
      var tracker_name = task.hasOwnProperty('tracker')
        ? task.tracker.name
        : ' ';
      let issue_id = task.id;
      return `<div class='gantt_file ${tracker_name}'><a  class="link-issue ${tracker_name}" href='http://127.0.0.1:5500//issues/${issue_id}'>#${issue_id}</a></div>`;
    }
  };

  ZT_Gantt.templates.task_drag = (mode, task) => {
    if (task.parent == 0 || (task.children && task.children.length > 0)) {
      // || task.children
      return false;
    }
    return true;
  };

  // add custom classes
  // ZT_Gantt.templates.grid_header_class = (columns,i) => {
  //   return "my-header-class test"
  // }
  // ZT_Gantt.templates.grid_row_class = (start, end, task) => {
  //   console.log(start, end);
  //   return "my-grid-row-class test"
  // }
  ZT_Gantt.templates.task_class = (start, end, task) => {
    if (task.parent == 0) {
      return 'parent-task';
    } else {
      return 'child-task';
    }
  };
  // ZT_Gantt.templates.task_row_class = (start, end, task) => {
  //   return "my-task-row-class test"
  // }
  ZT_Gantt.templates.scale_cell_class = (date, scale, scaleIndex) => {
    if (scaleIndex === 1) {
      return 'my-scale-class-2';
    } else {
      return '';
    }
  };
  // ZT_Gantt.templates.grid_cell_class = (col, task) => {
  //   return "my-grid-cell-class test"
  // }
  // ZT_Gantt.templates.timeline_cell_class = (task, date) => {
  //   return "my-task-cell-class  Test  "
  // }

  // add custom marker
  ZT_Gantt.addMarker({
    start_date: ZT_Gantt.add(new Date(), 1, 'day'), //a Date object that sets the marker's date
    css: 'tomorrow', //a CSS class applied to the marker
    text: 'Tomorrow', //the marker title
    title: ZT_Gantt.formatDateToString(
      '%d %M %y',
      ZT_Gantt.add(new Date(), 1, 'day')
    ), // the marker's tooltip
  });

  // render gantt
  ZT_Gantt.render();

  const ztGanttTheme = localStorage.getItem('ztGantt-theme');

  // console.log(ZT_Gantt);

  // to find task in gantt
  // console.log(ZT_Gantt.getTask(69));

  // custom events
  ZT_Gantt.attachEvent('onTaskDblClick', (event) => {
    // console.log("onTaskDblClick: ", event);
  });
  let idCount = 0;
  ZT_Gantt.attachEvent('addTaskOnDrag', (event) => {
    // console.log("addTaskOnDrag: ", event.task);
    ZT_Gantt.addTask({
      id: 'Added' + idCount,
      start_date: new Date(event.task.startDate),
      end_date: new Date(event.task.endDate),
      parent: event.task.parent,
      text: 'Task Added',
    });
    ZT_Gantt.render();
    idCount += 1;
  });
  ZT_Gantt.attachEvent('onLinkDblClick', (event) => {
    // console.log("onLinkDblClick: ", event);
  });
  ZT_Gantt.attachEvent('onBeforeLinkAdd', (event) => {
    // console.log("onBeforeLinkAdd: ", event);
  });
  ZT_Gantt.attachEvent('onLinkAdd', (event) => {
    // console.log("onLinkAdd: ", event);
  });
  ZT_Gantt.attachEvent('onDeleteLink', (event) => {
    // console.log("onDeleteLink: ", event);
  });
  ZT_Gantt.attachEvent('onBeforeTaskDrag', (event) => {
    // console.log("onBeforeTaskDrag: ", event);
    if (event.task.children.length !== 0) {
      return false;
    } else {
      return true;
    }
  });
  ZT_Gantt.attachEvent('onTaskDrag', (event) => {
    // console.log("onTaskDrag: ", event);
  });
  ZT_Gantt.attachEvent('onAfterTaskDrag', (event) => {
    // console.log("onAfterTaskDrag: ", event);
  });
  ZT_Gantt.attachEvent('onBeforeTaskDrop', (event) => {
    // console.log("onBeforeTaskDrop: ", event);
    if (event.parentTask.id == 12) {
      return false;
    }
  });
  ZT_Gantt.attachEvent('onTaskDelete', (event) => {
    // console.log("onTaskDelete: ", event);
  });
  ZT_Gantt.attachEvent('onAfterTaskUpdate', (event) => {
    // console.log("onAfterTaskUpdate: ", event);
  });
  ZT_Gantt.attachEvent('onCellClick', (event) => {
    // console.log("onCellClick: ", event);
  });
  ZT_Gantt.attachEvent('onExpand', (event) => {
    // console.log("onExpand: ", event);
  });
  ZT_Gantt.attachEvent('onCollapse', (event) => {
    // console.log("onCollapse: ", event);
  });
  // ZT_Gantt.attachEvent("onScroll", (event) => {
  //   console.log("onScroll: ", event);
  // });
  // ZT_Gantt.attachEvent("onResize", (event) => {
  //   console.log("onResize: ", event);
  // });
  ZT_Gantt.attachEvent('onAfterProgressDrag', (event) => {
    // console.log("onAfterProgressDrag: ", event);
  });
  ZT_Gantt.attachEvent('onBeforeProgressDrag', (event) => {
    // console.log("onBeforeProgressDrag: ", event);
    // if(event.task.parent === 0){
    //   return false;
    // }else{
    //   return true;
    // }
  });
  ZT_Gantt.attachEvent('onAutoScheduling', (event) => {
    // console.log("onAutoScheduling: ", event);
  });
  ZT_Gantt.attachEvent('onColorChange', (event) => {
    // console.log("onColorChange: ", event);
  });

  let fullscreen = false;
  function changeScreen() {
    if (fullscreen === false) {
      ZT_Gantt.requestFullScreen();
      // ZT_Gantt.openTask(3);
    } else {
      ZT_Gantt.exitFullScreen();
    }
  }

  function changeZoom(e) {
    ZT_Gantt.options.zoomLevel = e.target.value;
    if (e.target.value === 'month' || e.target.value === 'quarter') {
      ZT_Gantt.options.startDate = '2023-05-01T11:46:17.775Z';
      ZT_Gantt.options.endDate = '2023-07-31T11:46:17.775Z';
    } else if (e.target.value === 'year') {
      ZT_Gantt.options.startDate = '2022-01-01T11:46:17.775Z';
      ZT_Gantt.options.endDate = '2024-12-31T11:46:17.775Z';
    } else {
      ZT_Gantt.options.startDate = '2023-06-01T11:46:17.775Z';
      ZT_Gantt.options.endDate = '2023-06-30T11:46:17.775Z';
    }
    ZT_Gantt.zoomInit();
    ZT_Gantt.render();
  }

  function changeLang(e) {
    ZT_Gantt.setLocalLang(e.target.value);
  }

  function changeCollapse(e) {
    if (e.target.checked === true) {
      ZT_Gantt.collapseAll();
    } else {
      ZT_Gantt.expandAll();
    }
  }

  function changeToday(e) {
    if (event.target.checked === true) {
      ZT_Gantt.addTodayFlag();
    } else {
      ZT_Gantt.removeTodayFlag();
    }
  }

  function exportChange(e) {
    if (e.target.value === 'png') {
      ZT_Gantt.exportToPNG('ztGanttChart');
    } else if (e.target.value === 'pdf') {
      ZT_Gantt.exportToPDF('ztGanttChart');
    } else {
      ZT_Gantt.exportToExcel('ztGanttChart');
    }
  }

  function autoScheduling() {
    ZT_Gantt.autoScheduling();
  }

  let cssStyle;

  function changeTheme(isDark) {
    const root = document.querySelector(':root');
    if (isDark) {
      document.getElementById('toggle').checked = true;
      cssStyle = document.createElement('link');
      cssStyle.setAttribute('rel', 'stylesheet');
      cssStyle.setAttribute('href', 'zt-gantt/public/theme/dark.css');
      document.getElementsByTagName('head')[0].append(cssStyle);
      localStorage.setItem('ztGantt-theme', 'dark');

      root.style.setProperty('--bg-color', '#333332');
      root.style.setProperty('--text-color', '#fff');
      root.style.setProperty('--text-secondary-color', '#fff');
      root.style.setProperty('--index-primary-color', '#1395BE');
      root.style.setProperty('--index-primary-hover-color', '#0E7595');
    } else {
      if (cssStyle) {
        cssStyle.remove();
      }
      root.style.setProperty('--bg-color', '#fff');
      root.style.setProperty('--text-color', '#000');
      root.style.setProperty('--text-secondary-color', '#fff');
      root.style.setProperty('--index-primary-color', '#4ca0fff2');
      root.style.setProperty('--index-primary-hover-color', '#3585e0f2');
      localStorage.setItem('ztGantt-theme', 'light');
    }
  }

  changeTheme(ztGanttTheme == 'dark');

  function searchTask(e) {
    let isFilter = e.target.value.trim() !== '';
    ZT_Gantt.filterTask((task) => {
      return task.text.toLowerCase().includes(e.target.value.toLowerCase());
    }, isFilter);
  }
  (w.searchTask = searchTask),
    (w.changeTheme = changeTheme),
    (w.autoScheduling = autoScheduling),
    (w.exportChange = exportChange),
    (w.changeToday = changeToday),
    (w.changeCollapse = changeCollapse),
    (w.changeLang = changeLang),
    (w.changeZoom = changeZoom),
    (w.changeScreen = changeScreen);
})(window);
