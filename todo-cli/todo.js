let allList = [];
const formattedDateFunction = (d) => {
  return d.toISOString().split("T")[0];
};
const todoList = () => {
  allList = [];
  let today = new Date();
  today = formattedDateFunction(today).split("-");
  let tdyear = today[0];
  let tdmonth = today[1];
  let tdday = today[2];
  const add = (todoItem) => {
    allList.push(todoItem);
  };
  const markAsComplete = (index) => {
    allList[index].completed = true;
  };
  const overdue = () => {
    const overdueresult = allList.filter((data) => {
      let date = data.dueDate.split("-");
      let y = date[0];
      let m = date[1];
      let d = date[2];

      if (tdyear > y) {
        return data;
      } else if (tdyear == y) {
        if (tdmonth > m) {
          return data;
        } else if (tdmonth == m) {
          if (tdday > d) {
            return data;
          }
        }
      }
    });
    return overdueresult;
  };

  const dueToday = () => {
    const duetodayresult = allList.filter((data) => {
      let date = data.dueDate.split("-");
      let y = date[0];
      let m = date[1];
      let d = date[2];

      if (tdyear == y && tdmonth == m && tdday == d) return data;
    });
    return duetodayresult;
  };

  const dueLater = () => {
    const laterdueresult = allList.filter((data) => {
      let date = data.dueDate.split("-");
      let y = date[0];
      let m = date[1];
      let d = date[2];

      if (tdyear < y) {
        return data;
      } else if (tdyear == y) {
        if (tdmonth < m) {
          return data;
        } else if (tdmonth == m) {
          if (tdday < d) {
            return data;
          }
        }
      }
    });
    return laterdueresult;
  };

  const toDisplayableList = (list) => {
    let data = list.map((item) => {
      let itemdate = item.dueDate.split("-");

      if (
        itemdate[0] == tdyear &&
        itemdate[1] == tdmonth &&
        itemdate[2] == tdday
      ) {
        if (item.completed) {
          return "[x]" + " " + item.title;
        } else {
          return "[ ]" + " " + item.title;
        }
      } else {
        if (item.completed) {
          return "[X]" + " " + item.title + " " + item.dueDate;
        } else {
          return "[ ]" + " " + item.title + " " + item.dueDate;
        }
      }
    });

    return data.join("\n");
  };

  return {
    allList,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};

module.exports = todoList;

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

const todos = todoList();

var dateToday = new Date();
const today = formattedDateFunction(dateToday);
const yesterday = formattedDateFunction(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDateFunction(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todos.overdue();
var formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");

module.exports = todoList;

// const todoList = () => {
//     allList = []
//     const add = (todoItem) => {
//       allList.push(todoItem)
//     }
//     const markAsComplete = (index) => {
//       allList[index].completed = true
//     }

//     const overdue = () => {
//         const today = new Date().toISOString().split("T")[0];
//     return allList.filter((item) => !item.completed && item.dueDate < today);
//       // Write the date check condition here and return the array
//       // of overdue items accordingly.
//     }

//     const dueToday = () => {
//         const today = new Date().toISOString().split("T")[0];
//         return allList.filter((item) => item.dueDate === today);
//       // Write the date check condition here and return the array
//       // of todo items that are due today accordingly.
//     }

//     const dueLater = () => {
//         const today = new Date().toISOString().split("T")[0];
//     return allList.filter((item) => !item.completed && item.dueDate > today);
//       // Write the date check condition here and return the array
//       // of todo items that are due later accordingly.
//     }

//     const toDisplayableList = (list) => {
//         return list
//         .map((item, index) => {
//           const dueText = item.dueDate
//             ? item.dueDate === today
//               ? "" // For tasks due today, don't include the date
//               : ` ${item.dueDate}`
//             : "";
//           const completionStatus = item.completed ? "[x]" : "[ ]";
//           return `${completionStatus} ${item.title}${dueText}`;
//         })
//         .join("\n");

//       // Format the To-Do list here, and return the output string
//       // as per the format given above.
//     }

//     return {
//       allList,
//       add,
//       markAsComplete,
//       overdue,
//       dueToday,
//       dueLater,
//       toDisplayableList
//     };
//   };

//  module.exports = todoList;
