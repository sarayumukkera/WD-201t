const todoList = require("../todo");

const {
  all,
  markAsComplete,
  add,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todoList();

describe("Todolist test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA"),
    });
  });

  test("Should add new todo", () => {
    const tic = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA"),
    });
    expect(all.length).toBe(tic + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should filter and return overdue todos", () => {
    // Assuming the dueDate is set to the previous date
    add({
      title: "Overdue todo",
      completed: false,
      dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString("en-CA"),
    });
    const odl = overdue();
    expect(odl.length).toBe(1);
    expect(toDisplayableList(odl)).toContain("[ ] Overdue todo");
  });

  test("Should filter and return todos due today", () => {
    // Assuming the dueDate is set to the current date
    add({
      title: "Due today todo",
      completed: false,
      dueDate: new Date().toISOString("en-CA").split("T")[0],
    });
    const tList = dueToday();
    expect(tList.length).toBe(1);
    expect(toDisplayableList(tList)).toContain("[ ] Due today todo");
  });

  test("Should filter and return todos due later", () => {
    // Assuming the dueDate is set to a future date
    add({
      title: "Due later todo",
      completed: false,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(
        "en-CA"
      ),
    });
    const lList = dueLater();

    console.log("Later List:", lList); // Add this line for debugging

    // Filter the list to include only "Due later todo" items
    const flList = lList.filter(
      (item) => item.title === "Due later todo"
    );

    expect(flList.length).toBe(1);
    expect(toDisplayableList(flList)).toContain("[ ] Due later todo");
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
