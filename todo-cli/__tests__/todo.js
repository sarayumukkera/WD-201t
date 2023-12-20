const todoModule = require("../todo");

const {
  getAllTodos,
  markTodoAsComplete,
  addNewTodo,
  getOverdueTodos,
  getDueTodayTodos,
  getDueLaterTodos,
  formatTodoListForDisplay,
} = todoModule();

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    addNewTodo({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA"),
    });
  });

  test("Should add a new todo", () => {
    const initialTodoCount = getAllTodos().length;
    addNewTodo({
      title: "Test Todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA"),
    });
    expect(getAllTodos().length).toBe(initialTodoCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(getAllTodos()[0].completed).toBe(false);
    markTodoAsComplete(0);
    expect(getAllTodos()[0].completed).toBe(true);
  });

  test("Should filter and return overdue todos", () => {
    addNewTodo({
      title: "Overdue Todo",
      completed: false,
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString("en-CA"),
    });
    const overdueList = getOverdueTodos();
    expect(overdueList.length).toBe(1);
    expect(formatTodoListForDisplay(overdueList)).toContain("[ ] Overdue Todo");
  });

  test("Should filter and return todos due today", () => {
    addNewTodo({
      title: "Due Today Todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA").split("T")[0],
    });
    const todayList = getDueTodayTodos();
    expect(todayList.length).toBe(1);
    expect(formatTodoListForDisplay(todayList)).toContain("[ ] Due Today Todo");
  });

  test("Should filter and return todos due later", () => {
    addNewTodo({
      title: "Due Later Todo",
      completed: false,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(
        "en-CA"
      ),
    });
    const laterList = getDueLaterTodos();

    console.log("Later List:", laterList); // Add this line for debugging

    const filteredLaterList = laterList.filter(
      (item) => item.title === "Due Later Todo"
    );

    expect(filteredLaterList.length).toBe(1);
    expect(formatTodoListForDisplay(filteredLaterList)).toContain(
      "[ ] Due Later Todo"
    );
  });
});

// /* eslint-disable no-undef */
// const db = require("../models");

// const GetTheJSDate = (days) => {
//   if (!Number.isInteger(days)) {
//     throw new Error("Need to pass an integer as days");
//     const oday = 60 * 60 * 24 * 1000;

//     const t = new Date();

//     return new Date(t.getTime() + days * oday)
//   }
// }

// describe(
//   "Tests for functions in todo.js", function () {

//     beforeAll(async () => {

//       await db.sequelize.sync({ force: true });
//     })

//     test("Todo.overdue should return all tasks (including completed ones) that are past their due date", async () => {

//       const tod = await db.Todo.addTask({ title: "This is a sample item", dueDate: getJSDate(-2), completed: false });

//       const itemsToTest = await db.Todo.overdue();
//       expect(itemsToTest.length).toBe(1);
//     });

//     test("Todo.dueToday should return all tasks that are due today (including completed ones)", async () => {
//       const dTI = await db.Todo.dueToday();
//     await db.Todo.addTask({
//       title: "This is a sample item",
//       dueDate: getJSDate(0),
//       completed: false,
//     });
//       const i = await db.Todo.dueToday();

//     expect(i.length).toBe(dTI.length + 1);
//     });

//       test("Todo.dueLater should return all tasks that are due on a future date (including completed ones)", async () => {
//     const dLI = await db.Todo.dueLater();
//   await db.Todo.addTask({ title: "This is a sample item", dueDate: getJSDate(2), completed: false });
//     const items = await db.Todo.dueLater();
//     expect(items.length).toBe(dLI.length + 1);
//       });

//      test("Todo.markAsComplete should change the `completed` property of a todo to `true`", async () => {
//     const oDI = await db.Todo.overdue()
//     const Todo = oDI[0];
//        expect(Todo.completed).toBe(false);

//        await db.Todo.markAsComplete(Todo.id);

//     await Todo.reload();

//     expect(Todo.completed).toBe(true);
//      })

//      test("For a completed past-due item, Todo.displayableString should return a string of the format `ID. [x] TITLE DUE_DATE`", async () => {
//     const odi = await db.Todo.overdue();
//     const Todo = odi[0];
//     expect(Todo.completed).toBe(true);
//     const displayVal = Todo.displayableString();
//     expect(displayVal).toBe(
//       `${Todo.id}. [x] ${Todo.title} ${Todo.dueDate}`,
//     );
//      });

//       test("For an incomplete todo in the future, Todo.displayableString should return a string of the format `ID. [ ] TITLE DUE_DATE`", async () => {
//     const dli = await db.Todo.dueLater();
//     const atodo = dli[0];
//     expect(atodo.completed).toBe(false);
//     const displayVal = atodo.displayableString();
//     expect(displayVal).toBe(
//       `${atodo.id}. [ ] ${atodo.title} ${atodo.dueDate}`,
//     );
//       });

//       test("For an incomplete todo due today, Todo.displayableString should return a string of the format `ID. [ ] TITLE` (date should not be shown)", async () => {
//     const dtItems = await db.Todo.dueToday();
//     const aTodo = dtItems[0];
//     expect(aTodo.completed).toBe(false);
//     const displayVal = aTodo.displayableString();
//     expect(displayVal).toBe(`${aTodo.id}. [ ] ${aTodo.title}`);
//   });

//      test("For a complete todo due today, Todo.displayableString should return a string of the format `ID. [x] TITLE` (date should not be shown)", async () => {
//     const DueTodayItems = await db.Todo.dueToday()
//     const aTodo = DueTodayItems[0];
//     expect(aTodo.completed).toBe(false);
//     await db.Todo.markAsComplete(aTodo.id);
//     await aTodo.reload();
//     const displayVal = aTodo.displayableString()
//     expect(displayVal).toBe(`${aTodo.id}. [x] ${aTodo.title}`)
//   })
// });
