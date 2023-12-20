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
 //this returns overDUe by iterating over the items
    let odList = [];
    let TodayDat = new Date();
    TodayDat = TodayDat.toISOString().split("T")[0];
    all.forEach((element) => {
      if (element.dueDate < TodayDat) {
        odList.push(element);
      }
    });
    return odList;
  };

  const dueToday = () => {

    // this returns the dueToday list by traversin
    let dueTodayArray = [];
    all.map((element) => {
      let tDate = new Date();
      tDate = tDate.toISOString().split("T")[0];
      if (tDate === element.dueDate) {
        dueTodayArray.push(element);
      }
    });
    return dueTodayArray;
  };

  const dueLater = () => {
   // this check the condition and returns by traversing and adding to array
    let duelateritemsArray = [];
    let todaydateTemp = new Date();
    todaydateTemp = todaydateTemp.toISOString().split("T")[0];
    all.forEach((element) => {
      if (element.dueDate > todaydateTemp) {
        duelateritemsArray.push(element);
      }
    });
    return duelateritemsArray;
  };

  const toDisplayableList = (list) => {

    // returns the list in a readble format i.e display
 
    if (list.lenght === 0) {
      return;
    }

    let StrinArrayList = [];
    list.map((element) => {
      let tString = "";
      if (element.completed) {
        let Tdate = new Date();
        Tdate = Tdate.toISOString().split("T")[0];
        if (Tdate === element.dueDate) {
          tString = `[x] ${element.title} `;
        } else {
          tString = `[x] ${element.title} ${element.dueDate}`;
        }
      } else {
        let todaydateTemp = new Date();
        todaydateTemp = todaydateTemp.toISOString().split("T")[0];
        if (todaydateTemp === element.dueDate) {
          tString = `[ ] ${element.title} `;
        } else {
          tString = `[ ] ${element.title} ${element.dueDate}`;
        }
      }
      StrinArrayList.push(tString);
    });
    return StrinArrayList.join("\n");
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
