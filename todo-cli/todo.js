/* eslint-disable no-undef */
const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  function markAsComplete(index) {
    all[index].completed = true;
  }

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.
    let overdueitems = [];
    let todaydate = new Date();
    todaydate = todaydate.toISOString().split("T")[0];
    all.forEach((element) => {
      if (element.dueDate < todaydate) {
        overdueitems.push(element);
      }
    });
    return overdueitems;
  };

  const dueToday = () => {
    let dueToday = [];
    all.map((element) => {
      let todaydate = new Date();
      todaydate = todaydate.toISOString().split("T")[0];
      if (todaydate === element.dueDate) {
        dueToday.push(element);
      }
    });
    return dueToday;
  };

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    let duelateritems = [];
    let todaydate = new Date();
    todaydate = todaydate.toISOString().split("T")[0];
    all.forEach((element) => {
      if (element.dueDate > todaydate) {
        duelateritems.push(element);
      }
    });
    return duelateritems;
  };

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above.

    if (list.lenght === 0) {
      return;
    }

    let StrinArray = [];
    list.map((element) => {
      let tempString = "";
      if (element.completed) {
        let todaydate = new Date();
        todaydate = todaydate.toISOString().split("T")[0];
        if (todaydate === element.dueDate) {
          tempString = `[x] ${element.title} `;
        } else {
          tempString = `[x] ${element.title} ${element.dueDate}`;
        }
      } else {
        let todaydate = new Date();
        todaydate = todaydate.toISOString().split("T")[0];
        if (todaydate === element.dueDate) {
          tempString = `[ ] ${element.title} `;
        } else {
          tempString = `[ ] ${element.title} ${element.dueDate}`;
        }
      }
      StrinArray.push(tempString);
    });
    return StrinArray.join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

module.exports = todoList;
