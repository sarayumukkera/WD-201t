/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const todoList = require("../todo");

// taking elements from todoList by importing
const {
  all,
  add,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
  markAsComplete,

} = todoList();

// Test Suite for testing unit testing the tests
describe("Todo List Test Suite", () => {
  beforeAll(() => {
    //today
    let today = new Date().toISOString().split("T")[0];

    // today plus 10 days
    let today_10days = new Date();
    today_10days.setDate(today_10days.getDate() + 10);
    today_10days = new Date(today_10days);
    today_10days = today_10days.toISOString().split("T")[0];

    //today minus 10 days
    let today_sub10days = new Date();
    today_sub10days.setDate(today_sub10days.getDate() - 10);
    today_sub10days = new Date(today_sub10days);
    today_sub10days = today_sub10days.toISOString().split("T")[0];

    // now we add elements into all array
    add({
      title: "nenu dsa chadvali",
      completed: false,
      dueDate: today_10days,
    });

    add({
      title: "  Solidity",
      completed: false,
      dueDate: today_sub10days,
    });

    add({
      title: " helo elo ",
      completed: true,
      dueDate: today,
    });
    add({
      title: "Test adhey pani lo todo",
      completed: false,
      dueDate: today,
    });
  });

  // in this we test of adding new todo
  test("Should add new todo", () => {
    const todoItems_Count = all.length;

    // here we add element into all array
    add({
      title: "Test  xhxhxtodo",
      completed: true,
      dueDate: new Date().toISOString().split("T")[0],
    });
    expect(all.length).toBe(todoItems_Count + 1);
  });

  //in this we test mark a todo as complete
  test("Should mark a todo as complete", () => {
    //checking complete
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  //in this we test retrieval of overdue items
  test("checks retrieval of overdue items.", () => {
    let countOverdue = overdue().length;

    // today minus 5 days to check overdue
    let todaySub5Day = new Date();
    todaySub5Day.setDate(todaySub5Day.getDate() - 5);
    todaySub5Day = todaySub5Day.toISOString().split("T")[0];

    //adding elements into all array
    add({
      title: "chadhuvi kondi first",
      completed: true,
      dueDate: todaySub5Day,
    });

    add({
      title: "Watch Marvel Avengers",
      completed: true,
      dueDate: todaySub5Day,
    });

    expect(overdue().length).toBe(countOverdue + 2);
  });

  //testing of retrieval of due later items.
  test("checks retrieval of due later items.", () => {
    let CDlater = dueLater().length;

    // today plus 5 days to check due later
    let TodayAdd5Days = new Date();
    TodayAdd5Days.setDate(TodayAdd5Days.getDate() + 5);
    TodayAdd5Days = TodayAdd5Days.toISOString().split("T")[0];

    //adding elements into all array
    add({
      title: "Drink water ",
      completed: true,
      dueDate: TodayAdd5Days,
    });

    add({
      title: " Inka alo  ",
      completed: false,
      dueDate: TodayAdd5Days,
    });

    expect(dueLater().length).toBe(CDlater + 2);
  });

  //testing of retrieval of due today items.
  test("checks retrieval of due today items.", () => {
    let Cdtoday = dueToday().length;

    //today date in required format
    let date_today = new Date().toISOString().split("T")[0];

    //adding elements into all array
    add({
      title: "Eat Maggi",
      completed: false,
      dueDate: date_today,
    });

    add({
      title: "should think",
      completed: true,
      dueDate: date_today,
    });

    expect(dueToday().length).toBe(Cdtoday + 2);
  });
});
